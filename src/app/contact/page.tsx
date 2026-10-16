import { ContactForm } from '@/components/contact/ContactForm';
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

/** Direct contact details and the Netlify contact form (see ContactForm). */
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
        <ContactForm
          topics={page.options}
          note={page.note}
          labels={{
            name: labels.formName,
            email: labels.formEmail,
            topic: labels.formTopic,
            optional: labels.formOptional,
            topicPlaceholder: labels.formTopicPlaceholder,
            message: labels.formMessage,
            send: labels.formSend,
            sending: labels.formSending,
            error: labels.formError,
            honeypot: labels.formHoneypot,
          }}
        />
      </PageSection>
    </>
  );
}
