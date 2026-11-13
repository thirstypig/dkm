import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

describe('brand files', () => {
  it('favicon is the supplied dark avatar', () => {
    expect(readFileSync('public/favicon.svg', 'utf8')).toBe(readFileSync('brand/dkm-avatar-dark.svg', 'utf8'));
  });

  it('Logo component uses the supplied knockout path', () => {
    const supplied = readFileSync('brand/dkm-logo.svg', 'utf8').match(/ d="([^"]+)"/)![1];
    expect(readFileSync('src/components/Logo.astro', 'utf8')).toContain(supplied);
  });
});
