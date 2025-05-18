import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add browser detection for performance optimization
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// Add a class to the HTML element for mobile-specific CSS rules
if (isMobile) {
  document.documentElement.classList.add('is-mobile');
}

// Performance optimizations
if (process.env.NODE_ENV === 'production') {
  // Disable React DevTools for production
  const windowWithDevTools = window as any;
  if (typeof windowWithDevTools.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    for (let [key, value] of Object.entries(windowWithDevTools.__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
      windowWithDevTools.__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value === 'function' ? () => {} : null;
    }
  }
}

createRoot(document.getElementById("root")!).render(<App />);
