import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Language = 'pt' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (pt: string, es: string) => string;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'user-language-preference';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('pt');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const detectLanguage = async () => {
      // 1. Check for saved user preference
      const savedPreference = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (savedPreference && (savedPreference === 'pt' || savedPreference === 'es')) {
        setLanguageState(savedPreference);
        setIsLoading(false);
        return;
      }

      // 2. Detect by geolocation
      try {
        const { data, error } = await supabase.functions.invoke('detect-country');
        
        if (!error && data?.language) {
          setLanguageState(data.language);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log('Geolocation detection failed, using browser language');
      }

      // 3. Fallback: use browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('es')) {
        setLanguageState('es');
      }
      
      setIsLoading(false);
    };

    detectLanguage();
  }, []);

  const setLanguage = (lang: Language) => {
    // Save manual user preference
    localStorage.setItem(STORAGE_KEY, lang);
    setLanguageState(lang);
  };

  const t = (pt: string, es: string) => (language === 'pt' ? pt : es);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isLoading }}>
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
