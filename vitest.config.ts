/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';
import { configDefaults } from 'vitest/config';

// getViteConfig lets Vitest compile .astro files so components can be rendered
// with the Astro Container API in tests.
//
// `.claude/` holds Claude Code worktrees — full second checkouts whose tests
// would otherwise be collected and run twice (see pasadenaworks, 2026-09-11).
export default getViteConfig({
  test: {
    exclude: [...configDefaults.exclude, '.claude/**', '.superpowers/**', 'worker/**'],
  },
});
