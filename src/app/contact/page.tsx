import { PageIntro } from '@/components/layout/PageIntro';
import { PageSection } from '@/components/layout/PageSection';
import { ActionLink } from '@/components/ui/ActionLink';
import { siteDefaults } from '@/config/site';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export function generateMetadata() {
  return pageMetadata({
    title: 'Contact',
    description:
      'Contact Riju Kattel to discuss agricultural research or postgraduate opportunities.',
    path: '/contact/',
  });
}

const copy = {
  lede: 'To discuss research, collaboration or postgraduate opportunities, write by email or use the form.',
  direct: 'Direct',
  form: 'Message',
  topics: [
    'Research collaboration',
    'Postgraduate opportunity',
    'A question about a study',
    'Something else',
  ],
  note: 'Messages are sent through Netlify Forms. Your details are used only to reply.',
};

/**
 * A plain HTML form handled by Netlify Forms: it works without JavaScript,
 * Netlify detects it in the static export at deploy time, and the honeypot
 * field filters most spam.
 */
export default function ContactPage() {
  return (
    <>
      <PageIntro label="Contact" title="Contact" lede={copy.lede} />

      <PageSection id="direct" title={copy.direct}>
        <div className={styles.direct}>
          <ActionLink href={`mailto:${siteDefaults.email}`}>
            {siteDefaults.email}
          </ActionLink>
          <a href={siteDefaults.linkedinUrl} rel="me" className={styles.link}>
            LinkedIn
          </a>
        </div>
      </PageSection>

      <PageSection id="message" title={copy.form}>
        <form
          name="contact"
          method="POST"
          action="/thank-you/"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className={styles.form}
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Leave this empty: <input name="bot-field" tabIndex={-1} />
            </label>
          </p>

          <div className={styles.field}>
            <label htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-topic">
              Topic <span className={styles.optional}>(optional)</span>
            </label>
            <select id="contact-topic" name="topic" defaultValue="">
              <option value="">Choose a topic</option>
              {copy.topics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows={7} required />
          </div>

          <div className={styles.submit}>
            <button type="submit" className={styles.button}>
              Send message
            </button>
            <p className={styles.note}>{copy.note}</p>
          </div>
        </form>
      </PageSection>
    </>
  );
}
