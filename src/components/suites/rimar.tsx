import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  findRhymes,
  analyzeVerseMeter,
  analyzeStanzaScheme,
  lookupSpanishDictionaryWord,
  generatePoeticStanza,
  FREESTYLE_PROMPTS,
  DICTIONARY_TOTAL_WORDS,
  RhymeLanguageCode
} from '../../utils/rhymeTools';
import {
  generateSongBlueprint,
  DrumBeatStyle,
  playSynthesizedDrumStep
} from '../../utils/enterpriseTools';
import {
  MULTILINGUAL_RHYME_PACKS
} from '../../data/languagesData';
import { WordCategory } from '../../data/spanishDictionary';
import { LIMITS } from '../../config/limits';
import {
  Play,
  Square,
  Volume2,
  Copy,
  Download,
  Shuffle,
  Music2,
  BookOpen
} from 'lucide-react';

export interface RimarSuiteProps {
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  addToast?: (msg: string) => void;
  speakText?: (text: string, lang: string) => void;
  sendToTool?: (toolId: string, text: string) => void;
  onRecordRecent?: (toolId: string) => void;
}

export const RimarSuite: React.FC<RimarSuiteProps> = ({
  copyText,
  downloadTxt,
  addToast,
  speakText,
  sendToTool,
  onRecordRecent
}) => {
  // Rhyme state
  const [rhymeWord, setRhymeWord] = useState('corazón');
  const [rhymeLang, setRhymeLang] = useState<RhymeLanguageCode>('es');
  const [rhymeType, setRhymeType] = useState<'consonante' | 'asonante' | 'multisilabica'>('consonante');
  const [rhymeCount, setRhymeCount] = useState(48);
  const [rhymeSyllableFilter, setRhymeSyllableFilter] = useState(0);
  const [rhymeCategoryFilter, setRhymeCategoryFilter] = useState<'todas' | WordCategory>('todas');

  const rhymeResults = useMemo(
    () =>
      findRhymes(
        rhymeWord,
        rhymeType,
        rhymeCount,
        rhymeSyllableFilter,
        rhymeCategoryFilter,
        rhymeLang
      ),
    [rhymeWord, rhymeType, rhymeCount, rhymeSyllableFilter, rhymeCategoryFilter, rhymeLang]
  );

  const rhymeSampleWords = useMemo(() => {
    if (rhymeLang === 'es') {
      return [
        'corazón',
        'libertad',
        'esperanza',
        'silencio',
        'calle',
        'noche',
        'camino',
        'fuego',
        'verdad',
        'universo'
      ];
    }
    return MULTILINGUAL_RHYME_PACKS[rhymeLang]?.sampleWords || ['fire', 'night', 'dream', 'heart'];
  }, [rhymeLang]);

  const dictionaryReport = useMemo(
    () => lookupSpanishDictionaryWord(rhymeWord),
    [rhymeWord]
  );

  // Stanza state
  const [schemeInput, setSchemeInput] = useState(
    'Subo al escenario con la fuerza del motor\nBuscando una salida dentro de mi corazón\nTransformo cada herida en una nueva canción\nDejando en cada barra todo mi valor'
  );
  const [schemeMode, setSchemeMode] = useState<'consonante' | 'asonante'>('consonante');
  const schemeResult = useMemo(
    () => analyzeStanzaScheme(schemeInput, schemeMode),
    [schemeInput, schemeMode]
  );

  // Verse meter state
  const [selectedVerseIdx, setSelectedVerseIdx] = useState(0);
  const activeVerseLine = useMemo(() => {
    const lines = schemeInput
      .split(/\r?\n/)
      .map(l => l.trim())
      .filter(Boolean);
    return lines[selectedVerseIdx] || lines[0] || 'Subo al escenario con la fuerza del motor';
  }, [schemeInput, selectedVerseIdx]);
  const meterResult = useMemo(() => analyzeVerseMeter(activeVerseLine), [activeVerseLine]);

  // Freestyle state
  const [freestyleIdx, setFreestyleIdx] = useState(0);
  const currentPrompt = FREESTYLE_PROMPTS[freestyleIdx % FREESTYLE_PROMPTS.length];

  // Metronome & Beat Engine state
  const [bpm, setBpm] = useState(92);
  const [isMetronomePlaying, setIsMetronomePlaying] = useState(false);
  const [rhythmMode, setRhythmMode] = useState<'click' | DrumBeatStyle>('boombap');
  const drumBeatStyle = rhythmMode === 'click' ? 'metronome' : rhythmMode;
  const setDrumBeatStyle = (val: DrumBeatStyle | 'metronome') => {
    setRhythmMode(val === 'metronome' ? 'click' : val);
  };
  const [currentBeat, setCurrentBeat] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const tapTimesRef = useRef<number[]>([]);

  // Song blueprint state
  const [songStyle, setSongStyle] = useState<'urbano' | 'pop' | 'balada' | 'epico'>('urbano');
  const songBlueprint = useMemo(
    () => generateSongBlueprint(rhymeWord, songStyle, bpm),
    [rhymeWord, songStyle, bpm]
  );

  // Metronome Loop
  useEffect(() => {
    if (!isMetronomePlaying) {
      setCurrentBeat(0);
      return;
    }
    const stepMs = ((60 / bpm) * 1000) / 4;
    let step16 = 0;

    const playStep = () => {
      try {
        if (!audioCtxRef.current) {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        const ctx = audioCtxRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        if (rhythmMode === 'click') {
          if (step16 % 4 === 0) {
            const beatIdx = Math.floor(step16 / 4) % 4;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.frequency.value = beatIdx === 0 ? 980 : 620;
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.07);
          }
        } else {
          playSynthesizedDrumStep(ctx, rhythmMode, step16);
        }
        setCurrentBeat(Math.floor(step16 / 4) % 4 + 1);
        step16 = (step16 + 1) % 16;
      } catch {
        // Audio error fallback
      }
    };

    const interval = setInterval(playStep, stepMs);
    return () => clearInterval(interval);
  }, [isMetronomePlaying, bpm, rhythmMode]);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const handleTapBpm = () => {
    const now = Date.now();
    const times = tapTimesRef.current.filter(t => now - t < 3000);
    times.push(now);
    tapTimesRef.current = times;
    if (times.length >= 2) {
      const intervals: number[] = [];
      for (let i = 1; i < times.length; i++) {
        intervals.push(times[i] - times[i - 1]);
      }
      const avgMs = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      const calculatedBpm = Math.round(60000 / avgMs);
      if (calculatedBpm >= 50 && calculatedBpm <= 200) {
        setBpm(calculatedBpm);
        if (addToast) addToast(`BPM detectado: ${calculatedBpm}`);
      }
    }
  };

  return (
    <section id="rimar" className="py-10 sm:py-16 border-t border-[var(--line)] bg-[var(--surface)]/35">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-7">
          <div>
            <span className="section-number">
              SUITE 08 · DICCIONARIO ESPAÑOL COMPLETO ({DICTIONARY_TOTAL_WORDS.toLocaleString('es-ES')}+ PALABRAS), RIMAS & MÉTRICA
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">
              Rimar Studio & Entrenador de Freestyle
            </h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[var(--muted)] max-w-3xl">
              Busca rimas consonantes, asonantes y multisilábicas en <strong>{DICTIONARY_TOTAL_WORDS.toLocaleString('es-ES')} voces reales</strong>, consulta definiciones y sinónimos, y mide tus estrofas con sinalefas y caja de ritmos BPM.
            </p>
          </div>

          {/* BPM Engine & Metronome Control */}
          <div className="p-3.5 sm:p-4 rounded-2xl studio-console border border-[var(--line)] bg-[var(--surface2)]/80 shrink-0 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4 text-[var(--brand2)]" />
                <span className="text-xs font-extrabold text-[var(--text)]">Metrónomo & BPM:</span>
              </div>
              <div className="flex items-center gap-1.5">
                <strong className="text-base font-mono font-extrabold text-[var(--brand2)] tabular-nums">
                  {bpm} BPM
                </strong>
                <button
                  type="button"
                  onClick={handleTapBpm}
                  className="px-2 py-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[10px] font-extrabold hover:border-[var(--brand2)] active:scale-95 transition"
                >
                  TAP
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                aria-label="Estilo de base rítmica o metrónomo"
                value={drumBeatStyle}
                onChange={e => setDrumBeatStyle(e.target.value as DrumBeatStyle)}
                className="h-9 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold text-[var(--text)]"
              >
                <option value="boombap">Beat Boom-Bap (90s)</option>
                <option value="trap">Beat Trap / Drill 808</option>
                <option value="reggaeton">Beat Reggaetón Dembow</option>
                <option value="pop">Beat Pop / Indie</option>
                <option value="metronome">Solo Pulso Clásico</option>
              </select>

              <input
                type="range"
                min={60}
                max={175}
                value={bpm}
                onChange={e => setBpm(Number(e.target.value))}
                className="w-24 sm:w-28 accent-[var(--brand2)]"
              />

              <button
                type="button"
                onClick={() => setIsMetronomePlaying(!isMetronomePlaying)}
                className={`h-9 px-3.5 rounded-xl font-extrabold text-xs inline-flex items-center gap-1.5 transition ${
                  isMetronomePlaying
                    ? 'bg-[var(--danger)] text-white'
                    : 'bg-[var(--brand2)] text-white dark:text-[#061018]'
                }`}
              >
                {isMetronomePlaying ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" /> Parar
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> {drumBeatStyle === 'metronome' ? 'Pulso' : 'Base'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {/* Left Column: Dictionary + Rhymes */}
          <article className="lg:col-span-7 p-4 sm:p-6 rounded-[22px] sm:rounded-[26px] studio-console flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-display text-base sm:text-lg font-extrabold">
                    1. Buscador de Rimas Multi-Idioma y Diccionario ({DICTIONARY_TOTAL_WORDS.toLocaleString('es-ES')}+ voces)
                  </h3>
                  <p className="text-xs text-[var(--muted)]">
                    Rimas consonantes, asonantes y multisilábicas en Español, Inglés, Francés, Portugués, Italiano, Alemán y Catalán.
                  </p>
                </div>
                <span className="text-xs font-bold text-[var(--brand2)] tabular-nums">
                  {rhymeResults.length} resultados
                </span>
              </div>

              {/* Word Input & Controls */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={rhymeWord}
                      onChange={e => {
                        setRhymeWord(e.target.value);
                        if (onRecordRecent) onRecordRecent('rimar');
                      }}
                      maxLength={LIMITS.RIMAS_PALABRA}
                      placeholder="Palabra semilla (ej. corazón, noche, freedom)…"
                      className="w-full h-11 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-sm font-bold text-[var(--text)]"
                    />
                  </div>
                  <select
                    value={rhymeLang}
                    onChange={e => setRhymeLang(e.target.value as RhymeLanguageCode)}
                    className="h-11 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold"
                  >
                    <option value="es">🇪🇸 Español</option>
                    <option value="en">🇬🇧 Inglés</option>
                    <option value="fr">🇫🇷 Francés</option>
                    <option value="pt">🇵🇹 Portugués</option>
                    <option value="it">🇮🇹 Italiano</option>
                    <option value="de">🇩🇪 Alemán</option>
                    <option value="ca">🟡🔴 Catalán</option>
                  </select>
                </div>

                {/* Quick Word Suggestions Bar */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  <span className="text-[11px] font-extrabold text-[var(--muted)] shrink-0">
                    Sugerencias:
                  </span>
                  {rhymeSampleWords.map(w => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setRhymeWord(w)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition shrink-0 ${
                        rhymeWord.toLowerCase() === w.toLowerCase()
                          ? 'border-[var(--brand2)] bg-[var(--brand2)]/15 text-[var(--brand2)] font-bold'
                          : 'border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>

                {/* Filters Bar: Rhyme Type, Syllables, Category */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t border-[var(--line)]/60">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[var(--muted)] mb-1">
                      Tipo de Rima
                    </label>
                    <select
                      value={rhymeType}
                      onChange={e =>
                        setRhymeType(
                          e.target.value as 'consonante' | 'asonante' | 'multisilabica'
                        )
                      }
                      className="w-full h-8 px-2 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold"
                    >
                      <option value="consonante">Consonante (Exacta)</option>
                      <option value="asonante">Asonante (Vocálica)</option>
                      <option value="multisilabica">Multisilábica (Doble)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[var(--muted)] mb-1">
                      Sílabas
                    </label>
                    <select
                      value={rhymeSyllableFilter}
                      onChange={e => setRhymeSyllableFilter(Number(e.target.value))}
                      className="w-full h-8 px-2 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold"
                    >
                      <option value={0}>Todas las sílabas</option>
                      <option value={2}>Bisílabas (2)</option>
                      <option value={3}>Trisílabas (3)</option>
                      <option value={4}>Tetrasílabas (4)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[var(--muted)] mb-1">
                      Categoría
                    </label>
                    <select
                      value={rhymeCategoryFilter}
                      onChange={e =>
                        setRhymeCategoryFilter(e.target.value as 'todas' | WordCategory)
                      }
                      className="w-full h-8 px-2 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold"
                    >
                      <option value="todas">Todas las categorías</option>
                      <option value="sustantivo">Sustantivos</option>
                      <option value="verbo">Verbos</option>
                      <option value="adjetivo">Adjetivos</option>
                      <option value="adverbio">Adverbios</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-[var(--muted)] mb-1">
                      Límite
                    </label>
                    <select
                      value={rhymeCount}
                      onChange={e => setRhymeCount(Number(e.target.value))}
                      className="w-full h-8 px-2 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold"
                    >
                      <option value={24}>24 palabras</option>
                      <option value={48}>48 palabras</option>
                      <option value={96}>96 palabras</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dictionary Definition Card */}
              {rhymeLang === 'es' && dictionaryReport && (
                <div className="mt-3 p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/80 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
                      <strong className="text-sm font-extrabold text-[var(--text)] capitalize">
                        {dictionaryReport.word}
                      </strong>
                      <span className="px-2 py-0.5 rounded-md bg-[var(--brand-soft)] text-[var(--brand2)] font-mono text-[10px]">
                        {dictionaryReport.syllableBreakdown}
                      </span>
                      <span className="text-[10px] font-extrabold text-[var(--muted)] uppercase">
                        [{dictionaryReport.category}]
                      </span>
                    </div>
                    {speakText && (
                      <button
                        type="button"
                        onClick={() => speakText(dictionaryReport.word, rhymeLang)}
                        className="text-[11px] font-bold text-[var(--brand2)] hover:underline inline-flex items-center gap-1"
                      >
                        <Volume2 className="w-3 h-3" /> Escuchar
                      </button>
                    )}
                  </div>
                  <p className="text-[var(--text)] leading-relaxed italic">
                    «{dictionaryReport.definition}»
                  </p>
                  {dictionaryReport.synonyms.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      <span className="font-bold text-[var(--muted)] text-[11px]">Sinónimos:</span>
                      {dictionaryReport.synonyms.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRhymeWord(s)}
                          className="px-1.5 py-0.5 rounded bg-[var(--surface)] border border-[var(--line)] text-[10px] font-semibold hover:border-[var(--brand2)]"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Rhymes Results Grid */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-56 overflow-y-auto p-1 border border-[var(--line)] rounded-2xl bg-[var(--surface2)]/50">
                {rhymeResults.length > 0 ? (
                  rhymeResults.map((item, idx) => (
                    <button
                      key={`${item.word}-${idx}`}
                      type="button"
                      onClick={() => copyText(item.word, `«${item.word}» copiado`)}
                      className="p-2 rounded-xl border border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand2)] transition text-left flex flex-col justify-between"
                    >
                      <strong className="text-xs font-extrabold text-[var(--text)] truncate">
                        {item.word}
                      </strong>
                      <div className="flex items-center justify-between text-[10px] text-[var(--muted)] mt-1">
                        <span>{item.syllables} síl.</span>
                        <span className="uppercase text-[9px] font-bold text-[var(--gold)]">
                          {item.category.slice(0, 3)}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="col-span-full py-6 text-center text-xs text-[var(--muted)]">
                    No se encontraron rimas directas para esta combinación. Intenta cambiar el tipo de rima o reducir los filtros.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[var(--line)] flex flex-wrap gap-2 items-center justify-between">
              <span className="text-xs text-[var(--muted)]">
                Haz clic en cualquier palabra para copiarla al portapapeles.
              </span>
              <button
                type="button"
                onClick={() =>
                  downloadTxt(
                    `930text-rimas-${rhymeWord}.txt`,
                    `DICCIONARIO DE RIMAS 930TEXT · PALABRA: ${rhymeWord.toUpperCase()}\n=======================================================\n\n` +
                      rhymeResults.map(r => `• ${r.word} (${r.syllables} sílabas, ${r.category})`).join('\n')
                  )
                }
                className="h-8 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Descargar Rimas (.TXT)
              </button>
            </div>
          </article>

          {/* Right Column: Stanza Analyzer, Meter & Freestyle */}
          <article className="lg:col-span-5 p-4 sm:p-6 rounded-[22px] sm:rounded-[26px] studio-console flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="font-display text-base sm:text-lg font-extrabold">
                  2. Analizador de Estrofas, Métrica & Freestyle
                </h3>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSchemeMode('consonante')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                      schemeMode === 'consonante'
                        ? 'border-[var(--brand)] bg-[var(--brand-soft)] text-[var(--brand)]'
                        : 'border-[var(--line)] text-[var(--muted)]'
                    }`}
                  >
                    Consonante
                  </button>
                  <button
                    type="button"
                    onClick={() => setSchemeMode('asonante')}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition ${
                      schemeMode === 'asonante'
                        ? 'border-[var(--brand2)] bg-[var(--brand2)]/15 text-[var(--brand2)]'
                        : 'border-[var(--line)] text-[var(--muted)]'
                    }`}
                  >
                    Asonante
                  </button>
                </div>
              </div>

              {/* Stanza Textarea */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[var(--muted)]">
                  Escribe tu verso o estrofa para analizar patrón de rima y silabeo:
                </label>
                <textarea
                  value={schemeInput}
                  onChange={e => setSchemeInput(e.target.value)}
                  maxLength={LIMITS.RIMAS_ESTROFAS}
                  rows={4}
                  placeholder="Pega aquí tus 4 versos para detectar esquema AABB, ABAB o ABBA…"
                  className="w-full p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-mono text-[var(--text)] leading-relaxed"
                />
              </div>

              {/* Scheme Analysis Summary Banner */}
              <div className="mt-3 p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/80 flex items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[var(--muted)] block">
                    Esquema Detectado
                  </span>
                  <strong className="text-sm font-extrabold text-[var(--brand2)] font-mono">
                    {schemeResult.letters.join('') || '—'} ({schemeResult.stanzaPatternName || 'Libre'})
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-[var(--muted)] block">
                    Coherencia Rítmica
                  </span>
                  <strong className="text-xs font-bold text-[var(--green)]">
                    {schemeResult.rows.filter(r => r.letter !== '-').length} rimas pareadas
                  </strong>
                </div>
              </div>

              {/* Verse Selector for Metric Scanner */}
              <div className="mt-3 space-y-2">
                <span className="block text-xs font-bold text-[var(--muted)]">
                  Cómputo métrico verso a verso:
                </span>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {schemeInput
                    .split(/\r?\n/)
                    .map(l => l.trim())
                    .filter(Boolean)
                    .map((line, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedVerseIdx(idx)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-mono border whitespace-nowrap shrink-0 transition ${
                          selectedVerseIdx === idx
                            ? 'border-[var(--brand2)] bg-[var(--brand2)]/20 text-[var(--brand2)] font-bold'
                            : 'border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)]'
                        }`}
                      >
                        V{idx + 1}
                      </button>
                    ))}
                </div>

                {/* Meter Detail Card */}
                <div className="p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/70 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-[var(--text)] font-mono">
                      «{activeVerseLine}»
                    </span>
                    <strong className="text-xs font-mono font-extrabold text-[var(--gold)]">
                      {meterResult.metricSyllables} SÍLABAS MÉTRICAS ({meterResult.artType})
                    </strong>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-[var(--muted)]">
                    <span>Sílabas gramaticales: {meterResult.phoneticSyllables + meterResult.sinalefas}</span>
                    <span>·</span>
                    <span>Sinalefas: {meterResult.sinalefas}</span>
                    <span>·</span>
                    <span>Palabra final: {meterResult.endingWord} ({meterResult.stressType})</span>
                  </div>
                </div>
              </div>

              {/* Freestyle Workshop Card */}
              <div className="mt-3 p-3.5 rounded-2xl border border-[var(--line)] bg-gradient-to-r from-[var(--surface2)] to-[var(--brand-soft)]/20 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-xs font-extrabold text-[var(--brand2)]">
                    🔥 Desafío de Freestyle (#{currentPrompt.theme})
                  </strong>
                  <button
                    type="button"
                    onClick={() => setFreestyleIdx(prev => prev + 1)}
                    className="h-6 px-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[10px] font-extrabold hover:border-[var(--brand2)] inline-flex items-center gap-1"
                  >
                    <Shuffle className="w-2.5 h-2.5" /> Siguiente
                  </button>
                </div>
                <p className="text-xs text-[var(--text)] leading-snug">
                  «{currentPrompt.opener}»
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-[var(--muted)]">Meter en tu patrón:</span>
                  {currentPrompt.words.map(w => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setRhymeWord(w)}
                      className="px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[10px] font-extrabold text-[var(--gold)] hover:border-[var(--gold)]"
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Song Structure Blueprint */}
              <div className="mt-3 p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/80 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-xs font-extrabold text-[var(--text)]">
                    🎵 Song Blueprint ({songStyle.toUpperCase()})
                  </strong>
                  <div className="flex gap-1">
                    {(['urbano', 'pop', 'balada', 'epico'] as const).map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setSongStyle(st)}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold capitalize transition ${
                          songStyle === st
                            ? 'bg-[var(--brand)] text-white'
                            : 'bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)]'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-[11px] font-mono text-[var(--muted)] whitespace-pre-wrap max-h-36 overflow-y-auto p-2 rounded-lg bg-[var(--surface)] border border-[var(--line)]">
                  {songBlueprint}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-[var(--line)] flex flex-wrap gap-2 items-center justify-between">
              <button
                type="button"
                onClick={() => copyText(schemeInput, 'Estrofa copiada al portapapeles')}
                className="h-8 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" /> Copiar Estrofa
              </button>
              {sendToTool && (
                <button
                  type="button"
                  onClick={() => sendToTool('fuente', schemeInput)}
                  className="h-8 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand2)] inline-flex items-center"
                >
                  A Fuentes Unicode →
                </button>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
