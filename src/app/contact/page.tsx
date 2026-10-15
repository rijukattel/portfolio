import { PageIntro } from '@/components/layout/PageIntro';
import { PageSection } from '@/components/layout/PageSection';
import { ActionLink } from '@/components/ui/ActionLink';
import { getProfile, getSitePage } from '@/lib/datocms/content';
import { getLabels } from '@/lib/datocms/labels';
import { pageMetadata } from '@/lib/seo';
import styles from './page.module.css';

export async function generateMetadata() {
  const page = await getSitePage('contact');
  return pageMetadata({
    title: page.title,
    description: page.description,
    path: '/contact/',
  });
}

/**
 * A plain HTML form handled by Netlify Forms: it works without JavaScript,
 * Netlify detects it in the static export at deploy time, and the honeypot
 * field filters most spam.
 */
export default async function ContactPage() {
  const [page, profile, labels] = await Promise.all([
    getSitePage('contact'),
    getProfile(),
    getLabels(),
  ]);
  return (
    <>
      <PageIntro label={page.label} title={page.title} lede={page.lede} />

      <PageSection id="direct" title={labels.contactDirect}>
        <div className={styles.direct}>
          <ActionLink href={`mailto:${profile.email}`}>
            {profile.email}
          </ActionLink>
          {profile.linkedinUrl ? (
            <a href={profile.linkedinUrl} rel="me" className={styles.link}>
              {labels.linkedinLabel}
            </a>
          ) : null}
        </div>
      </PageSection>

      <PageSection id="message" title={labels.contactMessage}>
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
              {labels.formHoneypot} <input name="bot-field" tabIndex={-1} />
            </label>
          </p>

          <div className={styles.field}>
            <label htmlFor="contact-name">{labels.formName}</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-email">{labels.formEmail}</label>
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
              {labels.formTopic}{' '}
              <span className={styles.optional}>{labels.formOptional}</span>
            </label>
            <select id="contact-topic" name="topic" defaultValue="">
              <option value="">{labels.formTopicPlaceholder}</option>
              {page.options.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="contact-message">{labels.formMessage}</label>
            <textarea id="contact-message" name="message" rows={7} required />
          </div>

          <div className={styles.submit}>
            <button type="submit" className={styles.button}>
              {labels.formSend}
            </button>
            {page.note ? <p className={styles.note}>{page.note}</p> : null}
          </div>
        </form>
      </PageSection>
    </>
  );
}
