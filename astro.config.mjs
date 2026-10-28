import { defineConfig } from 'astro/config';
import { profile } from './src/data/profile.ts';

// Keep local previews at /. Supply both values for a project hosted on Pages.
const site = process.env.SITE_URL || profile.publicUrl || undefined;
const base = process.env.BASE_PATH || '/';
if (site && !/^https:\/\//.test(site)) throw new Error('SITE_URL must use HTTPS.');
if (!base.startsWith('/') || !base.endsWith('/')) throw new Error('BASE_PATH must start and end with /.');

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
