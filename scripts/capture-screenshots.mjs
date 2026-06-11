import { chromium } from 'playwright';
import { mkdir } from 'fs/promises';

const base = 'http://localhost:5173';
const outDir = '/opt/cursor/artifacts/screenshots';

const pages = [
  { name: 'decision-center', path: '/app' },
  { name: 'analysis', path: '/app/analysis' },
  { name: 'case-list', path: '/app/cases' },
  { name: 'case-file', path: '/app/cases/CASE-1778550668763' },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const { name, path } of pages) {
  await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}/${name}.png`, fullPage: true });
  console.log(`saved ${name}.png`);
}

await browser.close();
