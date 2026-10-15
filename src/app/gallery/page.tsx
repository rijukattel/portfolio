import { PageIntro } from '@/components/layout/PageIntro';
import { DatoImage } from '@/components/media/DatoImage';
import { Reveal } from '@/components/motion/Reveal';
import { getSitePage } from '@/lib/datocms/content';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export async function generateMetadata() {
  const page = await getSitePage('gallery');
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: '/gallery/',
  });
}

/**
 * Photographs from the DatoCMS Gallery page. Alt text and the caption (the
 * photo's title) are edited per photo in DatoCMS.
 */
export default async function GalleryPage() {
  const page = await getSitePage('gallery');

  return (
    <>
      <PageIntro label={page.label} title={page.title} lede={page.lede} />
      <section className="container section" aria-label={page.title}>
        <div className={styles.grid}>
          {page.photos.map((photo, i) => (
            <Reveal
              as="figure"
              key={photo.id}
              index={i % 3}
              className={styles.figure}
            >
              <DatoImage
                data={photo.responsiveImage}
                alt={photo.alt ?? ''}
                sizes="(min-width: 64em) 30vw, (min-width: 40em) 46vw, 100vw"
                priority={i < 2}
              />
              {photo.title ? (
                <figcaption className={styles.caption}>
                  {photo.title}
                </figcaption>
              ) : null}
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
