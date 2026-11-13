// @vitest-environment happy-dom
// Review gate + feedback overlay (public/review/). Never hits the real Worker:
// fetch is mocked. Remove with the overlay at launch.
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { review } from '../src/data/review';

const gateSrc = readFileSync('public/review/gate.js', 'utf8');
const overlaySrc = readFileSync('public/review/overlay.js', 'utf8');
const tick = (ms = 0) => new Promise((r) => setTimeout(r, ms));

function threadKey(pathname: string): string {
  // overlay.js exports threadKey via module.exports when there is no document.
  const mod = { exports: {} as { threadKey: (p: string) => string } };
  new Function('module', 'document', overlaySrc)(mod, undefined);
  return mod.exports.threadKey(pathname);
}

function reset(path = '/services/') {
  localStorage.clear();
  document.documentElement.className = '';
  document.head.innerHTML = '';
  document.body.innerHTML = `<main><a id="link" href="/about/">About</a><p style="height:2000px">x</p></main>`;
  history.replaceState(null, '', path);
  (window as any).DKM_REVIEW = { ...review };
}

describe('review config', () => {
  it('stores a salted hash of "white", never the word itself', async () => {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('dkm-preview:white'));
    const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
    expect(review.hash).toBe(hex);
    expect(JSON.stringify(review)).not.toMatch(/white/);
    expect(review.api).toMatch(/^https:\/\/dkm-review\..+\.workers\.dev$/);
  });
});

describe('threadKey', () => {
  it.each([
    ['/', 'home'], ['', 'home'], ['/index.html', 'home'],
    ['/services/', 'services'], ['/approach/', 'approach'], ['/about/index.html', 'about'],
    ['/Contact/', 'contact'], ['/contact', 'contact'],
  ])('%s → %s', (p, k) => expect(threadKey(p)).toBe(k));
});

describe('gate', () => {
  beforeEach(() => reset());

  it('locks the page until the password is entered', async () => {
    new Function(gateSrc)();
    expect(document.documentElement.classList.contains('vr-locked')).toBe(true);
    const input = document.querySelector<HTMLInputElement>('#vr-pass')!;
    const form = document.querySelector('#vr-gate form')!;

    input.value = 'black';
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await tick(20);
    expect(document.querySelector('#vr-gate')).not.toBeNull();
    expect(document.querySelector('.vr-gate-err')!.textContent).toMatch(/didn’t match/);

    input.value = 'white';
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await tick(20);
    expect(document.querySelector('#vr-gate')).toBeNull();
    expect(document.documentElement.classList.contains('vr-locked')).toBe(false);
  });

  it('remembers the unlock', () => {
    localStorage.setItem('dkm-review-unlocked', review.hash);
    new Function(gateSrc)();
    expect(document.querySelector('#vr-gate')).toBeNull();
    expect(document.documentElement.classList.contains('vr-locked')).toBe(false);
  });
});

describe('overlay', () => {
  let fetchMock: ReturnType<typeof vi.fn>;
  beforeEach(() => {
    reset('/services/');
    localStorage.setItem('dkm-review-unlocked', review.hash);
    fetchMock = vi.fn(async (url: string, init?: RequestInit) => {
      if (init?.method === 'POST') {
        const body = JSON.parse(String(init.body));
        return new Response(JSON.stringify({ comment: { id: 'c1', createdAt: '2026-11-12T00:00:00Z', ...body } }), { status: 201 });
      }
      return new Response(JSON.stringify({ comments: [] }), { status: 200 });
    });
    vi.stubGlobal('fetch', fetchMock);
  });

  const mount = async () => { new Function(overlaySrc)(); await tick(10); };

  it('starts collapsed to a Feedback tab and loads this page’s thread', async () => {
    await mount();
    expect(document.querySelector('#vr-tab')!.textContent).toBe('Feedback (0)');
    expect(document.querySelector<HTMLElement>('#vr-panel')!.hidden).toBe(true);
    expect(String(fetchMock.mock.calls[0][0])).toBe(`${review.api}/comments?thread=services`);
  });

  it('opens the sidebar and posts a comment to the right thread', async () => {
    await mount();
    document.querySelector<HTMLButtonElement>('#vr-tab')!.click();
    expect(document.querySelector<HTMLElement>('#vr-panel')!.hidden).toBe(false);
    document.querySelector<HTMLTextAreaElement>('#vr-text')!.value = 'Tighten the hero copy';
    document.querySelector('#vr-panel form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    await tick(10);
    const [url, init] = fetchMock.mock.calls.at(-1)!;
    expect(url).toBe(`${review.api}/comments`);
    expect(JSON.parse(init.body)).toEqual({ thread: 'services', text: 'Tighten the hero copy' });
    expect(document.querySelector('.vr-list .vr-text')!.textContent).toBe('Tighten the hero copy');
    expect(document.querySelector('#vr-tab')!.textContent).toBe('Feedback (1)');
  });

  it('renders comment text as text, not HTML', async () => {
    fetchMock.mockImplementationOnce(async () => new Response(JSON.stringify({
      comments: [{ id: 'x', createdAt: '2026-11-12T00:00:00Z', text: '<img src=x onerror=alert(1)>' }],
    })));
    await mount();
    expect(document.querySelector('.vr-list img')).toBeNull();
    expect(document.querySelector('.vr-list .vr-text')!.textContent).toBe('<img src=x onerror=alert(1)>');
  });

  it('placing a pin on a link does not follow the link', async () => {
    await mount();
    document.querySelector<HTMLButtonElement>('#vr-tab')!.click();
    [...document.querySelectorAll<HTMLButtonElement>('#vr-panel button')].find((b) => b.textContent === 'Pin on page')!.click();
    expect(document.documentElement.classList.contains('vr-placing')).toBe(true);
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    document.querySelector('#link')!.dispatchEvent(click);
    expect(click.defaultPrevented).toBe(true);
    expect(document.querySelector('#vr-pin-text')).not.toBeNull();
    expect(document.documentElement.classList.contains('vr-placing')).toBe(false);
  });

  it('waits for the gate before mounting', async () => {
    document.documentElement.classList.add('vr-locked');
    await mount();
    expect(document.querySelector('#vr-tab')).toBeNull();
    document.documentElement.classList.remove('vr-locked');
    document.dispatchEvent(new CustomEvent('vr-unlocked'));
    await tick(10);
    expect(document.querySelector('#vr-tab')).not.toBeNull();
  });
});
