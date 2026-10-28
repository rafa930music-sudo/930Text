import React, { useState, useMemo, useEffect } from 'react';
import {
  summarizeTextDetailed,
  SummaryFormat,
  SummaryDetailedResult
} from '../../utils/textTools';
import { LIMITS } from '../../config/limits';
import { SUITE_PRESETS } from '../../utils/suitePresets';
import {
  Download,
  Bookmark,
  Share2,
  ClipboardPaste,
  Mic,
  Wand2,
  Sparkles,
  Copy,
  QrCode,
  Image as ImageIcon,
  Volume2
} from 'lucide-react';

export interface ResumidorSuiteProps {
  input?: string;
  onInputChange?: (val: string) => void;
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  printFormattedReport?: (title: string, text: string, subtitle?: string) => void;
  encodeWorkspaceShareHash?: (suiteId: string, text: string) => string;
  saveToHistory?: (title: string, input: string, output: string) => void;
  startVoiceDictation?: (target: string, setter: (val: string) => void) => void;
  dictatingTarget?: string | null;
  pasteFromClipboard?: (setter: (val: string) => void) => void;
  sampleText?: string;
  openQrTransfer?: (title: string, content: string) => void;
  openSocialCardModal?: (text: string, subtitle: string) => void;
  speakText?: (text: string, lang: string) => void;
  sendToTool?: (toolId: string, text: string) => void;
  addToast?: (msg: string) => void;
  handleFileUpload?: (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string) => void,
    maxLen?: number
  ) => void;
}

export const ResumidorSuite: React.FC<ResumidorSuiteProps> = ({
  input: controlledInput,
  onInputChange,
  copyText,
  downloadTxt,
  printFormattedReport,
  encodeWorkspaceShareHash,
  saveToHistory,
  startVoiceDictation,
  dictatingTarget,
  pasteFromClipboard,
  sampleText = 'Las herramientas lingüísticas de procesamiento de texto y maquetación digital están transformando radicalmente la productividad profesional. Al eliminar la dependencia de servidores externos, los usuarios disfrutan de privacidad absoluta, ejecución instantánea sin latencia de red y cero costes recurrentes.',
  openQrTransfer,
  openSocialCardModal,
  speakText,
  sendToTool,
  addToast,
  handleFileUpload
}) => {
  const [internalInput, setInternalInput] = useState(sampleText);
  const sumInput = controlledInput !== undefined ? controlledInput : internalInput;

  const setSumInput = (val: string) => {
    if (onInputChange) onInputChange(val);
    setInternalInput(val);
  };

  const [sumLength, setSumLength] = useState<number>(5);
  const [sumFormat, setSumFormat] = useState<SummaryFormat>('executive');
  const [sumFocusKeyword, setSumFocusKeyword] = useState<string>('');
  const [sumOutput, setSumOutput] = useState<string>('');
  const [sumDetails, setSumDetails] = useState<SummaryDetailedResult | null>(null);
  const [sumStatus, setSumStatus] = useState<{ msg: string; type: string }>({
    msg: '',
    type: ''
  });

  const handleSummarize = (overrideText?: string) => {
    const textToProcess = overrideText !== undefined ? overrideText : sumInput;
    if (!textToProcess.trim()) {
      setSumStatus({ msg: 'Pega un texto para resumir.', type: 'error' });
      setSumOutput('');
      setSumDetails(null);
      return;
    }
    const res = summarizeTextDetailed(
      textToProcess,
      sumLength,
      sumFormat,
      sumFocusKeyword
    );
    setSumOutput(res.output);
    setSumDetails(res);
    setSumStatus({ msg: 'Resumen generado en tiempo real.', type: 'ok' });
  };

  useEffect(() => {
    handleSummarize();
  }, [sumInput, sumLength, sumFormat, sumFocusKeyword]);

  return (
    <section id="resumidor" className="py-10 sm:py-16 border-t border-[var(--line)]">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <span className="section-number">SUITE 03 · SÍNTESIS INTELIGENTE, APUNTES & EJECUTIVOS</span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-balance mt-1">
          Resumidor y Sintetizador Pro al Detalle
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[var(--muted)] max-w-2xl">
          6 modos de síntesis en vivo (*Ficha Ejecutiva con Cifras, Viñetas Temáticas, Párrafo Continuo, Test de Examen, Plan de Acción y Hilo Social*) con compresión de relleno, anti-redundancia y filtro por palabra foco.
        </p>

        <div className="mt-5 sm:mt-6 rounded-[22px] sm:rounded-[28px] studio-console overflow-hidden">
          <div className="px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-[var(--line)] bg-[var(--surface2)]/90 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
              <div className="grid grid-cols-2 sm:flex items-center gap-2 flex-wrap w-full lg:w-auto">
                <select
                  aria-label="Longitud del resumen"
                  value={sumLength}
                  onChange={e => setSumLength(Number(e.target.value))}
                  className="h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold w-full sm:w-auto"
                >
                  <option value={2}>Ultracorto · 2 ideas</option>
                  <option value={3}>Corto · 3 ideas</option>
                  <option value={5}>Equilibrado · 5 ideas</option>
                  <option value={7}>Detallado · 7 ideas</option>
                  <option value={10}>Completo · 10 ideas</option>
                </select>
                <select
                  aria-label="Formato del resumen"
                  value={sumFormat}
                  onChange={e => setSumFormat(e.target.value as SummaryFormat)}
                  className="h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold w-full sm:w-auto"
                >
                  <option value="executive">📌 Ficha ejecutiva + datos + conclusión</option>
                  <option value="bullets">• Viñetas temáticas de estudio</option>
                  <option value="paragraph">¶ Párrafo fluido sintetizado</option>
                  <option value="studyQuestions">❓ Preguntas y respuestas de examen</option>
                  <option value="actionPlan">⚡ Plan de acción paso a paso</option>
                  <option value="socialThread">🧵 Hilo numerado para redes (1/N)</option>
                </select>
                <input
                  type="text"
                  value={sumFocusKeyword}
                  onChange={e => setSumFocusKeyword(e.target.value)}
                  placeholder="Filtrar por tema o palabra…"
                  className="col-span-2 sm:col-span-1 h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-semibold w-full sm:w-48"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => downloadTxt('930text-resumen.txt', sumOutput)}
                  className="flex-1 sm:flex-none justify-center h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> TXT
                </button>
                {printFormattedReport && (
                  <button
                    type="button"
                    onClick={() =>
                      printFormattedReport(
                        'Resumen Ejecutivo 930Text',
                        sumOutput,
                        `Formato: ${sumFormat.toUpperCase()} · 930Text`
                      )
                    }
                    className="hidden sm:inline-flex justify-center h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-rose-500 items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-rose-500" /> Exportar PDF
                  </button>
                )}
                {encodeWorkspaceShareHash && (
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        encodeWorkspaceShareHash('resumidor', sumInput),
                        'Enlace directo con este texto copiado al portapapeles'
                      )
                    }
                    title="Copiar enlace directo con este texto cargado"
                    className="hidden sm:inline-flex justify-center h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand2)] items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[var(--brand2)]" /> Enlace
                  </button>
                )}
                {saveToHistory && (
                  <button
                    type="button"
                    onClick={() => saveToHistory('Resumen Pro', sumInput, sumOutput)}
                    className="flex-1 sm:flex-none justify-center h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center gap-1.5"
                  >
                    <Bookmark className="w-3.5 h-3.5" /> Guardar
                  </button>
                )}
              </div>
            </div>

            {/* Interactive Concept Pills to Focus Summary in 1 Click */}
            {sumDetails && sumDetails.topKeywords.length > 0 && (
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-[var(--line)]/60">
                <span className="text-[11px] font-extrabold text-[var(--muted)] shrink-0">
                  Priorizar tema en 1 clic:
                </span>
                {sumFocusKeyword && (
                  <button
                    type="button"
                    onClick={() => setSumFocusKeyword('')}
                    className="px-2 py-0.5 rounded-lg text-[11px] font-extrabold bg-[var(--danger)]/15 text-[var(--danger)] border border-[var(--danger)]/30 shrink-0"
                  >
                    × Quitar filtro ({sumFocusKeyword})
                  </button>
                )}
                {sumDetails.topKeywords.map(kw => {
                  const active = sumFocusKeyword.toLowerCase() === kw.toLowerCase();
                  return (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => setSumFocusKeyword(active ? '' : kw)}
                      className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold border transition whitespace-nowrap shrink-0 ${
                        active
                          ? 'border-[var(--brand2)] bg-[var(--brand2)]/15 text-[var(--brand2)]'
                          : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      #{kw}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-[var(--muted)]">
                  Documento, temario o artículo
                </span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {handleFileUpload && (
                    <label className="cursor-pointer h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--brand)] inline-flex items-center gap-1">
                      <span>Subir .TXT/.MD</span>
                      <input
                        type="file"
                        accept=".txt,.md,.csv,.html,.json,.srt"
                        onChange={e => handleFileUpload(e, setSumInput, 20000)}
                        className="hidden"
                      />
                    </label>
                  )}
                  {startVoiceDictation && (
                    <button
                      type="button"
                      onClick={() => startVoiceDictation('sum', setSumInput)}
                      className={`h-7 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition ${
                        dictatingTarget === 'sum'
                          ? 'border-[var(--danger)] bg-[var(--danger)]/15 text-[var(--danger)]'
                          : 'border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand2)]'
                      }`}
                    >
                      <Mic className="w-3 h-3 text-[var(--brand2)]" />{' '}
                      {dictatingTarget === 'sum' ? 'Escuchando…' : 'Dictar'}
                    </button>
                  )}
                  {pasteFromClipboard && (
                    <button
                      type="button"
                      onClick={() => pasteFromClipboard(setSumInput)}
                      className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1"
                    >
                      <ClipboardPaste className="w-3 h-3 text-[var(--brand2)]" /> Pegar
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSumInput(sampleText);
                      handleSummarize(sampleText);
                    }}
                    className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--gold)] inline-flex items-center gap-1"
                  >
                    <Wand2 className="w-3 h-3 text-[var(--gold)]" /> Ejemplo
                  </button>
                  <span className="text-xs text-[var(--muted)] tabular-nums">
                    {sumInput.length} / {LIMITS.GLOBAL_MAX}
                  </span>
                </div>
              </div>
              <textarea
                value={sumInput}
                onChange={e => setSumInput(e.target.value)}
                maxLength={LIMITS.GLOBAL_MAX}
                rows={9}
                placeholder="Pega un artículo, apuntes de clase, contrato o informe extenso…"
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--text)] resize-y leading-relaxed"
              />

              {/* Presets 1-clic */}
              <div className="mt-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[10px] font-extrabold text-[var(--gold)] shrink-0 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Ejemplos:
                </span>
                {SUITE_PRESETS.resumidor?.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setSumInput(p.text);
                      handleSummarize(p.text);
                      if (addToast) addToast(`Cargado: ${p.label}`);
                    }}
                    className="h-6 px-2 rounded-md border border-[var(--line)] bg-[var(--surface)] text-[10px] font-bold text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--brand2)] transition whitespace-nowrap shrink-0"
                  >
                    <span className="text-[9px] text-[var(--brand2)] mr-1">[{p.badge}]</span>
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleSummarize()}
                  className="h-10 px-5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] inline-flex items-center justify-center whitespace-nowrap shrink-0"
                >
                  Actualizar resumen al detalle
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSumInput('');
                    setSumOutput('');
                    setSumDetails(null);
                    setSumFocusKeyword('');
                    setSumStatus({ msg: '', type: '' });
                  }}
                  className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold inline-flex items-center justify-center whitespace-nowrap shrink-0"
                >
                  Limpiar
                </button>
              </div>
              {sumStatus.msg && (
                <p
                  role="status"
                  className={`mt-3 text-xs font-bold ${
                    sumStatus.type === 'ok' ? 'text-[var(--green)]' : 'text-[var(--danger)]'
                  }`}
                >
                  {sumStatus.msg}
                </p>
              )}
            </div>

            <div className="p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold text-[var(--muted)]">
                    Síntesis generada en vivo
                  </span>
                  {sumDetails ? (
                    <div className="flex items-center gap-2 text-[11px] font-bold">
                      <span className="text-[var(--muted)] tabular-nums">
                        {sumDetails.originalWords} →{' '}
                        <strong className="text-[var(--text)]">
                          {sumDetails.summaryWords} pal.
                        </strong>
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[var(--green-soft)] text-[var(--green)] tabular-nums">
                        -{sumDetails.savedPercentage}% ahorro
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-[var(--muted)]">0 palabras</span>
                  )}
                </div>

                <textarea
                  value={sumOutput}
                  readOnly
                  rows={9}
                  placeholder="Tu síntesis detallada aparecerá aquí automáticamente…"
                  className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/60 text-[var(--text)] resize-y leading-relaxed"
                />

                {/* Diagnostic Metadata Bar: Key Figures & Key Entities */}
                {sumDetails &&
                  (sumDetails.keyFigures.length > 0 || sumDetails.keyEntities.length > 0) && (
                    <div className="mt-3 p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)]/60 space-y-1.5 text-xs">
                      {sumDetails.keyFigures.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-extrabold text-[var(--gold)]">
                            📊 Cifras clave:
                          </span>
                          <span className="text-[var(--text)] font-mono text-[11px]">
                            {sumDetails.keyFigures.join(' · ')}
                          </span>
                        </div>
                      )}
                      {sumDetails.keyEntities.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="font-extrabold text-[var(--brand2)]">
                            🏛️ Entidades/Nombres:
                          </span>
                          <span className="text-[var(--text)] font-semibold text-[11px]">
                            {sumDetails.keyEntities.join(' · ')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copyText(sumOutput, 'Resumen copiado')}
                  className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 shrink-0" /> Copiar resumen
                </button>
                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      sumOutput
                        .split('\n')
                        .map(l =>
                          l.trim().startsWith('•') || l.trim().startsWith('-') ? l : `*${l}*`
                        )
                        .join('\n'),
                      'Resumen con formato WhatsApp / Markdown copiado'
                    )
                  }
                  className="h-10 px-3.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 shrink-0" /> WhatsApp / Markdown
                </button>
                {openQrTransfer && (
                  <button
                    type="button"
                    onClick={() => openQrTransfer('Resumen 930Text', sumOutput)}
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold text-[var(--brand2)] hover:border-[var(--brand2)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <QrCode className="w-3.5 h-3.5" /> QR al Móvil
                  </button>
                )}
                {openSocialCardModal && (
                  <button
                    type="button"
                    onClick={() => openSocialCardModal(sumOutput, '930Text · Resumen')}
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold text-fuchsia-400 hover:border-fuchsia-400 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Tarjeta PNG
                  </button>
                )}
                {speakText && (
                  <button
                    type="button"
                    onClick={() => speakText(sumOutput, 'es')}
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Volume2 className="w-3.5 h-3.5 shrink-0" /> Escuchar
                  </button>
                )}
                {sendToTool && (
                  <button
                    type="button"
                    onClick={() => sendToTool('traductor', sumOutput)}
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center whitespace-nowrap shrink-0"
                  >
                    Traducir →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const exec = summarizeTextDetailed(sumInput, 5, 'executive', sumFocusKeyword).output;
                    const test = summarizeTextDetailed(sumInput, 5, 'studyQuestions', sumFocusKeyword).output;
                    const plan = summarizeTextDetailed(sumInput, 5, 'actionPlan', sumFocusKeyword).output;
                    const thread = summarizeTextDetailed(sumInput, 5, 'socialThread', sumFocusKeyword).output;
                    downloadTxt(
                      '930text-dossier-estudio-4en1.txt',
                      `DOSSIER COMPLETO 4 EN 1 · 930TEXT\n===================================\n\n1. FICHA EJECUTIVA:\n${exec}\n\n2. TEST DE EXAMEN:\n${test}\n\n3. PLAN DE ACCIÓN:\n${plan}\n\n4. HILO PARA REDES:\n${thread}`
                    );
                  }}
                  className="h-10 px-3.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> Descargar Pack 4 en 1
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
