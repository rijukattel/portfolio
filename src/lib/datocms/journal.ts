import type { Document } from 'datocms-structured-text-utils';
import { cache } from 'react';
import { datoQuery, once } from './client';
import { imageFragment } from './fragments';
import { excerpt, toPlainText } from './text';
import type { Post, PostSummary } from './types';

const postSummaryFragment = /* GraphQL */ `
  fragment PostSummaryParts on BlogPostRecord {
    id
    slug
    title
    subtitle
    category
    featuredInHomepage
    minutesOfReading
    _firstPublishedAt
    _updatedAt
    coverImage {
      ...ImageParts
    }
    cardImage {
      alt
      responsiveImage(
        imgixParams: { auto: format, fit: crop, w: 960, h: 720 }
        sizes: "(min-width: 64em) 30vw, (min-width: 40em) 46vw, 100vw"
      ) {
        ...ResponsiveImageParts
      }
    }
    structuredBody {
      value
    }
  }
  ${imageFragment}
`;

const allPostsQuery = /* GraphQL */ `
  query AllPosts {
    allBlogPosts(orderBy: _firstPublishedAt_DESC, first: 500) {
      ...PostSummaryParts
    }
  }
  ${postSummaryFragment}
`;

const postBySlugQuery = /* GraphQL */ `
  query PostBySlug($slug: String!) {
    blogPost(filter: { slug: { eq: $slug } }) {
      ...PostSummaryParts
      seo {
        title
        description
        image {
          url
          width
          height
        }
      }
      author {
        name
        picture {
          ...ImageParts
        }
      }
      structuredBody {
        value
        links {
          __typename
          ... on BlogPostRecord {
            id
            slug
            title
          }
          ... on OtherPageRecord {
            id
            slug
          }
        }
        blocks {
          __typename
          ... on ArticleBodyImageRecord {
            id
            image {
              ...ImageParts
            }
          }
          ... on RichTextRecord {
            id
            editor
          }
        }
      }
    }
  }
  ${postSummaryFragment}
`;

type RawSummary = Omit<PostSummary, 'excerpt'> & {
  structuredBody: { value: Document } | null;
};
type RawPost = Omit<Post, 'excerpt' | 'description'>;

// Every post was published with this as its SEO description; it says
// nothing about the post, so the body excerpt is used instead.
const PLACEHOLDER_DESCRIPTIONS = new Set(['i write what i learn']);

function isPlaceholder(text: string) {
  return PLACEHOLDER_DESCRIPTIONS.has(
    text
      .toLowerCase()
      .replace(/[.!\s]+$/, '')
      .trim()
  );
}

function toSummary({ structuredBody, ...post }: RawSummary): PostSummary {
  return {
    ...post,
    title: post.title.trim(),
    excerpt: excerpt(toPlainText(structuredBody?.value)),
  };
}

function toPost(post: RawPost): Post {
  const text = toPlainText(post.structuredBody.value as Document);
  const seoDescription = post.seo?.description?.trim();
  return {
    ...post,
    title: post.title.trim(),
    excerpt: excerpt(text),
    description:
      seoDescription && !isPlaceholder(seoDescription)
        ? seoDescription
        : excerpt(text, 155),
  };
}

/** Every published post, newest first. */
export const getAllPosts = once(async (): Promise<PostSummary[]> => {
  const { allBlogPosts } = await datoQuery<{ allBlogPosts: RawSummary[] }>(
    allPostsQuery
  );
  return allBlogPosts.map(toSummary);
});

/** One request per post, shared by generateMetadata and the page render. */
export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const { blogPost } = await datoQuery<
    { blogPost: RawPost | null },
    { slug: string }
  >(postBySlugQuery, { slug });
  return blogPost ? toPost(blogPost) : null;
});

/** The posts published just before and after `slug`. */
export async function getNeighbours(slug: string) {
  const posts = await getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}
