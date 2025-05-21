import React from 'react';
import { useTranslationStore } from '../stores/translationStore';

const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' },
  { code: 'lb', name: 'Lëtzebuergesch' }
];

export const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage } = useTranslationStore();

  return (
    <select
      value={currentLanguage}
      onChange={(e) => setLanguage(e.target.value)}
      className="px-3 py-2 border rounded-md"
    >
      {languages.map(({ code, name }) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
};
