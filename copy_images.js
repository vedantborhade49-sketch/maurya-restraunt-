const fs = require('fs');
const path = require('path');

const src = 'C:/Users/SELVA/.gemini/antigravity/brain/eebc0773-6b10-4be2-b0ea-c691475ebf64/';
const dst = 'c:/projects/MoryaMain/public/';

const mapping = {
  'editorial_food_1_1783965232726.png': 'editorial-food-1.png',
  'editorial_food_2_1783965249384.png': 'editorial-food-2.png',
  'editorial_food_3_1783965262254.png': 'editorial-food-3.png',
  'editorial_food_4_1783965273034.png': 'editorial-food-4.png',
  'editorial_food_5_1783965286380.png': 'editorial-food-5.png',
};

for (const [srcFile, dstFile] of Object.entries(mapping)) {
  try {
    fs.copyFileSync(path.join(src, srcFile), path.join(dst, dstFile));
    console.log(`Copied ${srcFile} -> ${dstFile}`);
  } catch (e) {
    console.error(`Failed: ${srcFile}: ${e.message}`);
  }
}
