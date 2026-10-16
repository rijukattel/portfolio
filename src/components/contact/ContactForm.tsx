'use client';

import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import styles from './ContactForm.module.css';

type ContactFormProps = {
  topics: string[];
  note?: string;
  labels: {
    name: string;
    email: string;
    topic: string;
    optional: string;
    topicPlaceholder: string;
    message: string;
    send: string;
    sending: string;
    error: string;
    honeypot: string;
  };
};

/**
 * The contact form, handled by Netlify Forms. Netlify registers it from
 * public/__forms.html at deploy time, so the field names must match that
 * file. With JavaScript the form posts there in the background and shows an
 * error if Netlify rejects it; without JavaScript it posts normally and
 * Netlify answers with the thank-you page.
 */
export function ContactForm({ topics, note, labels }: ContactFormProps) {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'sending' | 'error'>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('sending');
    const fields = [...new FormData(event.currentTarget)].map(
      ([key, value]) => [key, String(value)]
    );
    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(fields).toString(),
      });
      if (!response.ok) throw new Error(`Netlify answered ${response.status}`);
      router.push('/thank-you');
    } catch {
      setState('error');
    }
  }

  return (
    <form
      name="contact"
      method="POST"
      action="/thank-you/"
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          {labels.honeypot} <input name="bot-field" tabIndex={-1} />
        </label>
      </p>

      <div className={styles.field}>
        <label htmlFor="contact-name">{labels.name}</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-email">{labels.email}</label>
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
          {labels.topic}{' '}
          <span className={styles.optional}>{labels.optional}</span>
        </label>
        <select id="contact-topic" name="topic" defaultValue="">
          <option value="">{labels.topicPlaceholder}</option>
          {topics.map((topic) => (
            <option key={topic}>{topic}</option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">{labels.message}</label>
        <textarea id="contact-message" name="message" rows={7} required />
      </div>

      <div className={styles.submit}>
        <button
          type="submit"
          className={styles.button}
          disabled={state === 'sending'}
        >
          {state === 'sending' ? labels.sending : labels.send}
        </button>
        {state === 'error' ? (
          <p role="alert" className={styles.error}>
            {labels.error}
          </p>
        ) : null}
        {note ? <p className={styles.note}>{note}</p> : null}
      </div>
    </form>
  );
}
