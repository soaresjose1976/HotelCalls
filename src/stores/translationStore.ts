import create from 'zustand';
import { translations, TranslationKey } from '../lib/translations';

interface TranslationStore {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: TranslationKey) => string;
}

export const useTranslationStore = create<TranslationStore>((set, get) => ({
  currentLanguage: 'fr',
  
  setLanguage: (lang: string) => {
    if (translations[lang]) {
      set({ currentLanguage: lang });
    }
  },
  
  t: (key: TranslationKey): string => {
    const { currentLanguage } = get();
    return translations[currentLanguage]?.[key] || key;
  }
}));
