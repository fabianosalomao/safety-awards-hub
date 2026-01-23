import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'pt' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (pt: string, es: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'user-language-preference';
const DETECTION_TIMEOUT = 3000; // 3 seconds max for geolocation

// Get initial language synchronously (no blocking)
const getInitialLanguage = (): Language => {
  // Check localStorage first
  const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (saved === 'pt' || saved === 'es') return saved;
  
  // Quick browser language check
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('es') ? 'es' : 'pt';
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    // Skip detection if user already has a preference
    if (localStorage.getItem(STORAGE_KEY)) return;

    // Background detection with timeout - does NOT block rendering
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), DETECTION_TIMEOUT);

    const detectInBackground = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('detect-country', {
          body: {},
        });

        if (!error && data?.language && (data.language === 'pt' || data.language === 'es')) {
          // Only update if different and user hasn't manually selected
          if (!localStorage.getItem(STORAGE_KEY) && data.language !== language) {
            setLanguageState(data.language);
          }
        }
      } catch {
        // Silently fail - we already have a working default
      } finally {
        clearTimeout(timeoutId);
      }
    };

    detectInBackground();

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, []);

  const setLanguage = (lang: Language) => {
    localStorage.setItem(STORAGE_KEY, lang);
    setLanguageState(lang);
  };

  const t = (pt: string, es: string) => (language === 'pt' ? pt : es);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
