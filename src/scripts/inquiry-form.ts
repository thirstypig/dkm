/* Inquiry form submit handler (Formspree). Kept in a module so tests can run
   it against a stubbed fetch. */

export const MESSAGES = {
  sending: 'Sending…',
  success: 'Thank you — your inquiry is on its way. Donyell will reply personally.',
  error: 'Something went wrong. Please try again in a moment.',
} as const;

export function initInquiryForm(form: HTMLFormElement, fetchImpl: typeof fetch = fetch): void {
  const button = form.querySelector('button[type="submit"]') ?? form.querySelector('button');
  const status = form.querySelector('.form-status');
  if (!(button instanceof HTMLButtonElement) || !(status instanceof HTMLElement)) return;
  const label = button.textContent ?? '';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    status.classList.remove('form-status--error');

    // Honeypot filled => a bot. Report success and send nothing.
    if (String(data.get('_gotcha') ?? '').trim() !== '') {
      form.reset();
      status.textContent = MESSAGES.success;
      return;
    }

    button.disabled = true;
    button.textContent = MESSAGES.sending;
    status.textContent = '';
    try {
      const response = await fetchImpl(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (response.ok) {
        // Reset ONLY on success: a failed send must keep what they typed.
        form.reset();
        status.textContent = MESSAGES.success;
      } else {
        status.textContent = MESSAGES.error;
        status.classList.add('form-status--error');
      }
    } catch {
      status.textContent = MESSAGES.error;
      status.classList.add('form-status--error');
    } finally {
      button.disabled = false;
      button.textContent = label;
    }
  });
}
