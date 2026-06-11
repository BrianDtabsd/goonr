import React, { createContext, useContext, useState, useEffect } from 'react';

const typographyBundles = {
  modern: {
    name: 'Modern Clean',
    headingFont: '"Inter", sans-serif',
    bodyFont: '"Inter", sans-serif',
    headingColor: '#ffffff',
    subtitleColor: '#94a3b8', // slate-400
    bodyColor: '#cbd5e1', // slate-300
  },
  elegant: {
    name: 'Elegant Serif',
    headingFont: '"Playfair Display", serif',
    bodyFont: '"Roboto", sans-serif',
    headingColor: '#f8fafc',
    subtitleColor: '#cbd5e1',
    bodyColor: '#e2e8f0',
  },
  tech: {
    name: 'Technical',
    headingFont: '"Space Grotesk", sans-serif',
    bodyFont: '"Inter", sans-serif',
    headingColor: '#60a5fa', // blue-400
    subtitleColor: '#94a3b8',
    bodyColor: '#f1f5f9',
  }
};

export const defaultTheme = {
  // Background
  backgroundUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop',
  backgroundPattern: 'mesh', // 'none', 'mesh'
  // Layout mode: 'cards' or 'container'
  // 'cards': cards are visible, container is transparent.
  // 'container': container is visible, cards are 100% transparent.
  layoutMode: 'cards', 
  
  // Typography
  typographyPreset: 'modern',
  bodyTextSize: '16px',
  
  // Glassmorphism settings
  frostLevel: '24px', // blur amount
  transparencyLevel: 0.1, // opacity of the background color
  primaryColor: '#3b82f6', // blue-500
  frostColor: '255, 255, 255', // RGB string for rgba()
  
  // Sizing
  cardPadding: '2rem',
  cardRadius: '2.5rem',
  
  // Nav Bar
  navOutline: 'none', // 'none', 'thin', 'thick'
  navOutlineColor: 'rgba(255,255,255,0.15)',
  
  // Buttons
  buttonShape: 'pill', // 'pill', 'rounded', 'sharp'
  buttonStyle: 'filled', // 'filled', 'outline', 'empty'
  buttonGlow: true,
  buttonJump: true,
};

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  // Update CSS variables when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    root.style.setProperty('--bg-url', `url('${theme.backgroundUrl}')`);
    
    // Apply Typography Bundle
    const typo = typographyBundles[theme.typographyPreset];
    root.style.setProperty('--font-heading', typo.headingFont);
    root.style.setProperty('--font-body', typo.bodyFont);
    root.style.setProperty('--color-heading', typo.headingColor);
    root.style.setProperty('--color-subtitle', typo.subtitleColor);
    root.style.setProperty('--color-body', typo.bodyColor);
    root.style.setProperty('--text-body-size', theme.bodyTextSize);
    
    root.style.setProperty('--frost-level', theme.frostLevel);
    root.style.setProperty('--transparency-level', theme.transparencyLevel);
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--frost-rgb', theme.frostColor);
    
    root.style.setProperty('--card-padding', theme.cardPadding);
    root.style.setProperty('--card-radius', theme.cardRadius);
    
    // Layout logic: if mode is 'container', cards are transparent. If 'cards', container is transparent.
    const isCards = theme.layoutMode === 'cards';
    root.style.setProperty('--card-opacity', isCards ? theme.transparencyLevel : 0);
    root.style.setProperty('--card-border-opacity', isCards ? 0.15 : 0);
    root.style.setProperty('--card-frost', isCards ? theme.frostLevel : '0px');
    
    root.style.setProperty('--container-opacity', !isCards ? theme.transparencyLevel : 0);
    root.style.setProperty('--container-frost', !isCards ? theme.frostLevel : '0px');
    root.style.setProperty('--container-border-opacity', !isCards ? 0.15 : 0);
    
    // Nav
    const navBorderWidth = theme.navOutline === 'none' ? '0px' : theme.navOutline === 'thin' ? '1px' : '2px';
    root.style.setProperty('--nav-border-width', navBorderWidth);
    root.style.setProperty('--nav-border-color', theme.navOutlineColor);
    
  }, [theme]);

  const updateTheme = (updates) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, typographyBundles }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
