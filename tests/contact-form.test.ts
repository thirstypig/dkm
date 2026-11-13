import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ContactForm from '../src/components/ContactForm.astro';
import Contact from '../src/pages/contact.astro';
import { site } from '../src/data/site';

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

const source = readFileSync('src/components/ContactForm.astro', 'utf8');
const script = source.slice(source.indexOf('<script>'), source.indexOf('</script>'));

describe('ContactForm', () => {
  it('renders not-connected state when formspreeId is empty', async () => {
    const html = await container.renderToString(ContactForm, { props: { formspreeId: '' } });
    expect(html).toMatch(/<button[^>]*type="submit"[^>]*disabled/);
    expect(html).toContain('The inquiry form isn’t connected yet');
    expect(html).not.toContain('action="https://formspree.io/f/"');
  });

  it('posts to formspree when id set', async () => {
    const html = await container.renderToString(ContactForm, { props: { formspreeId: 'abc123' } });
    expect(html).toContain('action="https://formspree.io/f/abc123"');
    expect(html).toMatch(/method="POST"/i);
    expect(html).not.toMatch(/<button[^>]*type="submit"[^>]*disabled/);
    expect(html).not.toContain('isn’t connected yet');
  });

  it('honeypot label is not an autofill field name', async () => {
    // A honeypot labeled "Company" gets filled by Chrome's address autofill,
    // and the handler then silently discards a real inquiry (pasadenaworks).
    const html = await container.renderToString(ContactForm, { props: { formspreeId: 'abc123' } });
    const hp = html.match(/<div[^>]*aria-hidden="true"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
    expect(hp).toMatch(/<input[^>]*name="_gotcha"/);
    expect(hp).toMatch(/tabindex="-1"/);
    expect(hp).toMatch(/<label[^>]*>Leave this field empty<\/label>/);
    expect(html).not.toMatch(/name="company"/);
  });

  it('has the spec fields', async () => {
    const html = await container.renderToString(ContactForm, { props: { formspreeId: 'abc123' } });
    expect(html).toMatch(/<input[^>]*name="name"[^>]*required|<input[^>]*required[^>]*name="name"/);
    expect(html).toMatch(/<input[^>]*type="email"[^>]*name="email"|<input[^>]*name="email"[^>]*type="email"/);
    expect(html).toMatch(/name="organization"/);
    for (const o of ['Talent Producing (ongoing series)', 'Talent Booking (single project)', 'Not sure yet']) {
      expect(html).toContain(o);
    }
    expect(html).toMatch(/<textarea[^>]*name="message"[^>]*required|<textarea[^>]*required[^>]*name="message"/);
    expect(html).toMatch(/name="_subject"[^>]*value="New DKM inquiry"|value="New DKM inquiry"[^>]*name="_subject"/);
  });

  it('wires the tested submit handler only when connected', () => {
    // Behavior (keep input on failure, error shown) is exercised in behavior.test.ts.
    expect(script).toContain("import { initInquiryForm } from '../scripts/inquiry-form'");
    expect(script).toMatch(/startsWith\('https:\/\/formspree\.io\/f\/'\)/);
  });
});

describe('Contact page', () => {
  it('lists the four socials and has no mailto', async () => {
    const html = await container.renderToString(Contact);
    for (const s of site.socials) expect(html).toContain(`href="${s.href}"`);
    expect(html).not.toContain('mailto:');
  });

  it('is connected to the DKM Formspree form', async () => {
    const html = await container.renderToString(Contact);
    expect(html).toContain('action="https://formspree.io/f/mrpqboyz"');
    expect(html).not.toContain('isn’t connected yet');
  });

  it('decorative selfie is hidden from screen readers', async () => {
    const html = await container.renderToString(Contact);
    for (const img of html.match(/<img[^>]*>/g) ?? []) {
      // Astro serializes alt="" as a bare `alt` attribute — same meaning in HTML.
      const decorative = /\salt(="")?[\s>]/.test(img) && img.includes('role="presentation"');
      expect(/alt="[^"]+"/.test(img) || decorative, img).toBe(true);
    }
  });
});
