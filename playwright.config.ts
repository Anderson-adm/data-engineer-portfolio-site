import { defineConfig } from '@playwright/test';
const base = process.env.BASE_PATH || '/';
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: { baseURL: `http://127.0.0.1:4321${base}`, browserName: 'chromium', headless: true },
  webServer: {
    // Keep the server attached even when Astro detects an agent environment.
    command: 'npm run preview -- --ignore-lock --host 127.0.0.1 --port 4321',
    url: `http://127.0.0.1:4321${base}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
