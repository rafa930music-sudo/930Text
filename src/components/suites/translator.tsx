import React, { useState } from 'react';
import {
  WORLD_LANGUAGES,
  getLanguageByCode,
  performTranslation
} from '../../utils/translatorTools';
import { LIMITS } from '../../config/limits';
import { CATALOG } from '../../config/catalog';
import { SUITE_PRESETS } from '../../utils/suitePresets';
import {
  ArrowLeftRight,
  Download,
  Bookmark,
  ClipboardPaste,
  Wand2,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  QrCode,
  Image as ImageIcon,
  Search
} from 'lucide-react';

export interface TranslatorSuiteProps {
  input?: string;
  onInputChange?: (val: string) => void;
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  saveToHistory?: (title: string, input: string, output: string) => void;
  openQrTransfer?: (title: string, content: string) => void;
  openSocialCardModal?: (text: string, subtitle: string) => void;
  printFormattedReport?: (title: string, text: string, subtitle?: string) => void;
  sendToTool?: (toolId: string, text: string) => void;
  addToast?: (msg: string) => void;
  pasteFromClipboard?: (setter: (val: string) => void) => void;
  sampleText?: string;
}

export const TranslatorSuite: React.FC<TranslatorSuiteProps> = ({
  input: controlledInput,
  onInputChange,
  copyText,
  downloadTxt,
  saveToHistory,
  openQrTransfer,
  openSocialCardModal,
  printFormattedReport,
  sendToTool,
  addToast,
  pasteFromClipboard,
  sampleText = 'Hola equipo, aquí adjunto el borrador del informe estratégico para su revisión antes de la reunión de mañana.'
}) => {
  const [internalInput, setInternalInput] = useState(
    'Hola equipo, aquí adjunto el borrador del informe estratégico para su revisión antes de la reunión de mañana.'
  );
  const transInput = controlledInput !== undefined ? controlledInput : internalInput;

  const setTransInput = (val: string) => {
    if (onInputChange) onInputChange(val);
    setInternalInput(val);
  };

  const [transOutput, setTransOutput] = useState('');
  const [transFrom, setTransFrom] = useState('es');
  const [transTo, setTransTo] = useState('en');
  const [transLoading, setTransLoading] = useState(false);
  const [transStatus, setTransStatus] = useState<{ msg: string; type: string }>({
    msg: '',
    type: ''
  });
  const [ttsRate, setTtsRate] = useState(1);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Modals for language selection
  const [isFromModalOpen, setIsFromModalOpen] = useState(false);
  const [isToModalOpen, setIsToModalOpen] = useState(false);
  const [modalQuery, setModalQuery] = useState('');

  const handleTranslate = async () => {
    try {
      setTransLoading(true);
      setTransStatus({ msg: 'Traduciendo…', type: '' });
      const result = await performTranslation(transInput, transFrom, transTo);
      setTransOutput(result);
      setTransStatus({ msg: 'Traducción completada al detalle.', type: 'ok' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error en la traducción';
      setTransStatus({ msg, type: 'error' });
    } finally {
      setTransLoading(false);
    }
  };

  const speakText = (text: string, langCode: string) => {
    if (!text.trim()) return;
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      utterance.rate = ttsRate;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    } else if (addToast) {
      addToast('Tu navegador no soporta síntesis de voz (TTS).');
    }
  };

  const filteredLanguages = WORLD_LANGUAGES.filter(
    l =>
      l.name.toLowerCase().includes(modalQuery.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(modalQuery.toLowerCase()) ||
      l.code.toLowerCase().includes(modalQuery.toLowerCase())
  );

  return (
    <section id="traductor" className="py-10 sm:py-16 border-t border-[var(--line)] bg-[var(--surface)]/35">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <span className="section-number">
          SUITE 02 · TRADUCTOR UNIVERSAL ({WORLD_LANGUAGES.length}+ IDIOMAS & VOZ NEURAL)
        </span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-balance mt-1">
          Traductor Multilingüe Universal ({WORLD_LANGUAGES.length}+ Idiomas)
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[var(--muted)] max-w-3xl">
          Traduce al instante entre más de 105 idiomas del mundo con lectura por voz (TTS) y descarga bilingüe espejo.
        </p>

        <div className="mt-5 sm:mt-6 rounded-[22px] sm:rounded-[28px] studio-console overflow-hidden">
          <div className="px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-[var(--line)] bg-[var(--surface2)]/90 space-y-3">
            {/* Active Translation Pair Visualization Banner */}
            <div className="flex items-center justify-between bg-[var(--surface)] border border-[var(--line)] rounded-2xl px-4 py-2.5 shadow-xs">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-lg">{getLanguageByCode(transFrom).flag}</span>
                <div className="min-w-0 truncate">
                  <span className="text-[10px] uppercase font-mono font-bold text-[var(--muted)] block">
                    Origen
                  </span>
                  <strong className="text-xs sm:text-sm font-extrabold text-[var(--text)] truncate block">
                    {getLanguageByCode(transFrom).name}
                  </strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  const tmpFrom = transFrom;
                  const tmpTo = transTo;
                  setTransFrom(tmpTo);
                  setTransTo(tmpFrom);
                  const tmpIn = transInput;
                  setTransInput(transOutput);
                  setTransOutput(tmpIn);
                }}
                title="Intercambiar idiomas"
                aria-label="Intercambiar idiomas"
                className="w-9 h-9 rounded-xl grid place-items-center border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-[var(--brand2)] hover:scale-105 active:scale-95 transition shrink-0 mx-2"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 min-w-0 text-right">
                <div className="min-w-0 truncate">
                  <span className="text-[10px] uppercase font-mono font-bold text-[var(--muted)] block">
                    Destino
                  </span>
                  <strong className="text-xs sm:text-sm font-extrabold text-[var(--text)] truncate block">
                    {getLanguageByCode(transTo).name}
                  </strong>
                </div>
                <span className="text-lg">{getLanguageByCode(transTo).flag}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setModalQuery('');
                    setIsFromModalOpen(true);
                  }}
                  className="flex-1 sm:flex-none h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-extrabold text-[var(--text)] hover:border-[var(--brand)] inline-flex items-center justify-between gap-3 transition"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span>{getLanguageByCode(transFrom).flag}</span>
                    <span className="truncate">De: {getLanguageByCode(transFrom).name}</span>
                  </span>
                  <Search className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setModalQuery('');
                    setIsToModalOpen(true);
                  }}
                  className="flex-1 sm:flex-none h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-extrabold text-[var(--text)] hover:border-[var(--brand)] inline-flex items-center justify-between gap-3 transition"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span>{getLanguageByCode(transTo).flag}</span>
                    <span className="truncate">A: {getLanguageByCode(transTo).name}</span>
                  </span>
                  <Search className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" />
                </button>

                <select
                  aria-label="Velocidad de lectura por voz"
                  value={ttsRate}
                  onChange={e => setTtsRate(Number(e.target.value))}
                  className="h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold shrink-0"
                >
                  <option value={0.8}>Voz 0.8x</option>
                  <option value={1}>Voz 1.0x</option>
                  <option value={1.2}>Voz 1.2x</option>
                </select>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    downloadTxt(
                      `traduccion-${transFrom}-${transTo}.txt`,
                      `${transInput}\n\n---\n\n${transOutput}`
                    )
                  }
                  className="h-9 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> Bilingüe TXT
                </button>
                {saveToHistory && (
                  <button
                    type="button"
                    onClick={() =>
                      saveToHistory(
                        `Traducción (${getLanguageByCode(transFrom).flag} → ${getLanguageByCode(transTo).flag})`,
                        transInput,
                        transOutput
                      )
                    }
                    className="h-9 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Bookmark className="w-3.5 h-3.5 shrink-0" /> Guardar
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const srcLines = (transInput || 'Hola equipo, revisamos objetivos.')
                      .split(/(?<=[.!?])\s+|\n+/)
                      .filter(Boolean);
                    const dstLines = (transOutput || 'Hello team, we review goals.')
                      .split(/(?<=[.!?])\s+|\n+/)
                      .filter(Boolean);
                    const max = Math.max(srcLines.length, dstLines.length);
                    const rows: string[] = [];
                    const fromName = getLanguageByCode(transFrom).name;
                    const toName = getLanguageByCode(transTo).name;
                    const fromFlag = getLanguageByCode(transFrom).flag;
                    const toFlag = getLanguageByCode(transTo).flag;
                    for (let i = 0; i < max; i++) {
                      rows.push(
                        `[${i + 1}] ORIGINAL (${fromFlag} ${fromName}): ${srcLines[i] || '—'}\n    TRADUCCIÓN (${toFlag} ${toName}): ${dstLines[i] || '—'}`
                      );
                    }
                    downloadTxt(
                      `930text-espejo-bilingue-${transFrom}-${transTo}.txt`,
                      `DOSSIER BILINGÜE ESPEJO FRASE A FRASE · 930TEXT\n=================================================\nIdiomas: ${fromFlag} ${fromName} → ${toFlag} ${toName}\n\n${rows.join('\n\n')}`
                    );
                  }}
                  className="h-9 px-3.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> Espejo Bilingüe
                </button>
              </div>
            </div>

            {/* Quick 1-Click Target Language Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-[var(--line)]/60">
              <span className="text-[11px] font-extrabold text-[var(--muted)] whitespace-nowrap shrink-0">
                Traducir en 1 clic a:
              </span>
              {[
                ['en', '🇬🇧 Inglés'],
                ['es', '🇪🇸 Español'],
                ['fr', '🇫🇷 Francés'],
                ['de', '🇩🇪 Alemán'],
                ['pt', '🇵🇹 Portugués'],
                ['it', '🇮🇹 Italiano'],
                ['ca', '🟡🔴 Catalán'],
                ['gl', '⚪🔵 Gallego'],
                ['eu', '🟢🔴 Euskera'],
                ['zh-CN', '🇨🇳 Chino'],
                ['ja', '🇯🇵 Japonés'],
                ['ko', '🇰🇷 Coreano'],
                ['ar', '🇸🇦 Árabe'],
                ['ru', '🇷🇺 Ruso'],
                ['hi', '🇮🇳 Hindi'],
                ['nl', '🇳🇱 Holandés'],
                ['pl', '🇵🇱 Polaco'],
                ['sv', '🇸🇪 Sueco'],
                ['tr', '🇹🇷 Turco'],
                ['el', '🇬🇷 Griego'],
                ['la', '🏛️ Latín']
              ].map(([code, label]) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => {
                    if (transFrom === code) {
                      setTransFrom(transTo);
                    }
                    setTransTo(code);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition whitespace-nowrap shrink-0 ${
                    transTo === code
                      ? 'border-[var(--brand2)] bg-[var(--brand2)]/15 text-[var(--brand2)]'
                      : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-[var(--muted)]">
                  Texto original ({getLanguageByCode(transFrom).flag} {getLanguageByCode(transFrom).name})
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {pasteFromClipboard && (
                    <button
                      type="button"
                      onClick={() => pasteFromClipboard(setTransInput)}
                      className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                    >
                      <ClipboardPaste className="w-3 h-3 text-[var(--brand2)] shrink-0" /> Pegar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setTransInput(sampleText)}
                    className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--gold)] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                  >
                    <Wand2 className="w-3 h-3 text-[var(--gold)] shrink-0" /> Ejemplo
                  </button>
                  <span className="text-xs text-[var(--muted)] tabular-nums">
                    {transInput.length} / {LIMITS.GLOBAL_MAX}
                  </span>
                </div>
              </div>
              <textarea
                value={transInput}
                onChange={e => setTransInput(e.target.value)}
                maxLength={LIMITS.GLOBAL_MAX}
                rows={5}
                placeholder={`Escribe o pega tu texto para traducir a cualquiera de los ${CATALOG.LANGUAGES_LABEL} disponibles…`}
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--text)] resize-y"
              />

              {/* Presets 1-clic */}
              <div className="mt-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[10px] font-extrabold text-[var(--gold)] shrink-0 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Ejemplos:
                </span>
                {SUITE_PRESETS.traductor?.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setTransInput(p.text);
                      if (addToast) addToast(`Cargado: ${p.label}`);
                    }}
                    className="h-6 px-2 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[10px] font-bold text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--brand2)] transition whitespace-nowrap shrink-0"
                  >
                    <span className="text-[9px] text-[var(--brand2)] mr-1">[{p.badge}]</span>
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={transLoading}
                  onClick={handleTranslate}
                  className="h-10 px-5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] disabled:opacity-50 inline-flex items-center justify-center whitespace-nowrap shrink-0 shadow-sm"
                >
                  {transLoading ? 'Traduciendo…' : 'Traducir ahora'}
                </button>
                <button
                  type="button"
                  onClick={() => speakText(transInput, transFrom)}
                  className={`h-10 px-3.5 rounded-xl border text-xs font-bold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition ${
                    isSpeaking
                      ? 'border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]'
                      : 'border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand2)]'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span className="inline-flex items-center gap-0.5 mx-1">
                        <span className="soundwave-bar" />
                        <span className="soundwave-bar" />
                        <span className="soundwave-bar" />
                      </span>
                      <span>Detener</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 shrink-0" /> Escuchar
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTransInput('');
                    setTransOutput('');
                    setTransStatus({ msg: '', type: '' });
                  }}
                  className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold inline-flex items-center justify-center whitespace-nowrap shrink-0"
                >
                  Limpiar
                </button>
              </div>
              {transStatus.msg && (
                <p
                  role="status"
                  className={`mt-3 text-xs font-bold ${
                    transStatus.type === 'ok'
                      ? 'text-[var(--green)]'
                      : transStatus.type === 'error'
                        ? 'text-[var(--danger)]'
                        : 'text-[var(--muted)]'
                  }`}
                >
                  {transStatus.msg}
                </p>
              )}
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[var(--muted)]">
                  Traducción ({getLanguageByCode(transTo).flag} {getLanguageByCode(transTo).name})
                </span>
                <span className="text-xs text-[var(--muted)]">Salida</span>
              </div>
              <textarea
                value={transOutput}
                readOnly
                rows={5}
                placeholder="Aquí aparecerá la traducción…"
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/60 text-[var(--text)] resize-y"
              />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyText(transOutput, 'Traducción copiada')}
                  className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 shrink-0" /> Copiar traducción
                </button>
                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      `[ORIGINAL · ${getLanguageByCode(transFrom).name.toUpperCase()}]:\n${transInput}\n\n[TRADUCCIÓN · ${getLanguageByCode(transTo).name.toUpperCase()}]:\n${transOutput}`,
                      'Texto bilingüe copiado al portapapeles'
                    )
                  }
                  className="h-10 px-3.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 shrink-0" /> Copiar Bilingüe
                </button>
                {openQrTransfer && (
                  <button
                    type="button"
                    onClick={() =>
                      openQrTransfer(
                        `Traducción (${getLanguageByCode(transTo).name})`,
                        transOutput
                      )
                    }
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold text-[var(--brand2)] hover:border-[var(--brand2)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <QrCode className="w-3.5 h-3.5" /> QR al Móvil
                  </button>
                )}
                {openSocialCardModal && (
                  <button
                    type="button"
                    onClick={() =>
                      openSocialCardModal(
                        transOutput,
                        `930Text · ${getLanguageByCode(transTo).name}`
                      )
                    }
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold text-fuchsia-400 hover:border-fuchsia-400 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Tarjeta PNG
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => speakText(transOutput, transTo)}
                  className={`h-10 px-3.5 rounded-xl border text-xs font-bold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition ${
                    isSpeaking
                      ? 'border-[var(--danger)] bg-[var(--danger)]/10 text-[var(--danger)]'
                      : 'border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand2)]'
                  }`}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span className="inline-flex items-center gap-0.5 mx-1">
                        <span className="soundwave-bar" />
                        <span className="soundwave-bar" />
                        <span className="soundwave-bar" />
                      </span>
                      <span>Detener</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 shrink-0" /> Escuchar
                    </>
                  )}
                </button>
                {printFormattedReport && (
                  <button
                    type="button"
                    onClick={() =>
                      printFormattedReport(
                        'Traducción Bilingüe 930Text',
                        `[ORIGINAL · ${getLanguageByCode(transFrom).name.toUpperCase()}]:\n${transInput}\n\n[TRADUCCIÓN · ${getLanguageByCode(transTo).name.toUpperCase()}]:\n${transOutput}`,
                        `${getLanguageByCode(transFrom).name} ⇄ ${getLanguageByCode(transTo).name}`
                      )
                    }
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand2)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-rose-500 shrink-0" /> Exportar PDF
                  </button>
                )}
                {sendToTool && (
                  <>
                    <button
                      type="button"
                      onClick={() => sendToTool('fuente', transOutput)}
                      className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center whitespace-nowrap shrink-0"
                    >
                      A Fuentes →
                    </button>
                    <button
                      type="button"
                      onClick={() => sendToTool('rimar', transOutput)}
                      className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand2)] inline-flex items-center justify-center whitespace-nowrap shrink-0"
                    >
                      A Rimar →
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Language Picker Modal - From */}
      {isFromModalOpen && (
        <div
          onClick={() => setIsFromModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl studio-console p-5 space-y-4 max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <strong className="text-base font-extrabold">Idioma de origen</strong>
              <button
                type="button"
                onClick={() => setIsFromModalOpen(false)}
                className="w-8 h-8 rounded-lg grid place-items-center border border-[var(--line)] text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-2 bg-[var(--surface2)] rounded-xl flex items-center gap-2 border border-[var(--line)]">
              <Search className="w-4 h-4 text-[var(--muted)]" />
              <input
                type="text"
                autoFocus
                value={modalQuery}
                onChange={e => setModalQuery(e.target.value)}
                placeholder="Buscar idioma (ej. Inglés, Catalán, Japanese)…"
                className="w-full bg-transparent border-0 outline-none text-xs font-semibold"
              />
            </div>
            <div className="overflow-y-auto flex-1 grid grid-cols-2 gap-2 p-1">
              {filteredLanguages.map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setTransFrom(l.code);
                    setIsFromModalOpen(false);
                  }}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition ${
                    transFrom === l.code
                      ? 'border-[var(--brand)] bg-[var(--brand-soft)] font-bold'
                      : 'border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand2)]'
                  }`}
                >
                  <span className="text-lg">{l.flag}</span>
                  <div className="min-w-0 truncate">
                    <span className="text-xs truncate block">{l.name}</span>
                    <span className="text-[10px] text-[var(--muted)] truncate block">
                      {l.nativeName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Language Picker Modal - To */}
      {isToModalOpen && (
        <div
          onClick={() => setIsToModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-4"
        >
          <div
            onClick={e => e.stopPropagation()}
            className="w-full max-w-lg rounded-3xl studio-console p-5 space-y-4 max-h-[80vh] flex flex-col"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <strong className="text-base font-extrabold">Idioma de destino</strong>
              <button
                type="button"
                onClick={() => setIsToModalOpen(false)}
                className="w-8 h-8 rounded-lg grid place-items-center border border-[var(--line)] text-xs font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-2 bg-[var(--surface2)] rounded-xl flex items-center gap-2 border border-[var(--line)]">
              <Search className="w-4 h-4 text-[var(--muted)]" />
              <input
                type="text"
                autoFocus
                value={modalQuery}
                onChange={e => setModalQuery(e.target.value)}
                placeholder="Buscar idioma (ej. Alemán, Chino, Euskera)…"
                className="w-full bg-transparent border-0 outline-none text-xs font-semibold"
              />
            </div>
            <div className="overflow-y-auto flex-1 grid grid-cols-2 gap-2 p-1">
              {filteredLanguages.map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setTransTo(l.code);
                    setIsToModalOpen(false);
                  }}
                  className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition ${
                    transTo === l.code
                      ? 'border-[var(--brand2)] bg-[var(--brand2)]/15 font-bold'
                      : 'border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand)]'
                  }`}
                >
                  <span className="text-lg">{l.flag}</span>
                  <div className="min-w-0 truncate">
                    <span className="text-xs truncate block">{l.name}</span>
                    <span className="text-[10px] text-[var(--muted)] truncate block">
                      {l.nativeName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
