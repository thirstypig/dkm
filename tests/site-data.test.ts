import { describe, it, expect } from 'vitest';
import { site } from '../src/data/site';

describe('site data', () => {
  it('title line is the approved LinkedIn-derived title', () => {
    expect(site.titleLine).toBe('Former SVP, Artist & Talent Relations Strategy and Casting');
    expect(site.titleLine).not.toContain('NOT HR');
  });

  it('social links are the four exact URLs, in order', () => {
    expect(site.socials.map((s) => s.label)).toEqual(['Instagram', 'Threads', 'YouTube', 'LinkedIn']);
    expect(site.socials.map((s) => s.href)).toEqual([
      'https://www.instagram.com/donyellkennedymccullough/',
      'https://www.threads.com/@donyellkennedymccullough',
      'https://www.youtube.com/channel/UCKr3zXboSlu9wY_KjiIr4dA',
      'https://www.linkedin.com/in/donyellkennedymccullough/',
    ]);
  });

  it('no social link carries an Instagram redirect or tracking param', () => {
    for (const s of site.socials) {
      expect(s.href).not.toMatch(/fbclid|l\.instagram\.com/);
    }
  });

  it('nav labels are in spec order', () => {
    expect(site.nav.map((n) => n.label)).toEqual(['Services', 'Approach', 'About', 'Contact']);
  });
});
