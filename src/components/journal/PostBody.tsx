import type { Route } from 'next';
import Link from 'next/link';
import {
  isHeading,
  isParagraph,
  type Node,
} from 'datocms-structured-text-utils';
import { StructuredText, renderNodeRule } from 'react-datocms/structured-text';
import { DatoImage } from '@/components/media/DatoImage';
import { isPseudoHeading } from '@/lib/datocms/text';
import type { Post, PostBodyLink } from '@/lib/datocms/types';
import styles from './PostBody.module.css';

function hrefFor(record: PostBodyLink): Route {
  return (
    record.__typename === 'BlogPostRecord'
      ? `/blog/${record.slug}/`
      : `/${record.slug}/`
  ) as Route;
}

const textOf = (node: Node) =>
  'children' in node
    ? (node.children as Node[])
        .map((child) => (child.type === 'span' ? child.value : ''))
        .join('')
        .trim()
    : '';

/** Renders a Journal post body from DatoCMS structured text. */
export function PostBody({ body }: { body: Post['structuredBody'] }) {
  return (
    <div className={styles.body}>
      <StructuredText
        data={body}
        customNodeRules={[
          // The post title is the page's only <h1>; body headings start at <h2>.
          renderNodeRule(isHeading, ({ node, children, key }) => {
            const Tag = `h${Math.min(Math.max(node.level, 2), 4)}` as
              'h2' | 'h3' | 'h4';
            return <Tag key={key}>{children}</Tag>;
          }),
          // Bold one-line paragraphs at the top level are section titles.
          renderNodeRule(isParagraph, ({ node, children, key, ancestors }) =>
            ancestors.length === 1 && isPseudoHeading(node) ? (
              <h2 key={key}>{textOf(node)}</h2>
            ) : (
              <p key={key}>{children}</p>
            )
          ),
        ]}
        renderLinkToRecord={({ record, children, transformedMeta }) => (
          <Link {...transformedMeta} href={hrefFor(record)}>
            {children}
          </Link>
        )}
        renderInlineRecord={({ record }) => (
          <Link href={hrefFor(record)}>
            {record.__typename === 'BlogPostRecord'
              ? record.title
              : record.slug}
          </Link>
        )}
        renderBlock={({ record }) => {
          switch (record.__typename) {
            case 'ArticleBodyImageRecord':
              return (
                <figure className={styles.figure}>
                  <DatoImage
                    data={record.image.responsiveImage}
                    sizes="(min-width: 64em) 52rem, 100vw"
                    maxHeight="80svh"
                    className={styles.picture}
                  />
                  {record.image.title ? (
                    <figcaption>{record.image.title}</figcaption>
                  ) : null}
                </figure>
              );
            case 'RichTextRecord':
              // Plain text only; never rendered as HTML.
              return (
                <div className={styles.note}>
                  {(record.editor ?? '')
                    .split(/\n{2,}/)
                    .map((paragraph) => paragraph.trim())
                    .filter(Boolean)
                    .map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                </div>
              );
            default:
              return null;
          }
        }}
      />
    </div>
  );
}
