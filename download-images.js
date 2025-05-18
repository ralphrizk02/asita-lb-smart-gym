const fs = require('fs');
const https = require('https');
const path = require('path');

const PLACEHOLDER_URL = 'https://placehold.co/600x400/1EAEDB/FFFFFF/png?text=';
const ASSET_DIR = path.join(__dirname, 'src', 'assets', 'images');

// Ensure the directory exists
if (!fs.existsSync(ASSET_DIR)) {
  fs.mkdirSync(ASSET_DIR, { recursive: true });
}

// Main product images
const mainImages = [
  'hero.jpg',
  'angle.jpg',
  'workout.jpg',
  'gallery1.jpg'
];

// 360 rotation images
const rotationImages = Array.from({ length: 16 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `machine_${num}.jpg`;
});

// All images to download
const allImages = [...mainImages, ...rotationImages];

// Download function
function downloadImage(imageName) {
  const text = imageName.replace('.jpg', '');
  const url = `${PLACEHOLDER_URL}${text}`;
  const filePath = path.join(ASSET_DIR, imageName);
  
  console.log(`Downloading ${imageName}...`);
  
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${imageName}: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filePath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${imageName}`);
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filePath, () => {}); // Delete the file if there was an error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Download all images sequentially
async function downloadAllImages() {
  for (const image of allImages) {
    try {
      await downloadImage(image);
    } catch (error) {
      console.error(`Error downloading ${image}:`, error.message);
    }
  }
  console.log('All images downloaded!');
}

downloadAllImages(); 