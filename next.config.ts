import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A stray lockfile in the home directory otherwise becomes the workspace root.
  turbopack: { root: __dirname },
  // Fully static site served by Netlify; redirects and headers live in
  // netlify.toml and public/_redirects because export mode ignores them here.
  output: 'export',
  // Keeps the URLs the Gatsby site already ranks for (/blog/<slug>/).
  trailingSlash: true,
  typedRoutes: true,
};

export default nextConfig;
