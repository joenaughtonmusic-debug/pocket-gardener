import { removeBackground } from '@imgly/background-removal-node';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const RAW_DIR = path.resolve('assets/plant-overlays/raw');
const PROCESSED_DIR = path.resolve('assets/plant-overlays/processed');
const PUBLIC_DIR = path.resolve('public/plant-overlays');

const SUPPORTED_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp']);
const LARGE_FILE_WARN_BYTES = 5 * 1024 * 1024; // 5 MB
const TRANSPARENT_WARN_LOW = 5;   // < 5% transparent → background may not have been removed
const TRANSPARENT_WARN_HIGH = 95; // > 95% transparent → foreground may have been erased

type ProcessStatus = 'passed' | 'warning' | 'failed';

interface ProcessingResult {
  inputFile: string;
  outputFile: string;
  width: number;
  height: number;
  hasAlpha: boolean;
  transparentPercent: number;
  fileSizeBytes: number;
  status: ProcessStatus;
  warnings: string[];
  error?: string;
}

async function validateTransparency(imagePath: string): Promise<{
  transparentPercent: number;
  width: number;
  height: number;
  hasAlpha: boolean;
}> {
  const metadata = await sharp(imagePath).metadata();
  const hasAlpha = (metadata.channels ?? 0) >= 4;
  const width = metadata.width ?? 0;
  const height = metadata.height ?? 0;

  if (!hasAlpha) {
    return { transparentPercent: 0, width, height, hasAlpha: false };
  }

  const { data } = await sharp(imagePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const totalPixels = width * height;
  let transparentCount = 0;

  // Alpha channel is the 4th byte of each RGBA pixel
  for (let i = 3; i < data.length; i += 4) {
    if ((data[i] as number) < 10) transparentCount++;
  }

  const transparentPercent =
    totalPixels > 0 ? (transparentCount / totalPixels) * 100 : 0;

  return { transparentPercent, width, height, hasAlpha: true };
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

async function processImage(
  inputPath: string,
  filename: string,
): Promise<ProcessingResult> {
  const baseName = path.basename(filename, path.extname(filename));
  const outputFilename = `${baseName}.png`;
  const outputPath = path.join(PROCESSED_DIR, outputFilename);
  const publicPath = path.join(PUBLIC_DIR, outputFilename);

  const warnings: string[] = [];
  let status: ProcessStatus = 'passed';

  try {
    const ext = path.extname(filename).toLowerCase();
    const mimeMap: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
    };
    const inferredMime = mimeMap[ext] ?? 'image/png';

    console.log(`\n  Processing: ${filename}`);
    console.log(`    Extension:  ${ext || '(none)'}`);
    console.log(`    MIME:       ${inferredMime}`);

    const inputBuffer = fs.readFileSync(inputPath);
    console.log(`    Raw size:   ${formatBytes(inputBuffer.length)}`);

    // Normalise to PNG via sharp so the Blob has a predictable format.
    // Passing a raw Buffer directly gives it no MIME type, which causes
    // the library's imageDecode to throw "Unsupported format:".
    const normalisedPng = await sharp(inputBuffer).png().toBuffer();
    console.log(`    Norm size:  ${formatBytes(normalisedPng.length)}`);

    // Extract a plain ArrayBuffer from the Node Buffer so Blob constructor is happy
    const pngArrayBuffer = normalisedPng.buffer.slice(
      normalisedPng.byteOffset,
      normalisedPng.byteOffset + normalisedPng.byteLength,
    ) as ArrayBuffer;
    const imageBlob = new Blob([pngArrayBuffer], { type: 'image/png' });

    let lastProgressKey = '';
    const resultBlob = await removeBackground(imageBlob, {
      debug: false,
      output: { format: 'image/png' },
      progress: (key: string, current: number, total: number) => {
        const label = key.split(':').pop() ?? key;
        if (label !== lastProgressKey) {
          if (lastProgressKey) process.stdout.write('\n');
          lastProgressKey = label;
        }
        const pct = total > 0 ? Math.round((current / total) * 100) : 0;
        process.stdout.write(`\r    ${label}: ${pct}%`);
        if (current === total) {
          process.stdout.write('\n');
          lastProgressKey = '';
        }
      },
    });

    const arrayBuffer = await resultBlob.arrayBuffer();
    const outputBuffer = Buffer.from(arrayBuffer);

    fs.writeFileSync(outputPath, outputBuffer);
    fs.copyFileSync(outputPath, publicPath);

    const { transparentPercent, width, height, hasAlpha } =
      await validateTransparency(outputPath);
    const fileSizeBytes = fs.statSync(outputPath).size;

    if (!hasAlpha) {
      warnings.push('No alpha channel found — background removal may have failed');
      status = 'warning';
    }

    if (transparentPercent < TRANSPARENT_WARN_LOW) {
      warnings.push(
        `Only ${transparentPercent.toFixed(1)}% transparent — image appears mostly opaque; check removal quality`,
      );
      status = 'warning';
    }

    if (transparentPercent > TRANSPARENT_WARN_HIGH) {
      warnings.push(
        `${transparentPercent.toFixed(1)}% transparent — image appears mostly empty; foreground may have been erased`,
      );
      status = 'warning';
    }

    if (fileSizeBytes > LARGE_FILE_WARN_BYTES) {
      warnings.push(
        `Output is ${formatBytes(fileSizeBytes)} — unusually large for a plant overlay`,
      );
      status = 'warning';
    }

    return {
      inputFile: filename,
      outputFile: outputFilename,
      width,
      height,
      hasAlpha,
      transparentPercent,
      fileSizeBytes,
      status,
      warnings,
    };
  } catch (err) {
    const ext = path.extname(filename).toLowerCase();
    const mimeMap: Record<string, string> = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.webp': 'image/webp',
    };
    const inferredMime = mimeMap[ext] ?? 'unknown';
    let rawSize = 0;
    try { rawSize = fs.statSync(inputPath).size; } catch { /* ignore */ }

    const message = err instanceof Error ? err.message : String(err);
    console.error(`\n    ERROR details:`);
    console.error(`      filename:   ${filename}`);
    console.error(`      extension:  ${ext || '(none)'}`);
    console.error(`      MIME:       ${inferredMime}`);
    console.error(`      input size: ${formatBytes(rawSize)}`);
    console.error(`      message:    ${message}`);

    return {
      inputFile: filename,
      outputFile: outputFilename,
      width: 0,
      height: 0,
      hasAlpha: false,
      transparentPercent: 0,
      fileSizeBytes: 0,
      status: 'failed',
      warnings,
      error: message,
    };
  }
}

function printReport(results: ProcessingResult[]): void {
  const HR = '─'.repeat(72);
  const HEAVY = '═'.repeat(72);

  console.log(`\n${HEAVY}`);
  console.log('  Plant Overlay Processing Report');
  console.log(HEAVY);

  for (const r of results) {
    console.log(`\n${HR}`);
    console.log(`  Input:        ${r.inputFile}`);
    console.log(`  Output:       ${r.outputFile}`);

    if (r.status === 'failed') {
      console.log(`  Status:       FAILED`);
      console.log(`  Error:        ${r.error ?? 'unknown error'}`);
    } else {
      console.log(`  Dimensions:   ${r.width} × ${r.height} px`);
      console.log(`  Alpha:        ${r.hasAlpha ? 'yes' : 'NO'}`);
      console.log(`  Transparent:  ${r.transparentPercent.toFixed(1)}%`);
      console.log(`  File size:    ${formatBytes(r.fileSizeBytes)}`);
      console.log(`  Status:       ${r.status.toUpperCase()}`);

      if (r.warnings.length > 0) {
        console.log('  Warnings:');
        for (const w of r.warnings) {
          console.log(`    ⚠  ${w}`);
        }
      }
    }
  }

  const passed = results.filter((r) => r.status === 'passed').length;
  const warned = results.filter((r) => r.status === 'warning').length;
  const failed = results.filter((r) => r.status === 'failed').length;

  console.log(`\n${HEAVY}`);
  console.log(
    `  Summary: ${results.length} file(s) — ${passed} passed · ${warned} warning · ${failed} failed`,
  );
  console.log(`  Processed → assets/plant-overlays/processed/`);
  console.log(`  Copied    → public/plant-overlays/`);
  console.log(`  Preview   → http://localhost:3000/dev-overlay`);
  console.log(`${HEAVY}\n`);
}

async function main(): Promise<void> {
  for (const dir of [RAW_DIR, PROCESSED_DIR, PUBLIC_DIR]) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  const entries = fs.readdirSync(RAW_DIR);
  const imageFiles = entries.filter((f) => {
    const ext = path.extname(f).toLowerCase();
    return SUPPORTED_EXT.has(ext) && !f.startsWith('.');
  });

  if (imageFiles.length === 0) {
    console.log('\nNo images found in assets/plant-overlays/raw/');
    console.log('Supported formats: .png  .jpg  .jpeg  .webp');
    console.log(
      'Drop plant images into that folder, then run: npm run process:plant-overlays\n',
    );
    return;
  }

  console.log(`\nFound ${imageFiles.length} image(s) in assets/plant-overlays/raw/`);

  const results: ProcessingResult[] = [];
  for (const filename of imageFiles) {
    const inputPath = path.join(RAW_DIR, filename);
    const result = await processImage(inputPath, filename);
    results.push(result);
  }

  printReport(results);
}

main().catch((err: unknown) => {
  console.error('\nFatal error:', err instanceof Error ? err.message : err);
  process.exit(1);
});
