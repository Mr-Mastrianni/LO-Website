// Generates QR code SVG images for hosted documents.
// Usage: node tools/generate-qr.js
import QRCode from 'qrcode';
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://www.livingoncology.org';

const docs = [
  {
    name: 'brainstorm-cancer-and-cognition-syllabus-qr',
    url: `${SITE_URL}/documents/brainstorm-cancer-and-cognition-syllabus-sept-5-2026-indy.pdf`,
  },
];

const outDir = path.join(__dirname, '..', 'public', 'images', 'qr');
mkdirSync(outDir, { recursive: true });

for (const doc of docs) {
  const rawSvg = await QRCode.toString(doc.url, {
    type: 'svg',
    margin: 2,
    errorCorrectionLevel: 'M',
    color: { dark: '#1f2937', light: '#ffffff' },
  });

  // Add explicit intrinsic dimensions so the SVG renders predictably in <img> and standalone.
  const svg = rawSvg.replace('<svg ', '<svg width="512" height="512" ');

  const outFile = path.join(outDir, `${doc.name}.svg`);
  writeFileSync(outFile, svg, 'utf8');
  console.log(`Wrote ${outFile}`);

  const pngFile = path.join(outDir, `${doc.name}.png`);
  await QRCode.toFile(pngFile, doc.url, {
    margin: 2,
    width: 512,
    errorCorrectionLevel: 'M',
    color: { dark: '#1f2937ff', light: '#ffffffff' },
  });
  console.log(`Wrote ${pngFile}`);
  console.log(`  Encoded URL: ${doc.url}`);
}
