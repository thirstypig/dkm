import { configDefaults, defineConfig } from 'vitest/config';

// `.claude/` holds Claude Code worktrees — full second checkouts whose tests
// would otherwise be collected and run twice (see pasadenaworks, 2026-09-11).
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, '.claude/**'],
  },
});
