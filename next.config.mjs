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

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
