import { PageIntro } from '@/components/layout/PageIntro';
import { DatoImage } from '@/components/media/DatoImage';
import { Reveal } from '@/components/motion/Reveal';
import { galleryCaptions, galleryCopy } from '@/content/gallery';
import { getGalleryPhotos } from '@/lib/datocms/gallery';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export function generateMetadata() {
  return pageMetadata({
    title: galleryCopy.title,
    description: galleryCopy.description,
    path: '/gallery/',
  });
}

/** Photographs from the DatoCMS gallery page, captioned in code. */
export default async function GalleryPage() {
  const photos = await getGalleryPhotos();

  return (
    <>
      <PageIntro
        label={galleryCopy.label}
        title={galleryCopy.title}
        lede={galleryCopy.lede}
      />
      <section className="container section" aria-label="Photographs">
        <div className={styles.grid}>
          {photos.map((photo, i) => {
            const copy = galleryCaptions[photo.src.id];
            const caption = copy?.caption ?? photo.caption ?? '';
            const alt = copy?.alt ?? photo.src.alt ?? '';
            return (
              <Reveal
                as="figure"
                key={photo.id}
                index={i % 3}
                className={styles.figure}
              >
                <DatoImage
                  data={photo.src.responsiveImage}
                  alt={alt}
                  sizes="(min-width: 64em) 30vw, (min-width: 40em) 46vw, 100vw"
                  priority={i < 2}
                />
                {caption ? (
                  <figcaption className={styles.caption}>{caption}</figcaption>
                ) : null}
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
