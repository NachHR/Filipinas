/* Run with sharp available: NODE_PATH=/path/to/node_modules node scripts/build-icons.cjs */
const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const root = path.resolve(__dirname, '..');
const flag = fs.readFileSync(path.join(root, 'flag-ph.svg'), 'utf8');
(async () => {
  for (const size of [192, 512]) {
    await sharp(Buffer.from(flag)).resize(size, size).png().toFile(path.join(root, `icon-flag-${size}.png`));
  }
  // The whole circular mark fits inside Android's 80% safe zone.
  const maskable = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#f5f3ee"/><g transform="translate(51.2 51.2) scale(6.4)">${flag.replace(/<svg[^>]*>/, '').replace('</svg>', '')}</g></svg>`;
  await sharp(Buffer.from(maskable)).png().toFile(path.join(root, 'icon-flag-maskable-512.png'));
})().catch(error => { console.error(error); process.exitCode = 1; });
