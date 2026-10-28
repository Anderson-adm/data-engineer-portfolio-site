import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';

const routes = ['', 'projetos/enterprise-risk-liquidity/', 'projetos/financial-data-lake/', 'projetos/event-driven-integration/'];
const widths = [320, 390, 768, 1440];

for (const width of widths) {
  for (const route of routes) {
    test(`${width}px: ${route || 'home'} — layout, accessibility, metadata and assets`, async ({ page }) => {
      await page.setViewportSize({ width, height: 960 });
      const failures: string[] = [];
      page.on('pageerror', error => failures.push(error.message));
      page.on('requestfailed', request => failures.push(`${request.failure()?.errorText} ${request.url()}`));
      page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
      const response = await page.goto(route || './');
      expect(response?.status()).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await page.locator('img').evaluateAll(images => Promise.all((images as HTMLImageElement[]).map(image => image.decode())));
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR');
      await expect(page).toHaveTitle(/Data|Dados/);
      expect(await page.locator('meta[name="description"]').getAttribute('content')).toBeTruthy();
      expect(await page.locator('link[rel="icon"]').getAttribute('href')).toBeTruthy();
      if (process.env.SITE_URL) {
        const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
        expect(canonical).toBe(new URL(`${process.env.BASE_PATH || '/'}${route}`, process.env.SITE_URL).href);
      }
      const overflow = await page.evaluate(() => ({ viewport: window.innerWidth, document: document.documentElement.scrollWidth }));
      expect(overflow.document).toBeLessThanOrEqual(overflow.viewport);
      const brokenImages = await page.locator('img').evaluateAll(images => (images as HTMLImageElement[]).filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src));
      expect(brokenImages).toEqual([]);
      const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      expect(audit.violations.map(item => ({ id: item.id, nodes: item.nodes.map(node => node.target) }))).toEqual([]);
      expect(failures).toEqual([]);
      if (width === 390 || width === 1440) {
        await mkdir('artifacts/screenshots', { recursive: true });
        await page.screenshot({ path: `artifacts/screenshots/${route ? route.split('/')[1] : 'home'}-${width}.png`, fullPage: true });
      }
    });
  }
}

for (const size of [{ width: 1366, height: 768 }, { width: 1440, height: 900 }]) {
  test(`home shows all three project cards without scrolling at ${size.width}x${size.height}`, async ({ page }) => {
    await page.setViewportSize(size);
    await page.goto('./');
    await page.evaluate(() => document.fonts.ready);
    const cards = await page.locator('.project-card').evaluateAll(elements => elements.map(element => ({ top: element.getBoundingClientRect().top, bottom: element.getBoundingClientRect().bottom })));
    expect(cards).toHaveLength(3);
    for (const card of cards) { expect(card.top).toBeGreaterThan(0); expect(card.bottom).toBeLessThanOrEqual(size.height); }
    for (const name of ['Python', 'SQL', 'AWS']) await expect(page.locator('.technology-list .tech-name', { hasText: new RegExp(`^${name}$`) })).toBeVisible();
    for (const group of ['Linguagens', 'Tools', 'Databases', 'Cloud']) await expect(page.locator('.technology-group h3', { hasText: group })).toBeVisible();
    await expect(page.locator('.technology-group', { has: page.getByRole('heading', { name: 'Tools', exact: true }) }).getByText('CI/CD', { exact: true })).toBeVisible();
  });
}

test('keyboard navigation, project round-trip and honest states', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeFocused();
  await expect(page.getByRole('link', { name: 'Pular para o conteúdo' })).toBeInViewport();
  const focusStyle = await page.locator(':focus').evaluate(element => getComputedStyle(element).outlineStyle);
  expect(focusStyle).not.toBe('none');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#conteudo$/);
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Explorar projetos' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#projetos$/);
  await page.getByRole('link', { name: /^Conhecer o case 01/ }).click();
  await expect(page).toHaveURL(/projetos\/enterprise-risk-liquidity\/$/);
  await expect(page.getByText('Reconstrução autoral em desenvolvimento', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: '← Todos os projetos' }).click();
  await expect(page).toHaveURL(/#projetos$/);
  await expect(page.locator('.project-card')).toHaveCount(3);
  await expect(page.locator('.project-card .status', { hasText: 'Planejado' })).toHaveCount(2);
  await expect(page.locator('a[href=""], a[href="#"], a[href*="example.com"]')).toHaveCount(0);
});

test('every navigation anchor has a real destination and reduced motion is respected', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('./');
  expect(await page.locator('html').evaluate(element => getComputedStyle(element).scrollBehavior)).toBe('auto');
  const anchors = await page.locator('a[href^="#"]').evaluateAll(elements => elements.map(element => element.getAttribute('href')!));
  for (const anchor of anchors) expect(await page.locator(`[id="${anchor.slice(1)}"]`).count()).toBe(1);
  await page.goto('projetos/financial-data-lake/');
  await page.getByRole('link', { name: 'Projetos', exact: true }).click();
  await expect(page).toHaveURL(/#projetos$/);
});

test('custom 404 returns a useful route home', async ({ page }) => {
  await page.goto('404.html');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Essa conexão');
  await page.getByRole('link', { name: 'Voltar ao início →' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Dados conectados.');
});
