export interface Language {
  code: string;
  name: string;
  nativeName: string;
  isEuropean: boolean;
  direction: 'ltr' | 'rtl';
  dateFormat: string;
  timeFormat: string;
  currencyCode: string;
  currencySymbol: string;
}

export const languages: Record<string, Language> = {
  'de': {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'fr': {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'it': {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'es': {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'pt': {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'nl': {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'pl': {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'PLN',
    currencySymbol: 'zł'
  },
  'cs': {
    code: 'cs',
    name: 'Czech',
    nativeName: 'Čeština',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'CZK',
    currencySymbol: 'Kč'
  },
  'sk': {
    code: 'sk',
    name: 'Slovak',
    nativeName: 'Slovenčina',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'hu': {
    code: 'hu',
    name: 'Hungarian',
    nativeName: 'Magyar',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'YYYY.MM.DD',
    timeFormat: 'HH:mm',
    currencyCode: 'HUF',
    currencySymbol: 'Ft'
  },
  'ro': {
    code: 'ro',
    name: 'Romanian',
    nativeName: 'Română',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'RON',
    currencySymbol: 'lei'
  },
  'bg': {
    code: 'bg',
    name: 'Bulgarian',
    nativeName: 'Български',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'BGN',
    currencySymbol: 'лв'
  },
  'hr': {
    code: 'hr',
    name: 'Croatian',
    nativeName: 'Hrvatski',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'sl': {
    code: 'sl',
    name: 'Slovenian',
    nativeName: 'Slovenščina',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'et': {
    code: 'et',
    name: 'Estonian',
    nativeName: 'Eesti',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'lv': {
    code: 'lv',
    name: 'Latvian',
    nativeName: 'Latviešu',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'lt': {
    code: 'lt',
    name: 'Lithuanian',
    nativeName: 'Lietuvių',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'da': {
    code: 'da',
    name: 'Danish',
    nativeName: 'Dansk',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'DKK',
    currencySymbol: 'kr'
  },
  'fi': {
    code: 'fi',
    name: 'Finnish',
    nativeName: 'Suomi',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'sv': {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    currencyCode: 'SEK',
    currencySymbol: 'kr'
  },
  'no': {
    code: 'no',
    name: 'Norwegian',
    nativeName: 'Norsk',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'NOK',
    currencySymbol: 'kr'
  },
  'el': {
    code: 'el',
    name: 'Greek',
    nativeName: 'Ελληνικά',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'mt': {
    code: 'mt',
    name: 'Maltese',
    nativeName: 'Malti',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'ga': {
    code: 'ga',
    name: 'Irish',
    nativeName: 'Gaeilge',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  },
  'lb': {
    code: 'lb',
    name: 'Luxembourgish',
    nativeName: 'Lëtzebuergesch',
    isEuropean: true,
    direction: 'ltr',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: 'HH:mm',
    currencyCode: 'EUR',
    currencySymbol: '€'
  }
};

export const getEuropeanLanguages = () => {
  return Object.values(languages).filter(lang => lang.isEuropean);
};

export const formatDate = (date: Date, languageCode: string): string => {
  const lang = languages[languageCode];
  return new Intl.DateTimeFormat(languageCode, {
    dateStyle: 'short'
  }).format(date);
};

export const formatCurrency = (amount: number, languageCode: string): string => {
  const lang = languages[languageCode];
  return new Intl.NumberFormat(languageCode, {
    style: 'currency',
    currency: lang.currencyCode
  }).format(amount);
};

export const formatTime = (date: Date, languageCode: string): string => {
  const lang = languages[languageCode];
  return new Intl.DateTimeFormat(languageCode, {
    timeStyle: 'short'
  }).format(date);
};
