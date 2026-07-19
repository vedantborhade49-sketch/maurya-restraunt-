const fs = require('fs');
const path = require('path');

const dirsToDelete = [
  'sections/Chapter06',
  'sections/Chapter07',
  'sections/Chapter08',
  'sections/Cinematic',
  'sections/Hero',
  'sections/HeroTable',
  'sections/Journey',
  'sections/Page02AtOurTable',
  'sections/Page03AroundTheTable'
];

const filesToDelete = [
  'public/hero-video.mp4',
  'public/editorial-process.png',
  'public/restaurant-interior.png'
];

console.log("Starting cleanup...");

dirsToDelete.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    fs.rmSync(fullPath, { recursive: true, force: true });
    console.log(`Deleted directory: ${dir}`);
  }
});

filesToDelete.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Deleted file: ${file}`);
  }
});

console.log("Cleanup complete!");
