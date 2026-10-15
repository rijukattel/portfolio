import '@/styles/tokens.css';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { motionBootstrap } from '@/components/motion/motionBootstrap';
import { RevealRuntime } from '@/components/motion/RevealRuntime';
import { getProfile } from '@/lib/datocms/content';
import { getSiteConfig } from '@/lib/datocms/site';
import { bodyFont, displayFont } from './fonts';

export async function generateMetadata(): Promise<Metadata> {
  const [site, profile] = await Promise.all([getSiteConfig(), getProfile()]);
  return {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s · ${site.name}` },
    description: profile.statement,
  };
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable}`}
      // The motion bootstrap sets data-motion on <html> before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBootstrap }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <RevealRuntime />
      </body>
    </html>
  );
}
