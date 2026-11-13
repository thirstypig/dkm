// @vitest-environment happy-dom
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initInquiryForm, MESSAGES } from '../src/scripts/inquiry-form';
import { initMenu } from '../src/scripts/menu';

function mountForm() {
  document.body.innerHTML = `
    <form id="inquiry-form" action="https://formspree.io/f/abc123" method="POST">
      <input name="_gotcha" value="" />
      <input name="name" value="Pat" />
      <input name="email" value="pat@example.com" />
      <textarea name="message"></textarea>
      <button type="submit">Send inquiry</button>
      <p class="form-status"></p>
    </form>`;
  const form = document.getElementById('inquiry-form') as HTMLFormElement;
  // Typed by the visitor (a value, not the default), so reset() would clear it.
  (form.querySelector('textarea') as HTMLTextAreaElement).value = 'A long, carefully written inquiry';
  return form;
}
const submit = async (form: HTMLFormElement) => {
  form.dispatchEvent(new Event('submit', { cancelable: true }));
  await new Promise((r) => setTimeout(r, 0));
};
const message = (form: HTMLFormElement) => (form.querySelector('textarea') as HTMLTextAreaElement).value;
const status = (form: HTMLFormElement) => form.querySelector('.form-status')!.textContent;

describe('inquiry form behavior', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('keeps the message and shows the error when the network fails', async () => {
    const form = mountForm();
    initInquiryForm(form, vi.fn().mockRejectedValue(new TypeError('offline')));
    await submit(form);
    expect(message(form)).toBe('A long, carefully written inquiry');
    expect(status(form)).toBe(MESSAGES.error);
    expect(form.querySelector('button')!.disabled).toBe(false);
  });

  it('keeps the message and shows the error on a 500', async () => {
    const form = mountForm();
    initInquiryForm(form, vi.fn().mockResolvedValue(new Response('{}', { status: 500 })));
    await submit(form);
    expect(message(form)).toBe('A long, carefully written inquiry');
    expect(status(form)).toBe(MESSAGES.error);
  });

  it('clears the form and thanks the visitor on success', async () => {
    const form = mountForm();
    const fetchImpl = vi.fn().mockResolvedValue(new Response('{}', { status: 200 }));
    initInquiryForm(form, fetchImpl);
    await submit(form);
    expect(fetchImpl).toHaveBeenCalledWith('https://formspree.io/f/abc123', expect.objectContaining({ method: 'POST' }));
    expect(status(form)).toBe(MESSAGES.success);
    expect(message(form)).toBe('');
  });

  it('sends nothing when the honeypot is filled', async () => {
    const form = mountForm();
    (form.querySelector('[name=_gotcha]') as HTMLInputElement).value = 'bot';
    const fetchImpl = vi.fn();
    initInquiryForm(form, fetchImpl);
    await submit(form);
    expect(fetchImpl).not.toHaveBeenCalled();
    expect(status(form)).toBe(MESSAGES.success);
  });
});

describe('mobile menu behavior', () => {
  beforeEach(() => {
    document.body.innerHTML = `<button class="burger" aria-controls="site-nav" aria-expanded="false">Menu</button><nav id="site-nav"></nav>`;
  });

  it('opens on click and closes on Escape', () => {
    const button = document.querySelector('button') as HTMLButtonElement;
    const nav = document.getElementById('site-nav') as HTMLElement;
    initMenu(button, nav, document);
    button.click();
    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(nav.classList.contains('nav--open')).toBe(true);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(nav.classList.contains('nav--open')).toBe(false);
  });
});
