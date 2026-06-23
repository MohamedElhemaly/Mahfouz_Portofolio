import { PortfolioData } from '../data/types';
import { defaultPortfolioData } from '../data/defaults';

const STORAGE_KEY = 'portfolio_data';
const AUTH_KEY = 'portfolio_auth';

// ============================================
// Data Storage
// ============================================

export function getPortfolioData(): PortfolioData {
  if (typeof window === 'undefined') return defaultPortfolioData;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new fields
      return { ...defaultPortfolioData, ...parsed };
    }
  } catch {
    console.warn('Failed to read portfolio data from localStorage');
  }
  
  // Initialize with defaults
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPortfolioData));
  return defaultPortfolioData;
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Dispatch storage event for cross-tab sync and same-tab listeners
    window.dispatchEvent(new CustomEvent('portfolio-data-changed', { detail: data }));
  } catch {
    console.error('Failed to save portfolio data to localStorage');
  }
}

export function updateSection<K extends keyof PortfolioData>(
  section: K,
  data: PortfolioData[K]
): void {
  const current = getPortfolioData();
  current[section] = data;
  savePortfolioData(current);
}

export function resetPortfolioData(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPortfolioData));
  window.dispatchEvent(
    new CustomEvent('portfolio-data-changed', { detail: defaultPortfolioData })
  );
}

export function exportPortfolioData(): string {
  const data = getPortfolioData();
  return JSON.stringify(data, null, 2);
}

export function importPortfolioData(json: string): boolean {
  try {
    const data = JSON.parse(json) as PortfolioData;
    savePortfolioData(data);
    return true;
  } catch {
    return false;
  }
}

// ============================================
// Image Storage (base64)
// ============================================

export function saveImage(key: string, base64: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`img_${key}`, base64);
  } catch {
    console.error('Failed to save image — storage may be full');
  }
}

export function getImage(key: string): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(`img_${key}`);
}

// ============================================
// Authentication
// ============================================

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface AuthSession {
  token: string;
  expiresAt: number;
}

function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function login(username: string, password: string): boolean {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const session: AuthSession = {
      token: generateToken(),
      expiresAt: Date.now() + SESSION_DURATION,
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  return false;
}

export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const stored = localStorage.getItem(AUTH_KEY);
    if (!stored) return false;
    
    const session: AuthSession = JSON.parse(stored);
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(AUTH_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function logout(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(AUTH_KEY);
}

// ============================================
// ID Generation
// ============================================

export function generateId(prefix: string = 'item'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
}
