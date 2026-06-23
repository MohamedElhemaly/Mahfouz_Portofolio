'use client';

import { useState, useEffect, useCallback } from 'react';
import { PortfolioData } from '../data/types';
import { getPortfolioData, savePortfolioData, updateSection, resetPortfolioData } from '../utils/storage';
import { defaultPortfolioData } from '../data/defaults';

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(defaultPortfolioData);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setData(getPortfolioData());
    setIsLoaded(true);

    const handleChange = (e: Event) => {
      const customEvent = e as CustomEvent<PortfolioData>;
      if (customEvent.detail) {
        setData(customEvent.detail);
      }
    };

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'portfolio_data' && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('portfolio-data-changed', handleChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('portfolio-data-changed', handleChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const update = useCallback(<K extends keyof PortfolioData>(
    section: K,
    sectionData: PortfolioData[K]
  ) => {
    updateSection(section, sectionData);
    setData(prev => ({ ...prev, [section]: sectionData }));
  }, []);

  const saveAll = useCallback((newData: PortfolioData) => {
    savePortfolioData(newData);
    setData(newData);
  }, []);

  const reset = useCallback(() => {
    resetPortfolioData();
    setData(defaultPortfolioData);
  }, []);

  return { data, isLoaded, update, saveAll, reset };
}
