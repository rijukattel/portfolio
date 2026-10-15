import type { Document, Node } from 'datocms-structured-text-utils';

/**
 * Journal posts mark section titles as short paragraphs set entirely in bold
 * rather than as headings. These are rendered as <h2> and left out of excerpts.
 */
export function isPseudoHeading(node: Node): boolean {
  if (node.type !== 'paragraph') return false;
  const { children } = node;
  if (
    children.length === 0 ||
    !children.every(
      (child) => child.type === 'span' && child.marks?.includes('strong')
    )
  ) {
    return false;
  }
  const text = children
    .map((child) => (child.type === 'span' ? child.value : ''))
    .join('')
    .trim();
  return text.length > 0 && text.length <= 80 && !/[.,;:!]$/.test(text);
}

function textOf(node: Node): string {
  if (node.type === 'span') return node.value;
  if ('children' in node) {
    return (node.children as Node[]).map(textOf).join('');
  }
  return '';
}

/** Body text of a post, without headings, section titles or image blocks. */
export function toPlainText(value: Document | null | undefined): string {
  if (!value) return '';
  return value.document.children
    .filter((node) => node.type !== 'heading' && !isPseudoHeading(node))
    .map((node) => textOf(node).replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join(' ');
}

/** Cuts text on a word boundary at about `max` characters. */
export function excerpt(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const end = cut.lastIndexOf(' ');
  return `${cut.slice(0, end > 0 ? end : max).replace(/[\s,;:.–—-]+$/, '')}…`;
}
