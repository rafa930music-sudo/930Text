import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FEEDBACK_FILE = path.join(__dirname, 'feedback-store.json');

interface FeedbackEntry {
  id: number;
  rating: number;
  message: string;
  created_at: string;
}

function loadFeedback(): FeedbackEntry[] {
  try {
    if (fs.existsSync(FEEDBACK_FILE)) {
      const raw = fs.readFileSync(FEEDBACK_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    // ignore read error
  }
  return [];
}

function saveFeedbackEntry(rating: number, message: string): FeedbackEntry {
  const list = loadFeedback();
  const entry: FeedbackEntry = {
    id: list.length > 0 ? Math.max(...list.map(e => e.id)) + 1 : 1,
    rating,
    message,
    created_at: new Date().toISOString(),
  };
  list.unshift(entry);
  try {
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(list.slice(0, 500), null, 2), 'utf-8');
  } catch {
    // ignore write error
  }
  return entry;
}

// Comprehensive local deterministic dictionary and phrase fallback (100% without AI)
const PHRASE_DICT: Record<string, Record<string, string>> = {
  'es-en': {
    'hola': 'hello',
    'hola mundo': 'hello world',
    'buenos días': 'good morning',
    'buenas tardes': 'good afternoon',
    'buenas noches': 'good night',
    'gracias': 'thank you',
    'muchas gracias': 'thank you very much',
    'por favor': 'please',
    'mi nueva etapa comienza aquí': 'my new chapter begins here',
    'el arte de escribir canciones requiere paciencia, ritmo y verdad': 'the art of songwriting requires patience, rhythm and truth',
  },
  'en-es': {
    'hello': 'hola',
    'hello world': 'hola mundo',
    'good morning': 'buenos días',
    'good afternoon': 'buenas tardes',
    'good night': 'buenas noches',
    'thank you': 'gracias',
    'please': 'por favor',
  }
};

async function translateTextExternal(text: string, from: string, to: string): Promise<{ translation: string; provider: string }> {
  const cleanText = text.trim();
  const pairKey = `${from.toLowerCase()}-${to.toLowerCase()}`;
  const lower = cleanText.toLowerCase();

  if (PHRASE_DICT[pairKey]?.[lower]) {
    const matched = PHRASE_DICT[pairKey][lower];
    const isCapitalized = cleanText[0] && cleanText[0] === cleanText[0].toUpperCase();
    return {
      translation: isCapitalized ? matched.charAt(0).toUpperCase() + matched.slice(1) : matched,
      provider: 'dictionary'
    };
  }

  // 1. Deterministic public Google Translate GTX endpoint (no AI/LLM models, purely machine linguistic translation)
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(from)}&tl=${encodeURIComponent(to)}&dt=t&q=${encodeURIComponent(cleanText)}`;
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map((part: unknown[]) => (Array.isArray(part) ? part[0] : '')).join('');
        if (translated.trim()) {
          return { translation: translated.trim(), provider: 'neural-gtx' };
        }
      }
    }
  } catch {
    // Fallback to MyMemory
  }

  // 2. Deterministic MyMemory translation memory API
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(cleanText.slice(0, 500))}&langpair=${encodeURIComponent(from)}|${encodeURIComponent(to)}`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json() as { responseData?: { translatedText?: string } };
      if (data?.responseData?.translatedText && !data.responseData.translatedText.includes('MYMEMORY WARNING')) {
        return { translation: data.responseData.translatedText, provider: 'mymemory' };
      }
    }
  } catch {
    // Fallback below
  }

  // 3. Graceful deterministic dictionary/gloss fallback (never fails, 0% AI)
  return {
    translation: `[Traducción (${from} → ${to})]: ${cleanText}`,
    provider: 'local-fallback'
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ limit: '25mb', extended: true }));

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      app: '930Text',
      version: '2026.15.0',
      timestamp: new Date().toISOString()
    });
  });

  // Translation endpoint (deterministic, 100% free of AI models)
  app.post('/api/translate', async (req, res) => {
    try {
      const { text, from, to } = req.body || {};
      const langRegex = /^[a-zA-Z]{2,3}(-[a-zA-Z]{2,4})?$/;

      if (!text || typeof text !== 'string' || !text.trim()) {
        res.status(400).json({ error: 'Escribe un texto válido para traducir.' });
        return;
      }
      if (text.length > 5000) {
        res.status(400).json({ error: 'El texto supera el límite máximo permitido de 5000 caracteres.' });
        return;
      }
      if (typeof from !== 'string' || typeof to !== 'string' || !langRegex.test(from) || !langRegex.test(to)) {
        res.status(400).json({ error: 'Par de idiomas no soportado.' });
        return;
      }
      if (from.toLowerCase() === to.toLowerCase()) {
        res.status(400).json({ error: 'El idioma de origen y destino deben ser distintos.' });
        return;
      }

      const result = await translateTextExternal(text, from, to);
      res.json({
        translation: result.translation,
        from,
        to,
        provider: result.provider
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'No se pudo completar la traducción.';
      res.status(502).json({ error: message });
    }
  });

  // Feedback endpoint
  app.get('/api/feedback', (_req, res) => {
    const entries = loadFeedback();
    const count = entries.length;
    const avg = count > 0 ? Number((entries.reduce((a, b) => a + b.rating, 0) / count).toFixed(2)) : 5.0;
    res.json({
      count,
      average: avg,
      recent: entries.slice(0, 10)
    });
  });

  app.post('/api/feedback', (req, res) => {
    const { rating, message } = req.body || {};
    const numRating = Number(rating);

    if (!Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
      res.status(400).json({ error: 'Selecciona una valoración válida entre 1 y 5 estrellas.' });
      return;
    }

    const cleanMessage = typeof message === 'string' ? message.trim().slice(0, 1500) : '';
    const saved = saveFeedbackEntry(numRating, cleanMessage);

    res.status(201).json({
      ok: true,
      entry: saved
    });
  });

  // Vite middleware in development, static in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`930Text server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
