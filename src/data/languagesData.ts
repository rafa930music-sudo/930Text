// ============================================================================
// 930TEXT — CATÁLOGO MUNDIAL DE IDIOMAS (100+ IDIOMAS Y DIALECTOS)
// E INSPIRACIÓN LÍRICA / RIMAS MULTILINGÜES
// ============================================================================

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  ttsLang: string;
  region: 'populares' | 'europa' | 'america_cooficiales' | 'asia_oceania' | 'oriente_africa' | 'clasicos';
}

export const WORLD_LANGUAGES: LanguageOption[] = [
  // Populares & Cooficiales de España / Grandes Idiomas Globales
  { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', ttsLang: 'es-ES', region: 'populares' },
  { code: 'en', name: 'Inglés', nativeName: 'English', flag: '🇬🇧', ttsLang: 'en-US', region: 'populares' },
  { code: 'fr', name: 'Francés', nativeName: 'Français', flag: '🇫🇷', ttsLang: 'fr-FR', region: 'populares' },
  { code: 'de', name: 'Alemán', nativeName: 'Deutsch', flag: '🇩🇪', ttsLang: 'de-DE', region: 'populares' },
  { code: 'pt', name: 'Portugués', nativeName: 'Português', flag: '🇵🇹', ttsLang: 'pt-PT', region: 'populares' },
  { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹', ttsLang: 'it-IT', region: 'populares' },
  { code: 'ca', name: 'Catalán / Valenciano', nativeName: 'Català', flag: '🟡🔴', ttsLang: 'ca-ES', region: 'populares' },
  { code: 'gl', name: 'Gallego', nativeName: 'Galego', flag: '⚪🔵', ttsLang: 'gl-ES', region: 'populares' },
  { code: 'eu', name: 'Euskera (Vasco)', nativeName: 'Euskara', flag: '🟢🔴', ttsLang: 'eu-ES', region: 'populares' },
  { code: 'zh-CN', name: 'Chino (Simplificado)', nativeName: '中文 (简体)', flag: '🇨🇳', ttsLang: 'zh-CN', region: 'populares' },
  { code: 'ja', name: 'Japonés', nativeName: '日本語', flag: '🇯🇵', ttsLang: 'ja-JP', region: 'populares' },
  { code: 'ko', name: 'Coreano', nativeName: '한국어', flag: '🇰🇷', ttsLang: 'ko-KR', region: 'populares' },
  { code: 'ar', name: 'Árabe', nativeName: 'العربية', flag: '🇸🇦', ttsLang: 'ar-SA', region: 'populares' },
  { code: 'ru', name: 'Ruso', nativeName: 'Русский', flag: '🇷🇺', ttsLang: 'ru-RU', region: 'populares' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', ttsLang: 'hi-IN', region: 'populares' },

  // Europa Completa
  { code: 'nl', name: 'Neerlandés (Holandés)', nativeName: 'Nederlands', flag: '🇳🇱', ttsLang: 'nl-NL', region: 'europa' },
  { code: 'pl', name: 'Polaco', nativeName: 'Polski', flag: '🇵🇱', ttsLang: 'pl-PL', region: 'europa' },
  { code: 'sv', name: 'Sueco', nativeName: 'Svenska', flag: '🇸🇪', ttsLang: 'sv-SE', region: 'europa' },
  { code: 'no', name: 'Noruego', nativeName: 'Norsk', flag: '🇳🇴', ttsLang: 'nb-NO', region: 'europa' },
  { code: 'da', name: 'Danés', nativeName: 'Dansk', flag: '🇩🇰', ttsLang: 'da-DK', region: 'europa' },
  { code: 'fi', name: 'Finés (Finlandés)', nativeName: 'Suomi', flag: '🇫🇮', ttsLang: 'fi-FI', region: 'europa' },
  { code: 'el', name: 'Griego', nativeName: 'Ελληνικά', flag: '🇬🇷', ttsLang: 'el-GR', region: 'europa' },
  { code: 'ro', name: 'Rumano', nativeName: 'Română', flag: '🇷🇴', ttsLang: 'ro-RO', region: 'europa' },
  { code: 'cs', name: 'Checo', nativeName: 'Čeština', flag: '🇨🇿', ttsLang: 'cs-CZ', region: 'europa' },
  { code: 'hu', name: 'Húngaro', nativeName: 'Magyar', flag: '🇭🇺', ttsLang: 'hu-HU', region: 'europa' },
  { code: 'uk', name: 'Ucraniano', nativeName: 'Українська', flag: '🇺🇦', ttsLang: 'uk-UA', region: 'europa' },
  { code: 'bg', name: 'Búlgaro', nativeName: 'Български', flag: '🇧🇬', ttsLang: 'bg-BG', region: 'europa' },
  { code: 'hr', name: 'Croata', nativeName: 'Hrvatski', flag: '🇭🇷', ttsLang: 'hr-HR', region: 'europa' },
  { code: 'sr', name: 'Serbio', nativeName: 'Српски', flag: '🇷🇸', ttsLang: 'sr-RS', region: 'europa' },
  { code: 'sk', name: 'Eslovaco', nativeName: 'Slovenčina', flag: '🇸🇰', ttsLang: 'sk-SK', region: 'europa' },
  { code: 'sl', name: 'Esloveno', nativeName: 'Slovenščina', flag: '🇸🇮', ttsLang: 'sl-SI', region: 'europa' },
  { code: 'et', name: 'Estonio', nativeName: 'Eesti', flag: '🇪🇪', ttsLang: 'et-EE', region: 'europa' },
  { code: 'lv', name: 'Letón', nativeName: 'Latviešu', flag: '🇱🇻', ttsLang: 'lv-LV', region: 'europa' },
  { code: 'lt', name: 'Lituano', nativeName: 'Lietuvių', flag: '🇱🇹', ttsLang: 'lt-LT', region: 'europa' },
  { code: 'is', name: 'Islandés', nativeName: 'Íslenska', flag: '🇮🇸', ttsLang: 'is-IS', region: 'europa' },
  { code: 'ga', name: 'Irlandés (Gaélico)', nativeName: 'Gaeilge', flag: '🇮🇪', ttsLang: 'ga-IE', region: 'europa' },
  { code: 'cy', name: 'Galés', nativeName: 'Cymraeg', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', ttsLang: 'cy-GB', region: 'europa' },
  { code: 'gd', name: 'Gaélico Escocés', nativeName: 'Gàidhlig', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', ttsLang: 'gd-GB', region: 'europa' },
  { code: 'mt', name: 'Maltés', nativeName: 'Malti', flag: '🇲🇹', ttsLang: 'mt-MT', region: 'europa' },
  { code: 'sq', name: 'Albanés', nativeName: 'Shqip', flag: '🇦🇱', ttsLang: 'sq-AL', region: 'europa' },
  { code: 'mk', name: 'Macedonio', nativeName: 'Македонски', flag: '🇲🇰', ttsLang: 'mk-MK', region: 'europa' },
  { code: 'bs', name: 'Bosnio', nativeName: 'Bosanski', flag: '🇧🇦', ttsLang: 'bs-BA', region: 'europa' },
  { code: 'be', name: 'Bielorruso', nativeName: 'Беларуская', flag: '🇧🇾', ttsLang: 'be-BY', region: 'europa' },
  { code: 'lb', name: 'Luxemburgués', nativeName: 'Lëtzebuergesch', flag: '🇱🇺', ttsLang: 'lb-LU', region: 'europa' },
  { code: 'co', name: 'Corso', nativeName: 'Corsu', flag: '🇫🇷', ttsLang: 'co-FR', region: 'europa' },
  { code: 'fy', name: 'Frisón', nativeName: 'Frysk', flag: '🇳🇱', ttsLang: 'fy-NL', region: 'europa' },

  // América, Lenguas Indígenas y Caribe
  { code: 'gn', name: 'Guaraní', nativeName: 'Avañeʼẽ', flag: '🇵🇾', ttsLang: 'es-PY', region: 'america_cooficiales' },
  { code: 'qu', name: 'Quechua', nativeName: 'Runasimi', flag: '🇵🇪', ttsLang: 'es-PE', region: 'america_cooficiales' },
  { code: 'ay', name: 'Aimara', nativeName: 'Aymar aru', flag: '🇧🇴', ttsLang: 'es-BO', region: 'america_cooficiales' },
  { code: 'ht', name: 'Criollo Haitiano', nativeName: 'Kreyòl ayisyen', flag: '🇭🇹', ttsLang: 'ht-HT', region: 'america_cooficiales' },
  { code: 'haw', name: 'Hawaiano', nativeName: 'ʻŌlelo Hawaiʻi', flag: '🇺🇸', ttsLang: 'en-US', region: 'america_cooficiales' },

  // Asia y Oceanía
  { code: 'zh-TW', name: 'Chino (Tradicional)', nativeName: '中文 (繁體)', flag: '🇹🇼', ttsLang: 'zh-TW', region: 'asia_oceania' },
  { code: 'id', name: 'Indonesio', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', ttsLang: 'id-ID', region: 'asia_oceania' },
  { code: 'ms', name: 'Malayo', nativeName: 'Bahasa Melayu', flag: '🇲🇾', ttsLang: 'ms-MY', region: 'asia_oceania' },
  { code: 'th', name: 'Tailandés', nativeName: 'ไทย', flag: '🇹🇭', ttsLang: 'th-TH', region: 'asia_oceania' },
  { code: 'vi', name: 'Vietnamita', nativeName: 'Tiếng Việt', flag: '🇻🇳', ttsLang: 'vi-VN', region: 'asia_oceania' },
  { code: 'tl', name: 'Tagalo (Filipino)', nativeName: 'Filipino', flag: '🇵🇭', ttsLang: 'fil-PH', region: 'asia_oceania' },
  { code: 'bn', name: 'Bengalí', nativeName: 'বাংলা', flag: '🇧🇩', ttsLang: 'bn-BD', region: 'asia_oceania' },
  { code: 'pa', name: 'Panyabí', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳', ttsLang: 'pa-IN', region: 'asia_oceania' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳', ttsLang: 'ta-IN', region: 'asia_oceania' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳', ttsLang: 'te-IN', region: 'asia_oceania' },
  { code: 'mr', name: 'Maratí', nativeName: 'मराठी', flag: '🇮🇳', ttsLang: 'mr-IN', region: 'asia_oceania' },
  { code: 'gu', name: 'Guyaratí', nativeName: 'ગુજરાતી', flag: '🇮🇳', ttsLang: 'gu-IN', region: 'asia_oceania' },
  { code: 'kn', name: 'Canarés', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳', ttsLang: 'kn-IN', region: 'asia_oceania' },
  { code: 'ml', name: 'Malabar (Malayalam)', nativeName: 'മലയാളം', flag: '🇮🇳', ttsLang: 'ml-IN', region: 'asia_oceania' },
  { code: 'si', name: 'Cingalés', nativeName: 'සිංහල', flag: '🇱🇰', ttsLang: 'si-LK', region: 'asia_oceania' },
  { code: 'ne', name: 'Nepalí', nativeName: 'नेपाली', flag: '🇳🇵', ttsLang: 'ne-NP', region: 'asia_oceania' },
  { code: 'my', name: 'Birmano', nativeName: 'မြန်မာ', flag: '🇲🇲', ttsLang: 'my-MM', region: 'asia_oceania' },
  { code: 'km', name: 'Jemer (Camboyano)', nativeName: 'ខ្មែរ', flag: '🇰🇭', ttsLang: 'km-KH', region: 'asia_oceania' },
  { code: 'lo', name: 'Lao', nativeName: 'ລາວ', flag: '🇱🇦', ttsLang: 'lo-LA', region: 'asia_oceania' },
  { code: 'mn', name: 'Mongol', nativeName: 'Монгол', flag: '🇲🇳', ttsLang: 'mn-MN', region: 'asia_oceania' },
  { code: 'JV', name: 'Javanés', nativeName: 'Basa Jawa', flag: '🇮🇩', ttsLang: 'jv-ID', region: 'asia_oceania' },
  { code: 'su', name: 'Sundanés', nativeName: 'Basa Sunda', flag: '🇮🇩', ttsLang: 'su-ID', region: 'asia_oceania' },
  { code: 'ceb', name: 'Cebuano', nativeName: 'Binisaya', flag: '🇵🇭', ttsLang: 'fil-PH', region: 'asia_oceania' },
  { code: 'mi', name: 'Maorí', nativeName: 'Te Reo Māori', flag: '🇳🇿', ttsLang: 'mi-NZ', region: 'asia_oceania' },
  { code: 'sm', name: 'Samoano', nativeName: 'Gagana Sāmoa', flag: '🇼🇸', ttsLang: 'en-NZ', region: 'asia_oceania' },

  // Oriente Medio, Cáucaso, Asia Central y África
  { code: 'tr', name: 'Turco', nativeName: 'Türkçe', flag: '🇹🇷', ttsLang: 'tr-TR', region: 'oriente_africa' },
  { code: 'he', name: 'Hebreo', nativeName: 'עברית', flag: '🇮🇱', ttsLang: 'he-IL', region: 'oriente_africa' },
  { code: 'fa', name: 'Persa (Farsi)', nativeName: 'فارسی', flag: '🇮🇷', ttsLang: 'fa-IR', region: 'oriente_africa' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', ttsLang: 'ur-PK', region: 'oriente_africa' },
  { code: 'ku', name: 'Kurdo', nativeName: 'Kurdî', flag: '🏳️', ttsLang: 'tr-TR', region: 'oriente_africa' },
  { code: 'hy', name: 'Armenio', nativeName: 'Հայերեն', flag: '🇦🇲', ttsLang: 'hy-AM', region: 'oriente_africa' },
  { code: 'ka', name: 'Georgiano', nativeName: 'ქართული', flag: '🇬🇪', ttsLang: 'ka-GE', region: 'oriente_africa' },
  { code: 'az', name: 'Azerbaiyano', nativeName: 'Azərbaycan', flag: '🇦🇿', ttsLang: 'az-AZ', region: 'oriente_africa' },
  { code: 'kk', name: 'Kazajo', nativeName: 'Қазақ тілі', flag: '🇰🇿', ttsLang: 'kk-KZ', region: 'oriente_africa' },
  { code: 'uz', name: 'Uzbeko', nativeName: 'Oʻzbek', flag: '🇺🇿', ttsLang: 'uz-UZ', region: 'oriente_africa' },
  { code: 'ky', name: 'Kirguís', nativeName: 'Кыргызча', flag: '🇰🇬', ttsLang: 'ru-RU', region: 'oriente_africa' },
  { code: 'tg', name: 'Tayiko', nativeName: 'Тоҷикӣ', flag: '🇹🇯', ttsLang: 'ru-RU', region: 'oriente_africa' },
  { code: 'tk', name: 'Turcomano', nativeName: 'Türkmençe', flag: '🇹🇲', ttsLang: 'tr-TR', region: 'oriente_africa' },
  { code: 'ps', name: 'Pastún', nativeName: 'پښتو', flag: '🇦🇫', ttsLang: 'fa-IR', region: 'oriente_africa' },
  { code: 'sw', name: 'Suajili', nativeName: 'Kiswahili', flag: '🇰🇪', ttsLang: 'sw-KE', region: 'oriente_africa' },
  { code: 'am', name: 'Amárico', nativeName: 'አማርኛ', flag: '🇪🇹', ttsLang: 'am-ET', region: 'oriente_africa' },
  { code: 'ha', name: 'Hausa', nativeName: 'Harshen Hausa', flag: '🇳🇬', ttsLang: 'en-NG', region: 'oriente_africa' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Èdè Yorùbá', flag: '🇳🇬', ttsLang: 'en-NG', region: 'oriente_africa' },
  { code: 'ig', name: 'Igbo', nativeName: 'Asụsụ Igbo', flag: '🇳🇬', ttsLang: 'en-NG', region: 'oriente_africa' },
  { code: 'zu', name: 'Zulú', nativeName: 'isiZulu', flag: '🇿🇦', ttsLang: 'zu-ZA', region: 'oriente_africa' },
  { code: 'xh', name: 'Xhosa', nativeName: 'isiXhosa', flag: '🇿🇦', ttsLang: 'xh-ZA', region: 'oriente_africa' },
  { code: 'af', name: 'Afrikáans', nativeName: 'Afrikaans', flag: '🇿🇦', ttsLang: 'af-ZA', region: 'oriente_africa' },
  { code: 'so', name: 'Somalí', nativeName: 'Soomaali', flag: '🇸🇴', ttsLang: 'so-SO', region: 'oriente_africa' },
  { code: 'mg', name: 'Malgache', nativeName: 'Malagasy', flag: '🇲🇬', ttsLang: 'fr-FR', region: 'oriente_africa' },
  { code: 'rw', name: 'Kinyarwanda', nativeName: 'Ikinyarwanda', flag: '🇷🇼', ttsLang: 'fr-FR', region: 'oriente_africa' },
  { code: 'sn', name: 'Shona', nativeName: 'chiShona', flag: '🇿🇼', ttsLang: 'en-ZA', region: 'oriente_africa' },

  // Clásicos, Filosóficos y Universales
  { code: 'la', name: 'Latín Clásico', nativeName: 'Lingua Latina', flag: '🏛️', ttsLang: 'it-IT', region: 'clasicos' },
  { code: 'eo', name: 'Esperanto', nativeName: 'Esperanto', flag: '🌍', ttsLang: 'es-ES', region: 'clasicos' },
  { code: 'sa', name: 'Sánscrito', nativeName: 'संस्कृतम्', flag: '🕉️', ttsLang: 'hi-IN', region: 'clasicos' },
  { code: 'yi', name: 'Yidis', nativeName: 'ייִדיש', flag: '📜', ttsLang: 'de-DE', region: 'clasicos' }
];

export const LANGUAGE_REGION_LABELS: Record<LanguageOption['region'], string> = {
  populares: '⭐ Más Usados & Cooficiales',
  europa: '🇪🇺 Europa (31 idiomas)',
  america_cooficiales: '🌎 América & Lenguas Originarias',
  asia_oceania: '🌏 Asia & Oceanía (25 idiomas)',
  oriente_africa: '🌍 Oriente Medio & África (25 idiomas)',
  clasicos: '🏛️ Clásicos & Universales'
};

export function getLanguageByCode(code: string): LanguageOption {
  const normalized = (code || 'es').trim();
  return (
    WORLD_LANGUAGES.find(l => l.code.toLowerCase() === normalized.toLowerCase()) ||
    WORLD_LANGUAGES[0]
  );
}

// ============================================================================
// BANCOS LÉXICOS MULTILINGÜES PARA RIMAS EN OTROS IDIOMAS (EN, FR, PT, IT, DE, CA)
// ============================================================================
export type RhymeLanguageCode = 'es' | 'en' | 'fr' | 'pt' | 'it' | 'de' | 'ca';

export interface RhymeLanguagePack {
  code: RhymeLanguageCode;
  name: string;
  flag: string;
  sampleWords: string[];
  words: string[];
}

export const MULTILINGUAL_RHYME_PACKS: Record<Exclude<RhymeLanguageCode, 'es'>, RhymeLanguagePack> = {
  en: {
    code: 'en',
    name: 'Inglés (English)',
    flag: '🇬🇧',
    sampleWords: ['fire', 'night', 'dream', 'heart', 'street', 'gold', 'forever', 'destiny', 'power', 'flow'],
    words: [
      // -ire / -igher
      'fire', 'desire', 'inspire', 'higher', 'wire', 'empire', 'admire', 'acquire', 'require', 'retire', 'conspire', 'entire', 'sapphire', 'choir', 'liar', 'prior', 'flier', 'crier', 'tire', 'hire', 'sire',
      // -ight
      'night', 'light', 'bright', 'flight', 'sight', 'fight', 'might', 'right', 'tight', 'height', 'white', 'write', 'ignite', 'unite', 'delight', 'tonight', 'midnight', 'starlight', 'sunlight', 'moonlight', 'knight', 'fright', 'slight', 'spite', 'bite', 'kite', 'invite', 'polite', 'infinite', 'satellite', 'dynamite',
      // -eam / -eem
      'dream', 'stream', 'gleam', 'beam', 'team', 'supreme', 'extreme', 'scheme', 'theme', 'cream', 'scream', 'steam', 'seem', 'esteem', 'redeem', 'daydream', 'mainstream',
      // -art
      'heart', 'start', 'part', 'art', 'smart', 'chart', 'apart', 'depart', 'restart', 'dart', 'cart', 'sweetheart', 'counterpart',
      // -eet / -eat
      'street', 'beat', 'heat', 'sweet', 'meet', 'feet', 'seat', 'complete', 'elite', 'concrete', 'defeat', 'repeat', 'retreat', 'treat', 'cheat', 'wheat', 'neat', 'fleet', 'greet', 'discreet', 'heartbeat', 'upbeat', 'bittersweet',
      // -old
      'gold', 'cold', 'bold', 'hold', 'told', 'sold', 'fold', 'old', 'unfold', 'behold', 'threshold', 'manifold', 'blindfold', 'household', 'marigold', 'controlled',
      // -ever
      'forever', 'never', 'clever', 'whatever', 'whenever', 'wherever', 'however', 'endeavor', 'together', 'weather', 'feather', 'leather', 'tether', 'treasure', 'pleasure', 'measure', 'pressure',
      // -y / -ee
      'destiny', 'melody', 'harmony', 'symphony', 'energy', 'memory', 'legacy', 'victory', 'history', 'mystery', 'fantasy', 'gravity', 'infinity', 'eternity', 'serenity', 'clarity', 'reality', 'royalty', 'loyalty', 'liberty', 'free', 'sea', 'key', 'tree', 'agree', 'degree', 'decree', 'guarantee',
      // -ower
      'power', 'hour', 'tower', 'flower', 'shower', 'devour', 'empower', 'superpower', 'sunflower', 'wildflower',
      // -ow
      'flow', 'glow', 'show', 'know', 'grow', 'slow', 'snow', 'low', 'row', 'throw', 'blow', 'shadow', 'window', 'tomorrow', 'follow', 'hollow', 'borrow', 'sorrow', 'arrow', 'narrow', 'rainbow', 'echo', 'hero', 'zero',
      // -ame
      'flame', 'name', 'game', 'fame', 'same', 'frame', 'claim', 'aim', 'shame', 'blame', 'tame', 'overcame', 'became', 'proclaim',
      // -ain
      'rain', 'pain', 'chain', 'train', 'brain', 'gain', 'main', 'plain', 'remain', 'explain', 'sustain', 'contain', 'domain', 'campaign', 'champagne', 'hurricane', 'mountain', 'fountain', 'captain', 'certain',
      // -ound
      'sound', 'ground', 'found', 'round', 'bound', 'crown', 'town', 'down', 'brown', 'drown', 'profound', 'surround', 'background', 'underground', 'rebound', 'astound',
      // -ine
      'shine', 'mine', 'line', 'fine', 'divine', 'design', 'align', 'sign', 'wine', 'pine', 'nine', 'define', 'combine', 'incline', 'intertwine', 'sunshine', 'skyline', 'timeline', 'diamond', 'horizon',
      // -ation
      'nation', 'creation', 'inspiration', 'generation', 'vibration', 'elevation', 'celebration', 'dedication', 'imagination', 'destination', 'revelation', 'transformation', 'foundation', 'sensation', 'station', 'relation', 'salvation', 'temptation', 'meditation', 'constellation'
    ]
  },
  fr: {
    code: 'fr',
    name: 'Francés (Français)',
    flag: '🇫🇷',
    sampleWords: ['amour', 'lumière', 'cœur', 'nuit', 'rêve', 'liberté', 'destin', 'étoile', 'musique', 'espoir'],
    words: [
      'amour', 'toujours', 'jour', 'retour', 'velours', 'secours', 'détour', 'autour', 'séjour', 'tambour', 'carrefour', 'discours', 'parcours',
      'lumière', 'prière', 'rivière', 'frontière', 'poussière', 'première', 'dernière', 'entière', 'manière', 'fière', 'mystère', 'univers', 'hiver', 'mer', 'fier', 'clair', 'air', 'éclair',
      'cœur', 'bonheur', 'douleur', 'chaleur', 'couleur', 'fleur', 'peur', 'heure', 'ailleurs', 'meilleur', 'rêveur', 'chanteur', 'auteur', 'voyageur', 'splendeur', 'grandeur', 'profondeur', 'ardeur', 'honneur', 'lueur',
      'nuit', 'bruit', 'pluie', 'infini', 'vie', 'envie', 'mélodie', 'poésie', 'harmonie', 'symphonie', 'folie', 'magie', 'énergie', 'nostalgie', 'galaxie', 'paradis', 'esprit', 'écrit', 'minuit',
      'rêve', 'trêve', 'sève', 'lève', 'élève', 'achève', 'grève', 'brève',
      'liberté', 'vérité', 'beauté', 'éternité', 'clarté', 'fierté', 'immensité', 'réalité', 'humanité', 'fraternité', 'destinée', 'pensée', 'fusée', 'odyssée', 'journée', 'soirée', 'année', 'étoilée',
      'destin', 'chemin', 'matin', 'jardin', 'lointain', 'demain', 'main', 'refrain', 'soudain', 'divin', 'serein', 'océan', 'vent', 'temps', 'printemps', 'chant', 'instant', 'diamant', 'firmament', 'sentiment', 'mouvement',
      'étoile', 'voile', 'toile', 'idéal', 'cristal', 'signal', 'festival', 'royal', 'loyal',
      'musique', 'magique', 'poétique', 'unique', 'cosmique', 'épique', 'lyrique', 'rythmique', 'magnifique', 'authentique', 'romantique', 'électrique',
      'espoir', 'soir', 'miroir', 'histoire', 'mémoire', 'victoire', 'gloire', 'trajectoire', 'trottoir', 'revoir', 'pouvoir', 'savoir', 'vouloir', 'devoir'
    ]
  },
  pt: {
    code: 'pt',
    name: 'Portugués (Português)',
    flag: '🇵🇹',
    sampleWords: ['coração', 'amor', 'liberdade', 'sonho', 'mar', 'luz', 'caminho', 'estrela', 'tempo', 'vida'],
    words: [
      'coração', 'canção', 'paixão', 'emoção', 'ilusão', 'razão', 'visão', 'missão', 'união', 'solidão', 'escuridão', 'imensidão', 'gratidão', 'inspiração', 'criação', 'revolução', 'direção', 'sensação', 'vibração', 'constelação', 'geração', 'evolução',
      'amor', 'dor', 'calor', 'cor', 'flor', 'valor', 'sabor', 'tambor', 'esplendor', 'sonhador', 'criador', 'vencedor', 'lutador', 'cantor', 'compositor', 'redor', 'melhor', 'suor', 'ardor', 'clamor',
      'liberdade', 'verdade', 'saudade', 'cidade', 'eternidade', 'felicidade', 'realidade', 'vontade', 'amizade', 'claridade', 'tempestade', 'intensidade', 'velocidade', 'humanidade', 'lealdade', 'humildade', 'dignidade', 'identidade', 'serenidade',
      'sonho', 'outono', 'dono', 'trono', 'abandono', 'horizonte', 'monte', 'fonte', 'ponte',
      'mar', 'luar', 'olhar', 'cantar', 'sonhar', 'voar', 'brilhar', 'amar', 'lugar', 'altar', 'caminhar', 'despertar', 'navegar', 'transformar', 'conquistar', 'celebrar', 'imaginar', 'respirar', 'alcançar', 'abraçar',
      'luz', 'cruz', 'produz', 'conduz', 'seduz', 'reluz', 'traduz', 'paz', 'capaz', 'audaz', 'fugaz', 'eficaz', 'voz', 'nós', 'veloz', 'feroz',
      'caminho', 'destino', 'menino', 'divino', 'cristalino', 'peregrino', 'violino', 'fino', 'hino', 'sino', 'carinho', 'sozinho', 'ninho', 'vinho', 'espinho',
      'estrela', 'bela', 'janela', 'aquarela', 'caravela', 'sentinela', 'primavera', 'espera', 'esfera', 'quimera', 'fronteira', 'poeira', 'bandeira', 'fogueria', 'maneira',
      'tempo', 'vento', 'momento', 'pensamento', 'sentimento', 'movimento', 'talento', 'alento', 'firmamento', 'juramento', 'universo', 'verso', 'imerso',
      'vida', 'ferida', 'saída', 'partida', 'avenida', 'despedida', 'escolhida', 'querida', 'unida', 'colorida', 'infinita', 'bonita', 'escrita', 'bendita', 'favorita'
    ]
  },
  it: {
    code: 'it',
    name: 'Italiano',
    flag: '🇮🇹',
    sampleWords: ['amore', 'cuore', 'notte', 'luce', 'sogno', 'libertà', 'mare', 'stella', 'vento', 'vita'],
    words: [
      'amore', 'cuore', 'dolore', 'calore', 'colore', 'fiore', 'valore', 'sapore', 'onore', 'rumore', 'splendore', 'sognatore', 'creatore', 'vincitore', 'cantautore', 'scrittore', 'attore', 'motore', 'sole', 'parole',
      'notte', 'forte', 'sorte', 'porte', 'corte', 'orizzonte', 'monte', 'fonte', 'ponte', 'fronte',
      'luce', 'voce', 'croce', 'veloce', 'feroce', 'pace', 'capace', 'audace', 'fugace', 'vivace', 'verace',
      'sogno', 'bisogno', 'segno', 'regno', 'ingegno', 'impegno', 'disegno', 'legno', 'cielo', 'velo', 'gelo', 'anelo', 'parallelo', 'mistero', 'impero', 'pensiero', 'sentiero', 'vero', 'sincero', 'guerriero', 'passeggero',
      'libertà', 'verità', 'città', 'eternità', 'felicità', 'realtà', 'volontà', 'beltà', 'umanità', 'serenità', 'immensità', 'velocità', 'intensità', 'lealtà', 'umiltà', 'dignità', 'identità',
      'mare', 'cantare', 'sognare', 'volare', 'amare', 'brillare', 'camminare', 'viaggiare', 'ascoltare', 'guardare', 'ricordare', 'immaginare', 'respirare', 'abbracciare', 'trionfare', 'altare', 'solare', 'stellare',
      'stella', 'bella', 'sorella', 'favella', 'procella', 'acquarella', 'primavera', 'sera', 'sfera', 'chimera', 'frontiera', 'bandiera', 'preghiera', 'maniera', 'straniera', 'sincera', 'intera',
      'vento', 'tempo', 'momento', 'sentimento', 'pensiero', 'movimento', 'talento', 'argento', 'firmamento', 'giuramento', 'elemento', 'strumento', 'frammento', 'incanto', 'canto', 'anto', 'diamante', 'istante', 'costante', 'brillante', 'elegante',
      'vita', 'ferita', 'uscita', 'partita', 'salita', 'infinita', 'fiorita', 'preferita', 'storia', 'memoria', 'vittoria', 'gloria', 'euforia', 'melodia', 'poesia', 'armonia', 'sinfonia', 'fantasia', 'energia', 'magia', 'nostalgia', 'via', 'mia', 'scia'
    ]
  },
  de: {
    code: 'de',
    name: 'Alemán (Deutsch)',
    flag: '🇩🇪',
    sampleWords: ['Nacht', 'Licht', 'Herz', 'Traum', 'Stern', 'Freiheit', 'Zeit', 'Leben', 'Feuer', 'Weg'],
    words: [
      'Nacht', 'Macht', 'Pracht', 'acht', 'wacht', 'lacht', 'gedacht', 'gemacht', 'gebracht', 'erwacht', 'entfacht', 'Mitternacht', 'Sternennacht', 'Vollmacht', 'Schlacht', 'Fracht', 'Smaragd', 'Takt',
      'Licht', 'Sicht', 'Gedicht', 'Gesicht', 'Gewicht', 'Pflicht', 'bricht', 'spricht', 'nicht', 'Schicht', 'Bericht', 'Gericht', 'Zuversicht', 'Sternenlicht', 'Sonnenlicht', 'Mondlicht', 'Gleichgewicht',
      'Herz', 'Schmerz', 'Scherz', 'März', 'Erz', 'wärts', 'himmelwärts', 'vorwärts', 'Stern', 'fern', 'Kern', 'gern', 'Herrn', 'lernen', 'Sternen',
      'Traum', 'Raum', 'Baum', 'Schaum', 'Saum', 'kaum', 'Zeitraum', 'Weltraum', 'Lebensraum', 'Freiraum',
      'Freiheit', 'Wahrheit', 'Klarheit', 'Schönheit', 'Ewigkeit', 'Dunkelheit', 'Einsamkeit', 'Wirklichkeit', 'Menschlichkeit', 'Zärtlichkeit', 'Unendlichkeit', 'Vergangenheit', 'Sicherheit', 'Weisheit', 'Einheit',
      'Zeit', 'weit', 'bereit', 'Ewigkeit', 'Unendlichkeit', 'Gelegenheit', 'Vergangenheit', 'Gegenwart', 'Zukunft', 'Kleid', 'Leid', 'Eid', 'Neid', 'Bescheid',
      'Leben', 'geben', 'schweben', 'streben', 'beben', 'erleben', 'vergeben', 'erheben', 'weben', 'neben', 'Regen', 'Segen', 'Wegen', 'entgegen', 'bewegen', 'pflegen',
      'Feuer', 'Abenteuer', 'teuer', 'Steuer', 'heuer', 'Ungeheuer', 'erneuern', 'Mauern', 'dauern', 'trauern', 'lauern',
      'Weg', 'Steg', 'Beleg', 'Welt', 'Zelt', 'Geld', 'Held', 'Feld', 'hält', 'fällt', 'Sternenzelt', 'Himmelszelt',
      'Klang', 'Gesang', 'Gang', 'lang', 'Drang', 'Anfang', 'Untergang', 'Übergang', 'Zusammenhang', 'Sonnenuntergang', 'Herzschlag', 'Tag', 'mag', 'Vertrag', 'Schlag'
    ]
  },
  ca: {
    code: 'ca',
    name: 'Catalán / Valenciano (Català)',
    flag: '🏴',
    sampleWords: ['cor', 'amor', 'llibertat', 'nit', 'llum', 'somni', 'camí', 'mar', 'temps', 'vida'],
    words: [
      'cor', 'amor', 'dolor', 'calor', 'color', 'flor', 'valor', 'tresor', 'tambor', 'esplendor', 'creador', 'lluitador', 'guanyador', 'cantautor', 'escriptor', 'millor', 'ardor', 'clamor', 'claror', 'foscor', 'dolçor', 'tardor', 'or',
      'llibertat', 'veritat', 'ciutat', 'eternitat', 'felicitat', 'realitat', 'voluntat', 'amistat', 'claritat', 'tempestat', 'intensitat', 'velocitat', 'humanitat', 'lleialtat', 'humilitat', 'dignitat', 'identitat', 'serenitat', 'immensitat', 'soledat',
      'nit', 'crit', 'infinit', 'esperit', 'escrit', 'sentit', 'oblit', 'batec', 'destí', 'camí', 'matí', 'jardí', 'veí', 'diví', 'cristal·lí', 'pelegrí', 'fi', 'vi', 'pi', 'endins',
      'llum', 'fum', 'perfum', 'costum', 'cim', 'rima', 'estima', 'clima', 'abisme', 'ritme', 'magnetisme', 'optimisme', 'lirisme',
      'somni', 'insomni', 'món', 'profund', 'segon', 'horitzó', 'cançó', 'passió', 'emoció', 'il·lusió', 'raó', 'visió', 'missió', 'unió', 'creació', 'revolució', 'sensació', 'vibració', 'inspiració', 'generació',
      'mar', 'lloc', 'foc', 'joc', 'poc', 'cantar', 'somiar', 'volar', 'estimar', 'brillar', 'caminar', 'despertar', 'navegar', 'transformar', 'conquerir', 'celebrar', 'imaginar', 'respirar', 'abraçar', 'lluitar', 'clar', 'altar', 'solar', 'estel·lar',
      'temps', 'vent', 'moment', 'pensament', 'sentiment', 'moviment', 'talent', 'alent', 'firmament', 'jurament', 'element', 'instrument', 'fragment', 'univers', 'vers', 'immers',
      'vida', 'ferida', 'sortida', 'partida', 'avinguda', 'despedida', 'escollida', 'estimada', 'alba', 'matinada', 'mirada', 'abraçada', 'onada', 'flama', 'història', 'memòria', 'victòria', 'glòria', 'melodia', 'poesia', 'harmonia', 'simfonia', 'fantasia', 'energia', 'màgia', 'alegria'
    ]
  }
};
