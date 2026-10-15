import { datoQuery, once } from './client';
import { imageFragment } from './fragments';
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

/** Every published post, newest first. */
export const getAllPosts = once(async (): Promise<PostSummary[]> => {
  const { allBlogPosts } = await datoQuery<{ allBlogPosts: PostSummary[] }>(
    allPostsQuery
  );
  return allBlogPosts;
});

export async function getPost(slug: string): Promise<Post | null> {
  const { blogPost } = await datoQuery<
    { blogPost: Post | null },
    { slug: string }
  >(postBySlugQuery, { slug });
  return blogPost;
}
