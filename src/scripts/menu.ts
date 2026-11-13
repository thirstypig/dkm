/* Mobile disclosure menu. On desktop the nav is always visible (CSS). */
export function initMenu(button: HTMLButtonElement, nav: HTMLElement, doc: Document = document): void {
  const set = (open: boolean) => {
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close' : 'Menu';
    nav.classList.toggle('nav--open', open);
  };
  button.addEventListener('click', () => set(button.getAttribute('aria-expanded') !== 'true'));
  doc.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && button.getAttribute('aria-expanded') === 'true') {
      set(false);
      button.focus();
    }
  });
}
