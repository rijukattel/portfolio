import type { Metadata } from 'next';
import { getSiteConfig } from '@/lib/datocms/site';

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s · ${site.name}` },
  };
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
