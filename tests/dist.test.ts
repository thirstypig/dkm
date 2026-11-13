import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Checks the BUILT site. Skips when dist/ is absent (CI runs it again after
// `npm run build`).
const DIST = 'dist';
const PRICING = /\$\s?\d|per week|installment|34,000|2,000/i;

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return htmlFiles(p);
    return p.endsWith('.html') ? [p] : [];
  });
}

describe.skipIf(!existsSync(DIST))('built site', () => {
  const pages = existsSync(DIST) ? htmlFiles(DIST) : [];

  it('builds all six pages', () => {
    expect(pages.map((p) => p.slice(DIST.length + 1)).sort()).toEqual([
      '404.html', 'about/index.html', 'approach/index.html', 'contact/index.html',
      'index.html', 'services/index.html',
    ]);
  });

  it('every page is noindex, priceless, and free of "NOT HR"', () => {
    for (const p of pages) {
      const html = readFileSync(p, 'utf8');
      expect(html, p).toContain('<meta name="robots" content="noindex, nofollow">');
      expect(html.replace(/<[^>]+>/g, ' '), p).not.toMatch(PRICING);
      expect(html, p).not.toContain('NOT HR');
    }
  });

  it('robots.txt disallows everything', () => {
    expect(readFileSync(join(DIST, 'robots.txt'), 'utf8')).toBe('User-agent: *\nDisallow: /\n');
  });

  it('CNAME names the subdomain', () => {
    expect(readFileSync(join(DIST, 'CNAME'), 'utf8').trim()).toBe('dkm.pasadenaworks.com');
  });

  it('publishes no sitemap', () => {
    expect(readdirSync(DIST).filter((f) => f.startsWith('sitemap'))).toEqual([]);
  });
});
