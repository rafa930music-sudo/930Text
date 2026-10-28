import { WORLD_LANGUAGES, getLanguageByCode } from '../data/languagesData';

export { WORLD_LANGUAGES, getLanguageByCode };

// Common phrase & vocabulary bank for instant offline fallback
const DICT_BANK: Record<string, Record<string, string>> = {
  'es-en': {
    'hola': 'hello',
    'hola mundo': 'hello world',
    'buenos días': 'good morning',
    'buenas tardes': 'good afternoon',
    'buenas noches': 'good night',
    'gracias': 'thank you',
    'muchas gracias': 'thank you very much',
    'por favor': 'please',
    'de nada': "you're welcome",
    'sí': 'yes',
    'no': 'no',
    'adiós': 'goodbye',
    'hasta luego': 'see you later',
    'amigo': 'friend',
    'amiga': 'friend',
    'música': 'music',
    'canción': 'song',
    'texto': 'text',
    'escribir': 'write',
    'leer': 'read',
    'aprender': 'learn',
    'trabajo': 'work',
    'proyecto': 'project',
    'equipo': 'team',
    'tiempo': 'time',
    'día': 'day',
    'noche': 'night',
    'vida': 'life',
    'amor': 'love',
    'verdad': 'truth',
    'mundo': 'world'
  },
  'en-es': {
    'hello': 'hola',
    'hello world': 'hola mundo',
    'good morning': 'buenos días',
    'good afternoon': 'buenas tardes',
    'good night': 'buenas noches',
    'thank you': 'gracias',
    'thank you very much': 'muchas gracias',
    'please': 'por favor',
    'yes': 'sí',
    'no': 'no',
    'goodbye': 'adiós',
    'friend': 'amigo',
    'music': 'música',
    'song': 'canción',
    'text': 'texto',
    'write': 'escribir',
    'read': 'leer',
    'team': 'equipo',
    'work': 'trabajo',
    'life': 'vida',
    'love': 'amor',
    'world': 'mundo'
  }
};

export async function performTranslation(
  text: string,
  from: string,
  to: string
): Promise<string> {
  const clean = text.trim();
  if (!clean) {
    throw new Error('Escribe algo para traducir.');
  }
  if (from === to) {
    throw new Error('Elige idiomas distintos.');
  }

  // 1. Try local backend proxy
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: clean, from, to })
    });
    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data?.translation) {
        return data.translation;
      }
    }
  } catch {
    // Fallthrough to client fallback
  }

  // 2. Client fallback via free Google Translate GTX
  const paragraphs = clean.split(/\n+/);
  const chunks: string[] = [];
  let current = '';
  for (const p of paragraphs) {
    if ((current + '\n' + p).length > 900 && current) {
      chunks.push(current);
      current = p;
    } else {
      current = current ? `${current}\n${p}` : p;
    }
  }
  if (current) chunks.push(current);

  try {
    const translatedParts = await Promise.all(
      chunks.map(async chunk => {
        const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(
          from
        )}&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(chunk)}`;
        const gtxRes = await fetch(gtxUrl);
        if (gtxRes.ok) {
          const gtxData = await gtxRes.json();
          if (Array.isArray(gtxData) && Array.isArray(gtxData[0])) {
            return gtxData[0]
              .map((part: unknown[]) => (Array.isArray(part) ? part[0] : ''))
              .join('');
          }
        }
        return '';
      })
    );
    const validParts = translatedParts.filter(Boolean);
    if (validParts.length > 0) {
      return validParts.join('\n\n');
    }
  } catch {
    // Fallthrough to MyMemory
  }

  // 3. Fallback via MyMemory
  try {
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      clean.slice(0, 500)
    )}&langpair=${encodeURIComponent(from)}|${encodeURIComponent(to)}`;
    const mmRes = await fetch(mmUrl);
    if (mmRes.ok) {
      const mmData = await mmRes.json();
      if (mmData?.responseData?.translatedText && !mmData.responseData.translatedText.includes('MYMEMORY WARNING')) {
        return mmData.responseData.translatedText;
      }
    }
  } catch {
    // Fallthrough to local dictionary
  }

  // 4. Resilient dictionary and token glossing fallback
  const pairKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
  const dict = DICT_BANK[pairKey];
  const lowerClean = clean.toLowerCase();

  if (dict && dict[lowerClean]) {
    const isCap = clean[0] === clean[0].toUpperCase();
    const val = dict[lowerClean];
    return isCap ? val.charAt(0).toUpperCase() + val.slice(1) : val;
  }

  // If word-by-word exists in dict:
  if (dict) {
    const words = clean.split(/(\s+|[.,!?;:()]+)/);
    let matchedCount = 0;
    const translatedTokens = words.map(tok => {
      const low = tok.toLowerCase();
      if (dict[low]) {
        matchedCount++;
        const isCap = tok[0] === tok[0].toUpperCase();
        const rep = dict[low];
        return isCap ? rep.charAt(0).toUpperCase() + rep.slice(1) : rep;
      }
      return tok;
    });
    if (matchedCount > 0) {
      return translatedTokens.join('');
    }
  }

  // Descriptive fallback if external APIs are unreachable
  const targetMeta = getLanguageByCode(to);
  const targetName = targetMeta?.name || to.toUpperCase();
  return `[Traducción a ${targetName}]: ${clean}`;
}
