import { executeQuery } from '@datocms/cda-client';

/**
 * Runs a query against the DatoCMS Content Delivery API at build time.
 * Throws when the token is missing so a build never ships without CMS content.
 */
export function datoQuery<Result, Variables = Record<string, never>>(
  query: string,
  variables?: Variables
): Promise<Result> {
  const token = process.env.DATOCMS_API_TOKEN;
  if (!token) {
    throw new Error(
      'DATOCMS_API_TOKEN is missing. Copy .env.example to .env.local and add the read-only token.'
    );
  }
  return executeQuery<Result, Variables>(query, {
    token,
    variables,
    excludeInvalid: true,
  });
}

/** Shares one request between every page rendered by the same build worker. */
export function once<T>(load: () => Promise<T>): () => Promise<T> {
  let pending: Promise<T> | undefined;
  return () => (pending ??= load());
}
