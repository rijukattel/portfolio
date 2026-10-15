import { datoQuery } from './client';
import { responsiveImageFragment } from './fragments';
import type { DatoImage } from './types';

const uploadsQuery = /* GraphQL */ `
  query Uploads($ids: [UploadId]) {
    allUploads(filter: { id: { in: $ids } }) {
      id
      alt
      title
      width
      height
      url
      focalPoint {
        x
        y
      }
      responsiveImage(imgixParams: { auto: format, fit: max, w: 1920 }) {
        ...ResponsiveImageParts
      }
    }
  }
  ${responsiveImageFragment}
`;

/**
 * Photos chosen in code (by DatoCMS upload ID) for code-owned pages. Fails
 * the build if one has been deleted, rather than shipping a broken page.
 */
export async function getUploads<Id extends string>(
  ids: readonly Id[]
): Promise<Record<Id, DatoImage>> {
  const { allUploads } = await datoQuery<
    { allUploads: (DatoImage & { id: string })[] },
    { ids: readonly Id[] }
  >(uploadsQuery, { ids });

  const byId = new Map(allUploads.map((upload) => [upload.id, upload]));
  const result = {} as Record<Id, DatoImage>;
  const missing: string[] = [];
  for (const id of ids) {
    const upload = byId.get(id);
    if (upload) result[id] = upload;
    else missing.push(id);
  }
  if (missing.length) {
    throw new Error(`DatoCMS uploads not found: ${missing.join(', ')}`);
  }
  return result;
}
