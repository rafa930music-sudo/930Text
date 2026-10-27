import { WORLD_LANGUAGES, getLanguageByCode } from '../data/languagesData';

export { WORLD_LANGUAGES, getLanguageByCode };

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
    const res = await fetch('./api/translate', {
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
  const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
    clean.slice(0, 500)
  )}&langpair=${encodeURIComponent(from)}|${encodeURIComponent(to)}`;
  const mmRes = await fetch(mmUrl);
  if (mmRes.ok) {
    const mmData = await mmRes.json();
    if (mmData?.responseData?.translatedText) {
      return mmData.responseData.translatedText;
    }
  }

  throw new Error('No se pudo completar la traducción en este momento.');
}
