import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import Home from '../src/pages/index.astro';
import Services from '../src/pages/services.astro';
import Approach from '../src/pages/approach.astro';
import About from '../src/pages/about.astro';
import NotFound from '../src/pages/404.astro';
import { site } from '../src/data/site';

export const PRICING = /\$\s?\d|per week|installment|34,000|2,000/i;

let container: AstroContainer;
const html: Record<string, string> = {};

beforeAll(async () => {
  container = await AstroContainer.create();
  const pages = { home: Home, services: Services, approach: Approach, about: About, notFound: NotFound };
  for (const [k, page] of Object.entries(pages)) {
    html[k] = await container.renderToString(page);
  }
});

const text = (s: string) => s.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ');

describe('Home', () => {
  it('leads with the pitch', () => {
    expect(text(html.home)).toContain(
      'Bookings fail in two ways. Either the audience doesn’t care, or the guest doesn’t deliver. I’m hired to prevent both.',
    );
  });

  it('shows the title line', () => {
    expect(text(html.home)).toContain(site.titleLine);
  });

  it('names her former networks', () => {
    for (const n of ['REVOLT', 'TV One', 'BET', 'Telepictures']) expect(text(html.home)).toContain(n);
  });
});

describe('Services', () => {
  it('frames talent producing as fractional', () => {
    expect(text(html.services)).toContain('fractional talent producer');
  });

  it('lists all seven weekly deliverables', () => {
    for (const d of [
      'Weekly guest strategy',
      'A forward-looking guest pipeline',
      'Tailored pitches to representation',
      'Scheduling against your production calendar',
      'A prep document for every booked guest',
      'A shared booking tracker',
      'A weekly status call',
    ]) {
      expect(text(html.services)).toContain(d);
    }
  });

  it('keeps her title out of the page heading', () => {
    const h1 = html.services.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '';
    expect(h1).not.toContain('SVP');
  });

  it('has anchors the home page links to', () => {
    expect(html.services).toMatch(/id="producing"/);
    expect(html.services).toMatch(/id="booking"/);
  });
});

describe('Approach', () => {
  it('has the seven steps in order', () => {
    const steps = html.approach.match(/<ol[^>]*class="steps"[^>]*>([\s\S]*?)<\/ol>/)?.[1] ?? '';
    expect(steps.match(/<li/g)?.length).toBe(7);
    const order = [
      'Guest strategy', 'Forward pipeline', 'Tailored pitches', 'Scheduling',
      'Guest prep document', 'Shared tracker', 'Weekly status call',
    ].map((h) => text(steps).indexOf(h));
    expect(order.every((i) => i >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });
});

describe('About', () => {
  it('has the career timeline', () => {
    const t = text(html.about);
    for (const [yr, co] of [
      ['2022 – 2025', 'REVOLT Media & TV'],
      ['2015 – 2022', 'TV One'],
      ['2014', 'Telepictures'],
      ['2009 – 2014', 'BET Networks'],
    ]) {
      expect(t).toContain(yr);
      expect(t).toContain(co);
    }
  });

  it('includes the extras the owner approved', () => {
    expect(text(html.about)).toContain(
      'She is also a published author and photographer, and a board member of Black Girls Film Camp.',
    );
  });
});

describe('every page', () => {
  it('has no pricing', () => {
    for (const [k, h] of Object.entries(html)) expect(text(h), k).not.toMatch(PRICING);
  });

  it('never shows "NOT HR"', () => {
    for (const [k, h] of Object.entries(html)) expect(h, k).not.toContain('NOT HR');
  });

  it('gives every image alt text', () => {
    for (const [k, h] of Object.entries(html)) {
      for (const img of h.match(/<img[^>]*>/g) ?? []) {
        expect(img, k).toMatch(/alt="[^"]+"/);
      }
    }
  });

  it('404 links home and is noindex', () => {
    expect(text(html.notFound)).toContain('Page not found');
    expect(html.notFound).toContain('noindex, nofollow');
  });
});
