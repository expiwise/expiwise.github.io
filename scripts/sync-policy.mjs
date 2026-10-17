// Copies the privacy policy from ../docs (the single source of truth, also used
// by the store listings) into the site, and swaps in the real support email.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const site = JSON.parse(readFileSync(resolve(root, 'src/site.json'), 'utf8'));
const out = resolve(root, 'src/content/privacy');
mkdirSync(out, { recursive: true });

const files = { en: '../docs/privacy-policy.md', ja: '../docs/privacy-policy.ja.md' };
for (const [lang, rel] of Object.entries(files)) {
  if (!existsSync(resolve(root, rel))) {
    console.log(`policy source not found for ${lang}; keeping the committed copy`);
    continue;
  }
  const text = readFileSync(resolve(root, rel), 'utf8')
    .replaceAll('feedback@example.com', site.supportEmail);
  writeFileSync(resolve(out, `${lang}.md`), text);
  console.log(`policy synced: ${lang}`);
}
