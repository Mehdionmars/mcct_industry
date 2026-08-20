import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ui } from './ui';

const STORAGE_KEY = 'mcct-lang';
export const LANGUAGES = ['fr', 'en'];
const DEFAULT_LANG = 'fr';

const LanguageContext = createContext(null);

const readInitialLang = () => {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  const stored = window.localStorage?.getItem(STORAGE_KEY);
  if (LANGUAGES?.includes(stored)) return stored;
  // Le site s'adresse d'abord à un public francophone : l'anglais n'est proposé
  // d'office qu'aux navigateurs explicitement anglophones.
  return navigator?.language?.toLowerCase()?.startsWith('en') ? 'en' : DEFAULT_LANG;
};

/** Renvoie la variante linguistique d'une valeur `{ fr, en }`, ou la valeur telle quelle. */
export const localize = (value, lang) => {
  if (value && typeof value === 'object' && !Array.isArray(value) && ('fr' in value || 'en' in value)) {
    return value?.[lang] ?? value?.fr ?? value?.en;
  }
  return value;
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(readInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!LANGUAGES?.includes(next)) return;
    window.localStorage?.setItem(STORAGE_KEY, next);
    setLangState(next);
  }, []);

  const value = useMemo(() => {
    /** Chaîne d'interface : t('nav.about'). */
    const t = (path) => {
      const parts = path?.split('.');
      let node = ui?.[lang];
      parts?.forEach((part) => {
        node = node?.[part];
      });
      return node ?? path;
    };
    return { lang, setLang, t, tx: (value) => localize(value, lang) };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useI18n doit être utilisé dans un LanguageProvider');
  return context;
};

export default LanguageProvider;
