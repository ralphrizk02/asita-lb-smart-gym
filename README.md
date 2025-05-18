# ASITA Smart Gym - Landing Page

A modern, responsive landing page for the ASITA Smart Home Gym system built with React, Vite, TypeScript, and Tailwind CSS.

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Components Documentation](#components-documentation)
- [Styling Guide](#styling-guide)
- [Content Customization](#content-customization)

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation Steps
1. Unzip the project folder
2. Open a terminal in the project directory
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to the URL shown in the terminal (usually http://localhost:8080)

### Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── assets/         # Images and other static assets
├── components/     # React components
│   ├── ui/        # Reusable UI components
│   └── lab/       # ASITA Lab specific components
├── pages/         # Page components
└── styles/        # Global styles and Tailwind config
```

## Components Documentation

### 1. Hero Section (`src/components/Hero.tsx`)
- Full-screen hero section with parallax background
- Customizable headline and subheadline
- Call-to-action buttons
- Scroll indicator animation

To modify content:
- Update the hero image: Change the import path in line 7
- Modify text: Update the h1 and p tags in the JSX
- Change buttons: Modify the button text and links in the flex container

### 2. Product Reveal (`src/components/ProductReveal.tsx`)
- Split-screen layout with image and features
- Animated reveal effects
- Feature list with icons

To customize:
- Change image: Update the workoutImage import
- Modify features: Edit the array of features in the map function
- Adjust styling: Modify the Tailwind classes in the component

### 3. Video Demo (`src/components/VideoDemo.tsx`)
- Video showcase section
- Custom video player controls
- Thumbnail preview with play button

Configuration:
- Update video: Change the video source in the video element
- Modify thumbnail: Update the workoutImage import
- Customize text: Edit the h2 and p tags

### 4. ASITA Lab (`src/pages/AsitaLab.tsx`)
- Interactive product showcase
- Parallax scrolling effects
- 3D transformations
- Color scheme based on ASITA brand colors

Customization:
- Colors: Update asitaColors object
- Content: Modify sections array
- Animations: Adjust animation parameters in the useEffect hooks

### 5. Sticky Product Panel (`src/components/StickyProductPanel.tsx`)
- Sticky scroll product showcase
- Dynamic content panels
- Smooth transitions

Content updates:
- Modify panels array with new titles, descriptions, and images
- Adjust colors in the color property of each panel
- Fine-tune animations in the useEffect hooks

### 6. Features Section (`src/components/Features.tsx`)
- Grid layout of product features
- Icon illustrations
- Reveal animations

To modify:
- Update features array with new icons, titles, and descriptions
- Adjust grid layout using Tailwind classes
- Modify animation timing in IntersectionObserver components

## Styling Guide

### Color Scheme

The website uses a modern, high-contrast color scheme:

- Primary Orange: #FF6B00 (ASITA Brand Color)
- Dark Background: #121212
- Darker Background: #0a0a0a
- Text Color: #f8f9fa
- Muted Text: #adb5bd

Colors can be modified in:
- `tailwind.config.js`: Theme colors
- `src/index.css`: Global color variables
- Individual component styles

### Animations
- Powered by Framer Motion
- Custom reveal animations using IntersectionObserver
- Smooth scrolling effects
- Parallax backgrounds

### Responsive Design
- Mobile-first approach
- Breakpoints:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px

## Content Customization

### Images
All images are stored in `src/assets/images/`. To update:
1. Add new images to this directory
2. Update import statements in components
3. Ensure proper image optimization for web

### Text Content
Text content can be modified directly in the components:
- Update headlines, descriptions, and feature lists
- Modify button text and links
- Change section titles and subtitles

### Video Content
The video demo section uses a WebM video file:
1. Replace the video file in the assets directory
2. Update the import path in VideoDemo.tsx
3. Adjust video player settings if needed

### Navigation
Update the navigation links in:
- `src/components/Navigation.tsx`: Main navigation
- Individual link components throughout the site

## Development Notes

### Performance Optimization
- Images are lazy-loaded where appropriate
- Components use React.memo for optimization
- Animations are hardware-accelerated
- Code splitting implemented for larger sections

### Browser Support
- Modern browsers (last 2 versions)
- Fallbacks provided for older browsers
- Progressive enhancement approach

### Security
- No sensitive data stored in frontend code
- API keys should be managed through environment variables
- Form submissions should be validated server-side

## Deployment

### Build Process
1. Run `npm run build`
2. Output will be in the `dist` directory
3. Deploy the contents of `dist` to your hosting provider

### Hosting Recommendations
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

## Support and Updates

For support or questions about customization:
1. Check the documentation first
2. Look for similar issues in components
3. Contact the development team

Remember to keep dependencies updated for security and performance improvements.
