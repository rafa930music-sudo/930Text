// /src/i18n/index.ts
const translations = {
  es: { title: '930Text', description: 'Web sin límites' },
  en: { title: '930Text', description: 'Unlimited Web' }
};

export const t = (key: string, lang: string) => translations[lang as keyof typeof translations][key as keyof typeof translations['es']];
