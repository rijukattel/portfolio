import { EvidenceChapter } from '@/components/home/EvidenceChapter';
import { FieldChapter } from '@/components/home/FieldChapter';
import { Hero } from '@/components/home/Hero';
import { JournalStrip } from '@/components/home/JournalStrip';
import { NextQuestion } from '@/components/home/NextQuestion';
import { ThemeMap } from '@/components/home/ThemeMap';
import { ChapterProgress } from '@/components/navigation/ChapterProgress';
import { JsonLd } from '@/components/seo/JsonLd';
import { homeChapters } from '@/content/home';
import { getContent } from '@/lib/datocms/content';
import { getAllPosts } from '@/lib/datocms/journal';
import { getSiteConfig } from '@/lib/datocms/site';
import { pageMetadata } from '@/lib/seo';
import { homeGraph } from '@/lib/structured-data';

export async function generateMetadata() {
  const { home } = await getContent();
  return pageMetadata({
    absoluteTitle: home.metaTitle,
    description: home.metaDescription,
    path: '/',
  });
}

/** Five chapters: Landscape → Questions → Field → Evidence → Next Question. */
export default async function Home() {
  const [site, content, posts] = await Promise.all([
    getSiteConfig(),
    getContent(),
    getAllPosts(),
  ]);
  const { home, profile, themes, research, experience } = content;

  const featured = posts.filter((post) => post.featuredInHomepage);
  const journalPosts = (featured.length >= 3 ? featured : posts).slice(0, 3);
  const fieldPhotos = home.fieldPhotos.map((image) => ({
    image,
    alt: image.alt ?? '',
    caption: image.title ?? '',
  }));

  return (
    <>
      <JsonLd data={homeGraph(site, profile)} />
      <ChapterProgress chapters={homeChapters} />
      <Hero
        image={home.heroImage}
        title={home.heroTitle}
        lede={home.heroLede}
      />
      <ThemeMap
        title={home.questionsTitle ?? ''}
        intro={home.questionsIntro ?? undefined}
        themes={themes}
        research={research}
      />
      <FieldChapter
        title={home.fieldTitle ?? ''}
        intro={home.fieldIntro ?? undefined}
        experience={experience}
        photos={fieldPhotos}
      />
      <EvidenceChapter
        title={home.evidenceTitle ?? ''}
        intro={home.evidenceIntro ?? undefined}
        studies={research.filter((entry) => entry.featured)}
      />
      <JournalStrip title={home.journalTitle ?? ''} posts={journalPosts} />
      <NextQuestion
        title={home.nextTitle ?? ''}
        intro={home.nextIntro ?? undefined}
        directions={home.nextDirections}
      />
    </>
  );
}
