import {
  summarizeTextDetailed,
  improveText,
  cleanTextAdvanced,
  analyzeText,
  convertTextFormat
} from './textTools';
import { findRhymes, analyzeStanzaScheme } from './rhymeTools';

// ============================================================================
// 1. AUTOPILOT WORKFLOW PIPELINE ("1-CLICK MASTER PIPELINE")
// ============================================================================
export interface AutopilotPipelineReport {
  originalText: string;
  cleanedText: string;
  correctedText: string;
  correctionsCount: number;
  correctionNotes: string[];
  executiveSummary: string;
  keyPoints: string[];
  studyQuestions: string[];
  seoHeadline: string;
  urlSlug: string;
  hashtags: string;
  metrics: {
    words: number;
    readingTimeMin: number;
    speakingTimeSec: number;
    huertaScore: number;
    huertaLabel: string;
    topKeywords: string[];
  };
  markdownBundle: string;
}

export function runAutopilotPipeline(rawText: string): AutopilotPipelineReport {
  const safeInput = (rawText || '').trim();
  if (!safeInput) {
    return {
      originalText: '',
      cleanedText: '',
      correctedText: '',
      correctionsCount: 0,
      correctionNotes: [],
      executiveSummary: '',
      keyPoints: [],
      studyQuestions: [],
      seoHeadline: '',
      urlSlug: '',
      hashtags: '',
      metrics: {
        words: 0,
        readingTimeMin: 0,
        speakingTimeSec: 0,
        huertaScore: 0,
        huertaLabel: 'Sin texto',
        topKeywords: []
      },
      markdownBundle: ''
    };
  }

  // Step 1: Deep Clean
  const cleanedText = cleanTextAdvanced(safeInput, {
    mode: 'balanced',
    stripHtml: true,
    stripMarkdown: false,
    stripUrls: false,
    stripEmails: false,
    stripEmojis: false,
    stripTimestamps: false,
    stripLeadingNumbers: false,
    dedupeLines: true
  });

  // Step 2: Deep Orthographic & Editorial Correction
  const improved = improveText(cleanedText, 'editorial');
  const correctedText = improved.result;

  // Step 3: Executive Summary & Exam Questions
  const detailedSum = summarizeTextDetailed(correctedText, 4, 'executive');
  const quizSum = summarizeTextDetailed(correctedText, 4, 'studyQuestions');
  const studyQuestions = quizSum.output
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  // Step 4: SEO & Readability Audit
  const seo = analyzeText(correctedText);
  const firstSentence =
    (detailedSum.extractedSentences[0] || '')
      .replace(/^«|»$/g, '')
      .slice(0, 95) ||
    correctedText.split(/[.!?]/)[0]?.slice(0, 95) ||
    'Documento Ejecutivo 930Text';

  const seoHeadline = convertTextFormat(firstSentence, 'title');
  const urlSlug = convertTextFormat(seoHeadline, 'slug');
  const hashtags = convertTextFormat(
    seo.keywords.map(k => k.word).join(' ') || seoHeadline,
    'hashtags'
  );

  const markdownBundle = [
    `# DOSSIER AUTOPILOT — 930TEXT`,
    `Generado: ${new Date().toLocaleString('es-ES')}`,
    ``,
    `## 1. Titular SEO, Slug y Etiquetas`,
    `- **Titular sugerido:** ${seoHeadline}`,
    `- **URL Slug:** \`/${urlSlug}\``,
    `- **Hashtags:** ${hashtags}`,
    ``,
    `## 2. Texto Limpio y Corregido (${improved.changesCount} optimizaciones aplicadas)`,
    correctedText,
    ``,
    `## 3. Ficha de Resumen Ejecutivo`,
    detailedSum.output,
    ``,
    `## 4. Auditoría de Legibilidad y SEO`,
    `- **Palabras:** ${seo.words} | **Lectura:** ${seo.readingTimeMin} min | **Locución:** ${seo.speakingTimeSec} s`,
    `- **Índice Fernández Huerta:** ${seo.huertaReadability}/100 (${seo.huertaLabel})`,
    `- **Palabras clave dominantes:** ${seo.keywords.map(k => `${k.word} (${k.densityPct}%)`).join(', ') || 'N/A'}`
  ].join('\n');

  return {
    originalText: safeInput,
    cleanedText,
    correctedText,
    correctionsCount: improved.changesCount,
    correctionNotes: improved.appliedNotes,
    executiveSummary: detailedSum.output,
    keyPoints: detailedSum.extractedSentences,
    studyQuestions,
    seoHeadline,
    urlSlug,
    hashtags,
    metrics: {
      words: seo.words,
      readingTimeMin: seo.readingTimeMin,
      speakingTimeSec: seo.speakingTimeSec,
      huertaScore: seo.huertaReadability,
      huertaLabel: seo.huertaLabel,
      topKeywords: seo.keywords.map(k => `${k.word} (${k.densityPct}%)`)
    },
    markdownBundle
  };
}

// ============================================================================
// 2. COMPARADOR DE VERSIONES PRO (WORD-LEVEL DIFF & SIMILARITY ENGINE)
// ============================================================================
export interface DiffToken {
  type: 'same' | 'added' | 'removed';
  text: string;
}

export interface TextComparisonReport {
  tokens: DiffToken[];
  addedWords: number;
  removedWords: number;
  unchangedWords: number;
  similarityPct: number;
  lengthDeltaChars: number;
}

export function compareTextsDetailed(textA: string, textB: string): TextComparisonReport {
  const wordsA = (textA || '').trim().split(/\s+/).filter(Boolean);
  const wordsB = (textB || '').trim().split(/\s+/).filter(Boolean);

  if (wordsA.length === 0 && wordsB.length === 0) {
    return {
      tokens: [],
      addedWords: 0,
      removedWords: 0,
      unchangedWords: 0,
      similarityPct: 100,
      lengthDeltaChars: 0
    };
  }

  // Cap LCS matrix to 450 words per side for instant 60fps browser performance
  const a = wordsA.slice(0, 450);
  const b = wordsB.slice(0, 450);
  const n = a.length;
  const m = b.length;

  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (a[i] === b[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }

  const tokens: DiffToken[] = [];
  let i = 0;
  let j = 0;
  let addedWords = 0;
  let removedWords = 0;
  let unchangedWords = 0;

  while (i < n && j < m) {
    if (a[i] === b[j]) {
      tokens.push({ type: 'same', text: a[i] });
      unchangedWords++;
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      tokens.push({ type: 'removed', text: a[i] });
      removedWords++;
      i++;
    } else {
      tokens.push({ type: 'added', text: b[j] });
      addedWords++;
      j++;
    }
  }
  while (i < n) {
    tokens.push({ type: 'removed', text: a[i++] });
    removedWords++;
  }
  while (j < m) {
    tokens.push({ type: 'added', text: b[j++] });
    addedWords++;
  }

  const totalCompared = Math.max(1, Math.max(n, m));
  const similarityPct = Math.min(100, Math.round((unchangedWords / totalCompared) * 100));

  return {
    tokens,
    addedWords,
    removedWords,
    unchangedWords,
    similarityPct,
    lengthDeltaChars: (textB || '').length - (textA || '').length
  };
}

// ============================================================================
// 3. GENERADOR DE CITAS ACADÉMICAS (APA 7, MLA 9, ISO 690, HARVARD, CHICAGO, BIBTEX)
// ============================================================================
export interface CitationInput {
  authorFirst: string;
  authorLast: string;
  year: string;
  title: string;
  publisherOrSite: string;
  url: string;
  accessDate: string;
}

export interface CitationResult {
  apa7: string;
  mla9: string;
  harvard: string;
  iso690: string;
  chicago: string;
  bibtex: string;
}

export function generateAcademicCitations(input: CitationInput): CitationResult {
  const first = (input.authorFirst || 'Rafael').trim();
  const last = (input.authorLast || 'Moreno Roman').trim();
  const initial = first ? `${first.charAt(0).toUpperCase()}.` : '';
  const year = (input.year || String(new Date().getFullYear())).trim();
  const title = (input.title || 'Guía de procesamiento de texto y productividad digital').trim();
  const source = (input.publisherOrSite || '930Text Editorial').trim();
  const url = (input.url || 'https://textotodooficial-hub.github.io/TextoTodo/').trim();
  const accessed = (input.accessDate || new Date().toLocaleDateString('es-ES')).trim();

  const slugKey =
    `${last.split(/\s+/)[0].toLowerCase().replace(/[^a-z0-9]/g, '')}${year}` || 'fuente2026';

  const apa7 = `${last}, ${initial} (${year}). ${title}. ${source}. ${url}`;
  const mla9 = `${last}, ${first}. "${title}." ${source}, ${year}, ${url}. Consultado el ${accessed}.`;
  const harvard = `${last}, ${initial} (${year}) '${title}', ${source}. Disponible en: ${url} (Consultado: ${accessed}).`;
  const iso690 = `${last.toUpperCase()}, ${first}. ${title} [en línea]. ${source}, ${year} [consulta: ${accessed}]. Disponible en: ${url}.`;
  const chicago = `${last}, ${first}. "${title}." ${source}. Publicado en ${year}. ${url}.`;
  const bibtex = `@misc{${slugKey},\n  author = {${last}, ${first}},\n  title = {${title}},\n  year = {${year}},\n  howpublished = {\\url{${url}}},\n  note = {Editorial / Sitio: ${source}. Consultado: ${accessed}}\n}`;

  return { apa7, mla9, harvard, iso690, chicago, bibtex };
}

// ============================================================================
// 4. GENERADOR DE PLANTILLAS DE COMUNICACIÓN (WHATSAPP, EMAIL, REDES, PRENSA)
// ============================================================================
export type ExecutiveTemplateId =
  | 'email-propuesta'
  | 'whatsapp-cierre'
  | 'linkedin-lanzamiento'
  | 'soporte-disculpa'
  | 'universidad-entrega'
  | 'nota-prensa';

export interface ExecutiveTemplateDef {
  id: ExecutiveTemplateId;
  label: string;
  badge: string;
  description: string;
  build: (topic: string, sender: string, recipient: string, cta: string) => string;
}

export const EXECUTIVE_TEMPLATES: ExecutiveTemplateDef[] = [
  {
    id: 'email-propuesta',
    label: 'Correo Comercial B2B',
    badge: 'Alta conversión',
    description: 'Propuesta ejecutiva clara para captar clientes o cerrar presupuestos.',
    build: (topic, sender, recipient, cta) =>
      `Asunto: Propuesta de optimización y próximos pasos — ${topic}\n\nHola ${recipient}:\n\nEspero que estés teniendo una excelente semana. Te escribo porque he preparado una propuesta concreta sobre ${topic} orientada a ahorrar tiempo operativo y mejorar resultados desde la primera semana.\n\nPuntos clave de la propuesta:\n• Implementación inmediata sin fricciones técnicas.\n• Ahorro medible en costes y horas de gestión.\n• Seguimiento personalizado de resultados.\n\n${cta}\n\nUn cordial saludo,\n${sender}`
  },
  {
    id: 'whatsapp-cierre',
    label: 'WhatsApp de Ventas / Cierre',
    badge: 'Directo al móvil',
    description: 'Mensaje breve y persuasivo para seguimiento comercial por WhatsApp.',
    build: (topic, sender, recipient, cta) =>
      `¡Hola ${recipient}! 👋 Soy ${sender}.\n\nTe escribo rápido respecto a *${topic}*. Ya tenemos todo listo para activarlo hoy mismo con las condiciones que comentamos.\n\n👉 *Siguiente paso:* ${cta}\n\nConfírmame por aquí si te viene bien y lo dejamos cerrado en 2 minutos. ¡Gracias!`
  },
  {
    id: 'linkedin-lanzamiento',
    label: 'Post Viral LinkedIn / X',
    badge: 'Marca personal',
    description: 'Estructura probada con gancho, aprendizaje en viñetas y llamada a la acción.',
    build: (topic, sender, _recipient, cta) =>
      `El 90% de los profesionales pierde horas cada semana en tareas manuales relacionadas con ${topic}.\n\nDespués de analizar decenas de casos reales, estas son las 3 claves que marcan la diferencia:\n\n1️⃣ Estandarizar el flujo de trabajo antes de escalar.\n2️⃣ Eliminar la fricción con herramientas que funcionen en segundos.\n3️⃣ Medir el impacto real en tiempo ahorrado, no en horas sentado.\n\n${cta}\n\n¿Cómo lo estás gestionando hoy en tu equipo? Te leo en comentarios 👇\n\n— ${sender}`
  },
  {
    id: 'soporte-disculpa',
    label: 'Atención al Cliente / Incidencia',
    badge: 'Fidelización',
    description: 'Respuesta empática y resolutiva para calmar y fidelizar a un cliente.',
    build: (topic, sender, recipient, cta) =>
      `Asunto: Solución aplicada a tu consulta sobre ${topic}\n\nEstimado/a ${recipient}:\n\nMuchas gracias por ponerte en contacto con nosotros. Lamentamos sinceramente cualquier inconveniente ocasionado en relación con ${topic}.\n\nHemos revisado tu caso con carácter prioritario y ya hemos aplicado la solución definitiva para que puedas continuar sin interrupciones.\n\n${cta}\n\nQuedo a tu entera disposición para cualquier consulta adicional.\n\nAtentamente,\n${sender}`
  },
  {
    id: 'universidad-entrega',
    label: 'Correo Formal Académico / Profesor',
    badge: 'Estudiantes',
    description: 'Entrega formal de trabajo, TFG, TFM o consulta de tutoría universitaria.',
    build: (topic, sender, recipient, cta) =>
      `Asunto: Entrega de documentación y consulta académica — ${topic}\n\nEstimado/a profesor/a ${recipient}:\n\nEspero que se encuentre muy bien. Por medio del presente correo le adjunto el documento correspondiente a «${topic}», revisado siguiendo los criterios metodológicos y de estilo indicados en la asignatura.\n\n${cta}\n\nAgradezco de antemano su tiempo y sus orientaciones.\n\nAtentamente,\n${sender}`
  },
  {
    id: 'nota-prensa',
    label: 'Comunicado Oficial / Lanzamiento',
    badge: 'Medios & PR',
    description: 'Nota de prensa periodística con titular, entradilla y citas institucionales.',
    build: (topic, sender, recipient, cta) =>
      `COMUNICADO DE PRENSA — DIFUSIÓN INMEDIATA\n\n${topic.toUpperCase()}: NUEVO ESTÁNDAR DE EFICIENCIA Y PRODUCTIVIDAD DIGITAL\n\nMadrid / Barcelona, ${new Date().toLocaleDateString('es-ES')} — Con el objetivo de transformar la experiencia de ${recipient}, se presenta oficialmente la nueva iniciativa centrada en ${topic}.\n\n«Nuestro compromiso es ofrecer soluciones inmediatas, transparentes y accesibles desde cualquier dispositivo», señaló ${sender}, responsable del proyecto.\n\nMás información y acceso directo:\n${cta}`
  }
];

// ============================================================================
// 5. COMPOSITOR DE ESTRIBILLOS Y ESTRUCTURA DE CANCIÓN COMPLETA (MUSIC STUDIO)
// ============================================================================
export function generateSongBlueprint(
  topic: string,
  style: 'urbano' | 'pop' | 'balada' | 'epico',
  bpm: number
): string {
  const cleanTopic = (topic || 'superación').trim().split(/\s+/)[0] || 'corazón';
  const rhymesCons = findRhymes(cleanTopic, 'consonante', 8, 0).map(r => r.word);
  const rhymesAson = findRhymes(cleanTopic, 'asonante', 8, 0).map(r => r.word);

  const r1 = rhymesCons[0] || 'camino';
  const r2 = rhymesCons[1] || 'destino';
  const r3 = rhymesCons[2] || 'latido';
  const r4 = rhymesAson[0] || 'estrella';
  const r5 = rhymesAson[1] || 'fuerza';

  const styleLabels = {
    urbano: 'Trap / Reggaetón / Rap Melódico',
    pop: 'Pop Comercial / Indie Radio',
    balada: 'Balada Acústica / Cantautor',
    epico: 'Épico / Boom Bap Consciente'
  };

  const sampleStanza = [
    `Nadie vio las horas que pasé buscando ${cleanTopic}`,
    `Transformando cada sombra en una nueva ${r1}`,
    `Hoy el pulso sube fuerte marcando mi ${r2}`,
    `Y en el eco de la noche brilla cada ${r4}`
  ].join('\n');

  const schemeCheck = analyzeStanzaScheme(sampleStanza, 'asonante');

  return [
    `====================================================================`,
    `ESTRUCTURA DE CANCIÓN PROFESIONAL — 930TEXT MUSIC STUDIO`,
    `Temática: "${cleanTopic.toUpperCase()}" | Estilo: ${styleLabels[style]} | Tempo: ${bpm} BPM`,
    `====================================================================`,
    ``,
    `[INTRO · 4 Compases · Entrada atmosférica a ${bpm} BPM]`,
    `(Susurro / Melodía suave)`,
    `Todo empezó pensando en ${cleanTopic}...`,
    `Buscando ${r1}, cruzando el ${r2}.`,
    ``,
    `[VERSO 1 · 8 Compases · Narrativa directa]`,
    `Caminé sin mapa cuando nadie daba nada,`,
    `Con la mente puesta fija en alcanzar ${cleanTopic},`,
    `Cada paso firme despertaba mi ${r1},`,
    `Convertí la duda en el motor de mi ${r2}.`,
    `Aunque el viento sople en contra sigo en el ${r3},`,
    `Con la mira clara y el orgullo en cada ${r5}.`,
    ``,
    `[PRE-ESTRIBILLO · 4 Compases · Subida de tensión]`,
    `Y ahora míranos subir sin freno,`,
    `Lo que ayer dolía hoy suena sereno...`,
    ``,
    `[ESTRIBILLO / CORO PRINCIPAL · 8 Compases · Gancho pegadizo (${schemeCheck.stanzaPatternName})]`,
    sampleStanza,
    ``,
    `[PUENTE / OUTRO · 4 Compases · Cierre melódico]`,
    `Queda escrito a fuego: ${cleanTopic} y ${r1},`,
    `A ${bpm} latidos por minuto... hasta el final del ${r2}.`,
    ``,
    `--------------------------------------------------------------------`,
    `BANCO DE RIMAS SUGERIDAS PARA SEGUIR ESCRIBIENDO:`,
    `• Consonantes: ${rhymesCons.slice(0, 6).join(', ') || 'corazón, canción, pasión'}`,
    `• Asonantes: ${rhymesAson.slice(0, 6).join(', ') || 'vida, brisa, cima'}`
  ].join('\n');
}

// ============================================================================
// 6. SINTETIZADOR DE BASES RÍTMICAS WEB AUDIO (BOOM BAP, TRAP, REGGAETON, POP)
// ============================================================================
export type DrumBeatStyle = 'boombap' | 'trap' | 'reggaeton' | 'pop';

export function playSynthesizedDrumStep(
  ctx: AudioContext,
  style: DrumBeatStyle,
  step16: number
): void {
  const now = ctx.currentTime;

  const triggerKick = (freqStart = 135, duration = 0.16, gainVal = 0.5) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freqStart, now);
    osc.frequency.exponentialRampToValueAtTime(34, now + duration);
    gain.gain.setValueAtTime(gainVal, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.01);
  };

  const triggerSnare = (gainVal = 0.28) => {
    // Tone body
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.09);
    oscGain.gain.setValueAtTime(gainVal * 0.7, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);

    // Snare noise snap
    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(900, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(gainVal, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  };

  const triggerHat = (open = false, gainVal = 0.1) => {
    const dur = open ? 0.16 : 0.04;
    const bufferSize = Math.floor(ctx.sampleRate * dur);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(5500, now);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(gainVal, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  };

  const s = step16 % 16;

  if (style === 'boombap') {
    // Classic 90s Hip-Hop Boom Bap
    if (s === 0 || s === 7 || s === 10) triggerKick(140, 0.18, 0.55);
    if (s === 4 || s === 12) triggerSnare(0.32);
    if (s % 2 === 0) triggerHat(s === 14, 0.11);
  } else if (style === 'trap') {
    // Modern 808 Trap with rapid hi-hat rolls
    if (s === 0 || s === 6 || s === 10) triggerKick(120, 0.25, 0.6);
    if (s === 8) triggerSnare(0.35);
    if (s % 2 === 0 || s === 3 || s === 7 || s === 13 || s === 15) {
      triggerHat(s === 14, 0.12);
    }
  } else if (style === 'reggaeton') {
    // Dembow pattern (Kick on 0, 4, 8, 12 + Tresillo Snare on 3, 6, 11, 14)
    if (s % 4 === 0) triggerKick(135, 0.17, 0.55);
    if (s === 3 || s === 6 || s === 11 || s === 14) triggerSnare(0.28);
    if (s % 2 === 0) triggerHat(false, 0.08);
  } else {
    // Pop / Indie four-on-the-floor
    if (s % 4 === 0) triggerKick(130, 0.15, 0.48);
    if (s === 4 || s === 12) triggerSnare(0.26);
    if (s % 2 === 0) triggerHat(s === 6 || s === 14, 0.1);
  }
}

// ============================================================================
// 7. SIMULADOR VISUAL GOOGLE SERP & TARJETAS DE REDES SOCIALES
// ============================================================================
export interface SerpPreviewData {
  title: string;
  domain: string;
  slug: string;
  urlSlug: string;
  description: string;
  metaDescription: string;
  titleLength: number;
  descLength: number;
  titleStatus: 'optimal' | 'optimo' | 'corto' | 'largo';
  descStatus: 'optimal' | 'optimo' | 'corto' | 'largo';
  htmlMetaSnippet: string;
}

export function buildSerpPreview(
  rawText: string,
  customTitle?: string,
  customDesc?: string,
  customDomain?: string
): SerpPreviewData {
  const clean = (rawText || '').trim().replace(/\s+/g, ' ');
  const domain = (customDomain || 'textotodooficial-hub.github.io/TextoTodo').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '') || 'textotodooficial-hub.github.io/TextoTodo';
  const firstSentence = clean.split(/[.!?]/)[0]?.trim() || 'Plataforma Todo en Uno de Productividad y Texto';
  const generatedTitle =
    (customTitle?.trim() || convertTextFormat(firstSentence.slice(0, 62), 'title')) + ' | 930Text';
  const finalTitle = generatedTitle.slice(0, 72);
  const slug = convertTextFormat(firstSentence.slice(0, 48), 'slug') || 'herramientas-texto';
  const description =
    customDesc?.trim() ||
    (clean.length > 20
      ? clean.slice(0, 156) + (clean.length > 156 ? '…' : '')
      : 'Descubre cómo optimizar, resumir, corregir y analizar tus textos con métricas SEO de legibilidad Fernández Huerta en tiempo real.');

  const titleLength = finalTitle.length;
  const descLength = description.length;

  const titleStatus = titleLength >= 40 && titleLength <= 65 ? 'optimal' : titleLength < 40 ? 'corto' : 'largo';
  const descStatus = descLength >= 110 && descLength <= 160 ? 'optimal' : descLength < 110 ? 'corto' : 'largo';

  const htmlMetaSnippet = [
    `<title>${finalTitle}</title>`,
    `<meta name="description" content="${description.replace(/"/g, '&quot;')}" />`,
    `<link rel="canonical" href="https://${domain}/${slug}" />`,
    `<meta property="og:type" content="article" />`,
    `<meta property="og:title" content="${finalTitle.replace(/"/g, '&quot;')}" />`,
    `<meta property="og:description" content="${description.replace(/"/g, '&quot;')}" />`,
    `<meta property="og:url" content="https://${domain}/${slug}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${finalTitle.replace(/"/g, '&quot;')}" />`,
    `<meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}" />`
  ].join('\n');

  return {
    title: finalTitle,
    domain,
    slug,
    urlSlug: `https://${domain}/${slug}`,
    description,
    metaDescription: description,
    titleLength,
    descLength,
    titleStatus,
    descStatus,
    htmlMetaSnippet
  };
}

// ============================================================================
// 8. ENLACE DE TRABAJO COMPARTIBLE POR URL HASH (ZERO-DB SHARE LINK)
// ============================================================================
export interface SharedWorkspacePayload {
  tool: string;
  text: string;
}

export function encodeWorkspaceShareHash(tool: string, text: string): string {
  try {
    const payload: SharedWorkspacePayload = {
      tool,
      text: (text || '').slice(0, 2200)
    };
    const json = JSON.stringify(payload);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#share=${encodeURIComponent(b64)}`;
  } catch {
    return window.location.href;
  }
}

export function decodeWorkspaceShareHash(hashStr: string): SharedWorkspacePayload | null {
  try {
    if (!hashStr || !hashStr.includes('share=')) return null;
    const match = hashStr.match(/share=([^&]+)/);
    if (!match || !match[1]) return null;
    const b64 = decodeURIComponent(match[1]);
    const json = decodeURIComponent(escape(atob(b64)));
    const parsed = JSON.parse(json) as SharedWorkspacePayload;
    if (parsed && typeof parsed.tool === 'string' && typeof parsed.text === 'string') {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

// ============================================================================
// 9. EXPORTADOR MULTI-FORMATO EMPRESARIAL (WORD .DOC, MARKDOWN, JSON, PDF/PRINT)
// ============================================================================
export function exportToWordDoc(filename: string, title: string, textContent: string) {
  const safeTitle = (title || 'Documento 930Text').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeBody = (textContent || '')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n\n/g, '</p><p style="margin-bottom: 12pt; line-height: 1.6;">')
    .replace(/\n/g, '<br/>');

  const htmlDoc = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>${safeTitle}</title>
        <!--[if gte mso 9]>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
            <w:DoNotOptimizeForBrowser/>
          </w:WordDocument>
        </xml>
        <![endif]-->
        <style>
          body { font-family: 'Calibri', 'Segoe UI', sans-serif; font-size: 11pt; color: #1e293b; margin: 1in; }
          h1 { font-size: 20pt; color: #4f46e5; border-bottom: 2pt solid #e2e8f0; padding-bottom: 8pt; margin-bottom: 16pt; font-family: 'Segoe UI Semibold', sans-serif; }
          .meta { font-size: 9pt; color: #64748b; margin-bottom: 20pt; text-transform: uppercase; letter-spacing: 0.05em; }
          p { margin-bottom: 12pt; line-height: 1.6; text-align: justify; }
          .footer { margin-top: 32pt; pt: 12pt; border-top: 1pt solid #cbd5e1; font-size: 8.5pt; color: #94a3b8; }
        </style>
      </head>
      <body>
        <h1>${safeTitle}</h1>
        <div class="meta">Generado con 930Text · Suite Editorial Lingüística · ${new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <p style="margin-bottom: 12pt; line-height: 1.6;">${safeBody}</p>
        <div class="footer">930Text — 10 Suites de Productividad de Texto · 100% Privado en Cliente</div>
      </body>
    </html>
  `.trim();

  const blob = new Blob(['\ufeff', htmlDoc], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.doc') ? filename : `${filename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function exportToMarkdown(filename: string, title: string, textContent: string) {
  const md = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${new Date().toISOString()}"
generator: "930Text Suite"
---

# ${title}

${textContent}

---
*Documento exportado con [930Text](https://textotodooficial-hub.github.io/TextoTodo/) — Plataforma 10 en 1 de Productividad Lingüística.*
`;

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.md') ? filename : `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function exportToJson(filename: string, data: unknown) {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.json') ? filename : `${filename}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}


