const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const ASSET_DIR = path.join(__dirname, 'src', 'assets', 'images');

// Ensure the directory exists
if (!fs.existsSync(ASSET_DIR)) {
  fs.mkdirSync(ASSET_DIR, { recursive: true });
}

// Image descriptions
const imageDescriptions = {
  'hero.jpg': 'ASITA H Lite\nSmart Home Gym\nFront View',
  'angle.jpg': 'ASITA H\nSide Angle View\nCompact Design',
  'workout.jpg': 'ASITA Smart Gym\nWorkout Example\nStrength Training',
  'gallery1.jpg': 'ASITA Touchscreen\nInterface\nStats & Workouts'
};

// Colors
const colors = {
  background: '#121212',
  accent: '#1EAEDB',
  text: '#FFFFFF'
};

// Generate machine rotation frames
for (let i = 1; i <= 16; i++) {
  const num = String(i).padStart(2, '0');
  const fileName = `machine_${num}.jpg`;
  imageDescriptions[fileName] = `ASITA 360° View\nFrame ${i}/16\nRotation: ${Math.floor((i-1) * (360/16))}°`;
}

// Create a better placeholder image
function createPlaceholderImage(filename, description, width = 600, height = 400) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = colors.background;
  ctx.fillRect(0, 0, width, height);
  
  // Draw a gradient in the background
  const gradient = ctx.createRadialGradient(width/2, height/2, 10, width/2, height/2, width/2);
  gradient.addColorStop(0, `${colors.accent}30`);
  gradient.addColorStop(1, `${colors.background}FF`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add ASITA logo/text
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = colors.accent;
  ctx.textAlign = 'center';
  ctx.fillText('ASITA', width/2, height/2 - 40);
  
  // Add description text
  ctx.font = '24px Arial';
  ctx.fillStyle = colors.text;
  ctx.textAlign = 'center';
  
  const lines = description.split('\n');
  lines.forEach((line, index) => {
    ctx.fillText(line, width/2, height/2 + (index * 35));
  });
  
  // Add a decorative border
  ctx.strokeStyle = colors.accent;
  ctx.lineWidth = 10;
  ctx.strokeRect(5, 5, width - 10, height - 10);
  
  // Save the image
  const buffer = canvas.toBuffer('image/jpeg');
  const filePath = path.join(ASSET_DIR, filename);
  
  fs.writeFileSync(filePath, buffer);
  console.log(`Created ${filename}`);
}

// Create all images
Object.entries(imageDescriptions).forEach(([filename, description]) => {
  createPlaceholderImage(filename, description);
});

console.log('All images created successfully!'); 