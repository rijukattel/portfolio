import { EvidenceChapter } from '@/components/home/EvidenceChapter';
import { FieldChapter } from '@/components/home/FieldChapter';
import { Hero } from '@/components/home/Hero';
import { JournalStrip } from '@/components/home/JournalStrip';
import { NextQuestion } from '@/components/home/NextQuestion';
import { ThemeMap } from '@/components/home/ThemeMap';
import { ChapterProgress } from '@/components/navigation/ChapterProgress';
import { JsonLd } from '@/components/seo/JsonLd';
import { homeChapters, homeCopy, homeImages } from '@/content/home';
import { getAllPosts } from '@/lib/datocms/journal';
import { getSiteConfig } from '@/lib/datocms/site';
import { getUploads } from '@/lib/datocms/uploads';
import { pageMetadata } from '@/lib/seo';
import { homeGraph } from '@/lib/structured-data';

export function generateMetadata() {
  return pageMetadata({
    absoluteTitle: homeCopy.meta.title,
    description: homeCopy.meta.description,
    path: '/',
  });
}

/** Five chapters: Landscape → Questions → Field → Evidence → Next Question. */
export default async function Home() {
  const [site, images, posts] = await Promise.all([
    getSiteConfig(),
    getUploads(Object.values(homeImages)),
    getAllPosts(),
  ]);

  const featured = posts.filter((post) => post.featuredInHomepage);
  const journalPosts = (featured.length >= 3 ? featured : posts).slice(0, 3);
  const fieldPhotos = homeCopy.field.photos.map((photo) => ({
    image: images[homeImages[photo.key]],
    alt: photo.alt,
    caption: photo.caption,
  }));

  return (
    <>
      <JsonLd data={homeGraph(site)} />
      <ChapterProgress chapters={homeChapters} />
      <Hero image={images[homeImages.hero]} />
      <ThemeMap />
      <FieldChapter photos={fieldPhotos} />
      <EvidenceChapter />
      <JournalStrip posts={journalPosts} />
      <NextQuestion />
    </>
  );
}
