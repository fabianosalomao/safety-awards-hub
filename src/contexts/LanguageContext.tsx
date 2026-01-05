import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'pt' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (pt: string, es: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    // Auto-detect language based on browser settings
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) {
      setLanguage('es');
    } else {
      setLanguage('pt');
    }
  }, []);

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
