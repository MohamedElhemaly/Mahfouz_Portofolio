'use client';

import { useEffect } from 'react';
import { ThemeSettings, SEOSettings } from '@/lib/data/types';

interface ThemeProviderProps {
  theme: ThemeSettings;
  seo: SEOSettings;
  children: React.ReactNode;
}

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function lightenColor(hex: string, percent: number) {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * percent));
  const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * percent));
  const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * percent));
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ThemeProvider({ theme, seo, children }: ThemeProviderProps) {
  useEffect(() => {
    if (!theme) return;

    const root = document.documentElement;

    // Apply primary & secondary colors
    root.style.setProperty('--accent-primary', theme.primaryColor);
    root.style.setProperty('--accent-secondary', theme.secondaryColor);
    root.style.setProperty('--bg-deep', theme.backgroundColor);

    // Apply light primary color
    const primaryLight = lightenColor(theme.primaryColor, 0.2);
    root.style.setProperty('--accent-primary-light', primaryLight);

    // Apply gradient
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`);

    // Apply glow colors
    const rgbPrimary = hexToRgb(theme.primaryColor);
    if (rgbPrimary) {
      root.style.setProperty('--glow-color', `rgba(${rgbPrimary.r}, ${rgbPrimary.g}, ${rgbPrimary.b}, 0.4)`);
    }

    const rgbSecondary = hexToRgb(theme.secondaryColor);
    if (rgbSecondary) {
      root.style.setProperty('--glow-secondary', `rgba(${rgbSecondary.r}, ${rgbSecondary.g}, ${rgbSecondary.b}, 0.3)`);
    }

    // Apply fonts (if specified)
    if (theme.headingFont) {
      root.style.setProperty('--font-heading', theme.headingFont);
    }
    if (theme.bodyFont) {
      root.style.setProperty('--font-body', theme.bodyFont);
    }
  }, [theme]);

  useEffect(() => {
    if (!seo) return;

    // Apply SEO Title
    if (seo.title) {
      document.title = seo.title;
    }

    // Apply SEO Description
    if (seo.description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', seo.description);
    }

    // Apply SEO Keywords
    if (seo.keywords && seo.keywords.length > 0) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', seo.keywords.join(', '));
    }
  }, [seo]);

  return <>{children}</>;
}
