import type { ResponsiveImageType } from 'react-datocms/image';
import type { StructuredTextGraphQlResponse } from 'react-datocms/structured-text';

export type ResponsiveImage = ResponsiveImageType & {
  src: string;
  width: number;
  height: number;
};

export type FocalPoint = { x: number; y: number } | null;

export type DatoImage = {
  alt: string | null;
  title: string | null;
  width: number;
  height: number;
  focalPoint: FocalPoint;
  url: string;
  responsiveImage: ResponsiveImage;
};

export type SeoField = {
  title: string | null;
  description: string | null;
  image: { url: string; width: number; height: number } | null;
} | null;

export type ArticleBodyImageBlock = {
  __typename: 'ArticleBodyImageRecord';
  id: string;
  image: DatoImage;
};

export type RichTextBlock = {
  __typename: 'RichTextRecord';
  id: string;
  editor: string | null;
};

export type PostBodyBlock = ArticleBodyImageBlock | RichTextBlock;

export type PostBodyLink =
  | { __typename: 'BlogPostRecord'; id: string; slug: string; title: string }
  | { __typename: 'OtherPageRecord'; id: string; slug: string };

export type PostSummary = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  category: string | null;
  featuredInHomepage: boolean;
  minutesOfReading: number | null;
  _firstPublishedAt: string;
  _updatedAt: string;
  coverImage: DatoImage;
};

export type Post = PostSummary & {
  seo: SeoField;
  author: { name: string; picture: DatoImage | null } | null;
  structuredBody: StructuredTextGraphQlResponse<PostBodyBlock, PostBodyLink>;
};

export type GalleryPhoto = {
  id: string;
  caption: string | null;
  description: string | null;
  src: DatoImage;
};

export type SiteConfig = {
  name: string;
  shortName: string;
  url: string;
  postsPerPage: number;
  defaultOgImage: { url: string; width: number; height: number } | null;
  faviconUrl: string | null;
  facebookUrl: string | null;
};
