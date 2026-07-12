const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\SELVA\\.gemini\\antigravity\\brain\\70d43a8c-6818-4066-a77d-2e5119673690\\maurya_family_dining_1783857587539.png';
const dest = 'c:\\projects\\MoryaMain\\public\\chapter02-image.png';

try {
  fs.copyFileSync(src, dest);
  console.log('Image copied successfully');
} catch (err) {
  console.error('Error copying image:', err);
}
