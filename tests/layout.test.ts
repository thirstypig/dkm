import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Base from '../src/layouts/Base.astro';
import Header from '../src/components/Header.astro';
import { site } from '../src/data/site';

let container: AstroContainer;
beforeAll(async () => {
  container = await AstroContainer.create();
});

describe('Base layout', () => {
  it('loads the review gate in <head> before the page renders, and the overlay', async () => {
    const html = await container.renderToString(Base, { props: { title: 'T', description: 'D' } });
    const head = html.slice(0, html.indexOf('</head>'));
    expect(head).toContain('window.DKM_REVIEW=');
    expect(head).toMatch(/<script src="\/review\/gate\.js"><\/script>/);
    expect(head.indexOf('window.DKM_REVIEW=')).toBeLessThan(head.indexOf('/review/gate.js'));
    expect(html).toMatch(/<script src="\/review\/overlay\.js" defer><\/script>/);
  });

  it('is hidden from search engines', async () => {
    const html = await container.renderToString(Base, { props: { title: 'T', description: 'D' } });
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
  });

  it('renders the page description', async () => {
    const html = await container.renderToString(Base, { props: { title: 'T', description: 'D' } });
    expect(html).toContain('<meta name="description" content="D">');
  });

  it('header logo is the DKM monogram linking home', async () => {
    const html = await container.renderToString(Base, { props: { title: 'T', description: 'D' } });
    const header = html.match(/<header[\s\S]*?<\/header>/)![0];
    const link = header.match(/<a[^>]*href="\/"[^>]*>([\s\S]*?)<\/a>/)!;
    expect(link[1]).toMatch(/<svg[^>]*viewBox="0 0 356 140"/);
    expect(link[0]).toMatch(/aria-label="DKM — home"/);
  });

  it('uses the DKM avatar as favicon', async () => {
    const html = await container.renderToString(Base, { props: { title: 'T', description: 'D' } });
    expect(html).toContain('<link rel="icon" href="/favicon.svg" type="image/svg+xml">');
  });

  it('marks the current nav item', async () => {
    const html = await container.renderToString(Base, {
      props: { title: 'T', description: 'D', current: 'about' },
    });
    expect(html).toMatch(/<a[^>]*href="\/about\/"[^>]*aria-current="page"|<a[^>]*aria-current="page"[^>]*href="\/about\/"/);
    expect(html.match(/aria-current="page"/g)?.length).toBe(1);
  });

  it('footer links every social profile in a new tab', async () => {
    const html = await container.renderToString(Base, { props: { title: 'T', description: 'D' } });
    for (const s of site.socials) {
      const tag = html.match(new RegExp(`<a[^>]*href="${s.href.replace(/[.?/]/g, '\\$&')}"[^>]*>`, 'g'));
      expect(tag, s.label).not.toBeNull();
      expect(tag!.some((t) => t.includes('target="_blank"') && t.includes('rel="me noopener"')), s.label).toBe(true);
    }
  });
});

describe('Header', () => {
  it('mobile menu button toggles nav with aria-expanded', async () => {
    const html = await container.renderToString(Header, { props: {} });
    expect(html).toMatch(/<button[^>]*aria-controls="site-nav"/);
    expect(html).toMatch(/<button[^>]*aria-expanded="false"/);
    expect(html).toMatch(/<nav[^>]*id="site-nav"/);
  });
});
