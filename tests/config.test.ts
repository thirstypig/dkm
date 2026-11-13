import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import config from '../astro.config.mjs';

describe('astro config', () => {
  it('site is the dkm subdomain', () => {
    expect(config.site).toBe('https://dkm.pasadenaworks.com');
  });

  it('ports are strict', () => {
    // A busy port must fail loudly, not drift into a neighbor's reserved slot
    // (see ~/Projects/MASTER-PORTS.md and pasadenaworks' 3181 incident).
    expect(config.vite?.server?.strictPort).toBe(true);
    expect(config.vite?.preview?.strictPort).toBe(true);
  });

  it('CNAME file names the subdomain', () => {
    expect(readFileSync('public/CNAME', 'utf8').trim()).toBe('dkm.pasadenaworks.com');
  });

  it('no sitemap integration', () => {
    // Site is hidden from search engines until Donyell approves it.
    const names = (config.integrations ?? []).flat().map((i) => (i && typeof i === 'object' && 'name' in i ? i.name : ''));
    expect(names.some((n) => n.includes('sitemap'))).toBe(false);
  });
});
