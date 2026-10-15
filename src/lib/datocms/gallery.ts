import { datoQuery, once } from './client';
import { imageFragment } from './fragments';
import type { GalleryPhoto } from './types';

const galleryQuery = /* GraphQL */ `
  query Gallery {
    otherPage(filter: { slug: { eq: "gallery" } }) {
      structuredBody {
        blocks {
          __typename
          ... on GalleryRecord {
            items {
              ... on GalleryItemRecord {
                id
                caption
                description
                src {
                  ...ImageParts
                }
              }
            }
          }
        }
      }
    }
  }
  ${imageFragment}
`;

type GalleryQuery = {
  otherPage: {
    structuredBody: {
      blocks: Array<
        | { __typename: 'GalleryRecord'; items: GalleryPhoto[] }
        | { __typename: string }
      >;
    } | null;
  } | null;
};

/** Photos from the gallery page in DatoCMS; captions are written in code. */
export const getGalleryPhotos = once(async (): Promise<GalleryPhoto[]> => {
  const { otherPage } = await datoQuery<GalleryQuery>(galleryQuery);
  return (otherPage?.structuredBody?.blocks ?? []).flatMap((block) =>
    'items' in block ? block.items : []
  );
});
