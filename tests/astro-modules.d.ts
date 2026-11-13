// Plain `tsc` (the last step of `npm run typecheck`) cannot parse .astro
// files; `astro check` covers them. This lets tsc accept tests that import
// components for the Astro Container API.
declare module '*.astro' {
  import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
  const Component: AstroComponentFactory;
  export default Component;
}
