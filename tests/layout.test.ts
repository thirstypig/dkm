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
  it('is hidden from search engines', async () => {
    const html = await container.renderToString(Base, { props: { title: 'T', description: 'D' } });
    expect(html).toContain('<meta name="robots" content="noindex, nofollow">');
  });

  it('renders the page description', async () => {
    const html = await container.renderToString(Base, { props: { title: 'T', description: 'D' } });
    expect(html).toContain('<meta name="description" content="D">');
  });

  it('header logo is DKM linking home', async () => {
    const html = await container.renderToString(Base, { props: { title: 'T', description: 'D' } });
    expect(html).toMatch(/<a[^>]*href="\/"[^>]*>\s*DKM\s*<\/a>/);
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
