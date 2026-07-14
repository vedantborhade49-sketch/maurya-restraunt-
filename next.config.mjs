import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Auto-move assets to public folder to bypass PowerShell restrictions
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const videoSrc = path.join(__dirname, 'hero video.mp4');
const videoDest = path.join(publicDir, 'hero-video.mp4');
if (fs.existsSync(videoSrc)) {
  fs.renameSync(videoSrc, videoDest);
  console.log('Moved hero video.mp4 to public/hero-video.mp4');
}

const logoSrc = path.join(__dirname, 'morya-logo.png');
const logoDest = path.join(publicDir, 'morya-logo.png');
if (fs.existsSync(logoSrc)) {
  fs.renameSync(logoSrc, logoDest);
  console.log('Moved morya-logo.png to public/');
}

// Auto-copy editorial food images from generation directory
const geminiDir = path.join(
  process.env.USERPROFILE || process.env.HOME || '',
  '.gemini', 'antigravity', 'brain', 'eebc0773-6b10-4be2-b0ea-c691475ebf64'
);
if (fs.existsSync(geminiDir)) {
  // Chapter 2 food images
  for (let i = 1; i <= 5; i++) {
    const dest = path.join(publicDir, `editorial-food-${i}.png`);
    if (!fs.existsSync(dest)) {
      const files = fs.readdirSync(geminiDir).filter(f => f.startsWith(`editorial_food_${i}_`) && f.endsWith('.png'));
      if (files.length > 0) {
        fs.copyFileSync(path.join(geminiDir, files[0]), dest);
        console.log(`Copied ${files[0]} -> editorial-food-${i}.png`);
      }
    }
  }
  // Chapter 3 craft images
  const ch3Images = {
    'editorial_spices': 'editorial-spices.png',
    'editorial_process': 'editorial-process.png',
    'editorial_texture': 'editorial-texture.png',
  };
  for (const [prefix, destName] of Object.entries(ch3Images)) {
    const dest = path.join(publicDir, destName);
    if (!fs.existsSync(dest)) {
      const files = fs.readdirSync(geminiDir).filter(f => f.startsWith(prefix + '_') && f.endsWith('.png'));
      if (files.length > 0) {
        fs.copyFileSync(path.join(geminiDir, files[0]), dest);
        console.log(`Copied ${files[0]} -> ${destName}`);
      }
    }
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
