import type { Metadata, Route } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PostBody } from '@/components/journal/PostBody';
import { PostMeta } from '@/components/journal/PostMeta';
import { DatoImage } from '@/components/media/DatoImage';
import { JsonLd } from '@/components/seo/JsonLd';
import { ActionLink } from '@/components/ui/ActionLink';
import { categoryLabel, journalCopy } from '@/content/journal';
import { researchForJournalPost, researchTypeLabels } from '@/content/research';
import { profile } from '@/content/profile';
import { getAllPosts, getNeighbours, getPost } from '@/lib/datocms/journal';
import { getSiteConfig } from '@/lib/datocms/site';
import { pageMetadata, socialImage } from '@/lib/seo';
import { blogPostingGraph } from '@/lib/structured-data';
import styles from './page.module.css';

// Only posts that exist at build time; anything else is a real 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}/`,
    image: socialImage(post.coverImage, post.title),
    article: {
      publishedTime: post._firstPublishedAt,
      modifiedTime: post._updatedAt,
      section: categoryLabel(post.category),
    },
  });
}

export default async function PostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const [post, site, neighbours] = await Promise.all([
    getPost(slug),
    getSiteConfig(),
    getNeighbours(slug),
  ]);
  if (!post) notFound();

  const subtitle = post.subtitle?.trim();
  const research = researchForJournalPost(post.slug);

  return (
    <article className={styles.article}>
      <header className={`container ${styles.header}`}>
        <div className={styles.heading}>
          <Link href="/blog" className={styles.back}>
            <span aria-hidden="true">←</span> {journalCopy.title}
          </Link>
          <PostMeta
            category={post.category}
            date={post._firstPublishedAt}
            minutes={post.minutesOfReading}
          />
          <h1 className={styles.title}>{post.title}</h1>
          {subtitle ? <p className="lede">{subtitle}</p> : null}
          <p className={styles.byline}>
            By <Link href="/about">{profile.name}</Link>
          </p>
        </div>
        <DatoImage
          data={post.coverImage.responsiveImage}
          fill
          focalPoint={post.coverImage.focalPoint}
          sizes="(min-width: 64em) 40vw, 100vw"
          priority
          className={styles.cover}
        />
      </header>

      <div className={`container ${styles.content}`}>
        <PostBody body={post.structuredBody} />
        {research ? (
          <aside className={styles.research} aria-labelledby="part-of-research">
            <p id="part-of-research" className="caption">
              {journalCopy.researchLabel}
            </p>
            <Link
              href={`/research/${research.slug}` as Route}
              className={styles.researchLink}
            >
              <span className={styles.researchType}>
                {researchTypeLabels[research.type]}
              </span>
              <span className={styles.researchTitle}>{research.title}</span>
            </Link>
          </aside>
        ) : null}
      </div>

      <footer className={`container ${styles.footer}`}>
        <div className={styles.author}>
          <p className="caption">Written by</p>
          <p className={styles.authorName}>{profile.name}</p>
          <p className={styles.authorText}>{profile.statement}</p>
          <ActionLink href="/about" variant="quiet">
            About Riju
          </ActionLink>
        </div>

        <nav aria-label="More from the Journal" className={styles.pager}>
          {[
            { post: neighbours.newer, label: journalCopy.newerLabel },
            { post: neighbours.older, label: journalCopy.olderLabel },
          ].map(({ post: other, label }) =>
            other ? (
              <Link
                key={label}
                href={`/blog/${other.slug}` as Route}
                className={styles.pagerLink}
              >
                <span className="caption">{label}</span>
                <span className={styles.pagerTitle}>{other.title}</span>
              </Link>
            ) : null
          )}
          <ActionLink href="/blog" variant="quiet">
            {journalCopy.backLabel}
          </ActionLink>
        </nav>
      </footer>

      <JsonLd
        data={blogPostingGraph(
          site,
          post,
          socialImage(post.coverImage, post.title)
        )}
      />
    </article>
  );
}
