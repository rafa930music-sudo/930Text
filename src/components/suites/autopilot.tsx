import React, { useState, useMemo } from 'react';
import { runAutopilotPipeline } from '../../utils/enterpriseTools';
import { LIMITS } from '../../config/limits';
import {
  Copy,
  Download,
  Share2,
  Mic,
  ClipboardPaste,
  Wand2
} from 'lucide-react';

export interface AutopilotSuiteProps {
  input?: string;
  onInputChange?: (val: string) => void;
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  printFormattedReport?: (title: string, content: string, subtitle?: string) => void;
  encodeWorkspaceShareHash?: (suite: string, text: string) => string;
  startVoiceDictation?: (target: string, setter: (val: string) => void) => void;
  dictatingTarget?: string | null;
  sampleText?: string;
}

const DEFAULT_SAMPLE = 'Ayer abi en la tarde yo fui al supermercao porq abia ke comprar barias kosas que me faltavan en la kasa. Ademas, la optimizacion de flujos de trabajo y el formateo digital avanzado estan transformando la productividad de estudiantes, empresas y creadores digitales en un 42% anual. Sin embargo, el 68% de los equipos pierde mas de 4 horas semanales limpiando documentos PDF mal formateados, redactando correos repetitivos y preparando informes ejecutivos.';

export const AutopilotSuite: React.FC<AutopilotSuiteProps> = ({
  input,
  onInputChange,
  copyText,
  downloadTxt,
  printFormattedReport,
  encodeWorkspaceShareHash,
  startVoiceDictation,
  dictatingTarget,
  sampleText = DEFAULT_SAMPLE
}) => {
  const [internalInput, setInternalInput] = useState<string>(DEFAULT_SAMPLE);
  const autoInput = input !== undefined ? input : internalInput;
  const setAutoInput = onInputChange || setInternalInput;

  const autopilotReport = useMemo(() => runAutopilotPipeline(autoInput), [autoInput]);

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setAutoInput(text);
      }
    } catch {
      // ignore
    }
  };

  return (
    <section id="autopilot" className="py-12 sm:py-16 border-t border-[var(--line)]">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
          <div>
            <span className="section-number">SUITE 09 · FLUJO INTELIGENTE 5 EN 1 (AUTOPILOT PRO)</span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">
              Piloto Automático de Documentos en 1 Clic
            </h2>
            <p className="mt-1.5 text-xs sm:text-base text-[var(--muted)] max-w-2xl">
              Pega cualquier borrador sucio, apunte o informe: Autopilot lo limpia, corrige su ortografía, extrae el resumen ejecutivo, genera preguntas de examen y crea el titular SEO con hashtags de una sola vez.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => copyText(autopilotReport.markdownBundle, 'Dossier Autopilot completo copiado')}
              className="h-10 px-4 rounded-xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-white text-xs font-extrabold inline-flex items-center gap-1.5 shadow-md hover:brightness-110"
            >
              <Copy className="w-3.5 h-3.5" /> Copiar Dossier Completo
            </button>
            <button
              type="button"
              onClick={() => downloadTxt('930text-dossier-autopilot.md', autopilotReport.markdownBundle)}
              className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold hover:border-[var(--brand2)] inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-[var(--brand2)]" /> Exportar .MD / .TXT
            </button>
            {encodeWorkspaceShareHash && (
              <button
                type="button"
                onClick={() =>
                  copyText(
                    encodeWorkspaceShareHash('autopilot', autoInput),
                    'Enlace directo de Autopilot copiado al portapapeles'
                  )
                }
                className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold hover:border-[var(--brand2)] inline-flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-[var(--brand2)]" /> Compartir enlace
              </button>
            )}
            {printFormattedReport && (
              <button
                type="button"
                onClick={() => printFormattedReport('Dossier Ejecutivo Autopilot', autopilotReport.markdownBundle, 'Auditoría 5 en 1 · 930Text')}
                className="h-10 px-3.5 rounded-xl border border-rose-500/40 bg-rose-500/10 text-xs font-extrabold text-rose-500 hover:brightness-110 inline-flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> Descargar PDF Editorial (.pdf)
              </button>
            )}
          </div>
        </div>

        <div className="rounded-[24px] sm:rounded-[28px] studio-console p-4 sm:p-6 space-y-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-extrabold text-[var(--muted)]">
                Texto bruto de entrada (se procesa automáticamente en los 5 motores)
              </span>
              <div className="flex items-center gap-2">
                {startVoiceDictation && (
                  <button
                    type="button"
                    onClick={() => startVoiceDictation('auto', setAutoInput)}
                    className={`h-7 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition ${
                      dictatingTarget === 'auto'
                        ? 'border-[var(--danger)] bg-[var(--danger)]/15 text-[var(--danger)]'
                        : 'border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand2)]'
                    }`}
                  >
                    <Mic className="w-3 h-3 text-[var(--brand2)]" /> {dictatingTarget === 'auto' ? 'Escuchando…' : 'Dictar'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={pasteFromClipboard}
                  className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1"
                >
                  <ClipboardPaste className="w-3 h-3 text-[var(--brand2)]" /> Pegar
                </button>
                <button
                  type="button"
                  onClick={() => setAutoInput(sampleText)}
                  className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--gold)] inline-flex items-center gap-1"
                >
                  <Wand2 className="w-3 h-3 text-[var(--gold)]" /> Ejemplo
                </button>
                <button
                  type="button"
                  onClick={() => setAutoInput('')}
                  className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold"
                >
                  Vaciar
                </button>
              </div>
            </div>
            <textarea
              value={autoInput}
              onChange={e => setAutoInput(e.target.value)}
              rows={4}
              maxLength={LIMITS.GLOBAL_MAX}
              placeholder="Pega aquí tu texto sin revisar para que Autopilot ejecute los 5 pasos al instante…"
              className="w-full p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-sm text-[var(--text)]"
            />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Paso 1: Limpieza profunda */}
            <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-extrabold text-[var(--brand2)] uppercase">
                    PASO 1 · LIMPIEZA
                  </span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[var(--brand2)]/10 text-[var(--brand2)]">
                    {autopilotReport.cleanedText ? 'Completado' : 'En espera'}
                  </span>
                </div>
                <p className="text-xs text-[var(--text)] leading-relaxed max-h-[130px] overflow-y-auto whitespace-pre-wrap break-words pr-1">
                  {autopilotReport.cleanedText || 'Escribe un texto arriba…'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyText(autopilotReport.cleanedText, 'Texto limpio copiado')}
                className="mt-3 text-xs font-extrabold text-[var(--brand2)] hover:underline text-left"
              >
                Copiar limpio →
              </button>
            </div>

            {/* Paso 2: Corrección ortográfica */}
            <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-extrabold text-[var(--brand)] uppercase">
                    PASO 2 · CORRECCIÓN
                  </span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[var(--brand)]/10 text-[var(--brand)]">
                    {autopilotReport.correctionsCount > 0 ? `${autopilotReport.correctionsCount} mejoras` : 'Sin errores'}
                  </span>
                </div>
                <p className="text-xs text-[var(--text)] leading-relaxed max-h-[130px] overflow-y-auto whitespace-pre-wrap break-words pr-1">
                  {autopilotReport.correctedText || 'Escribe un texto arriba…'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyText(autopilotReport.correctedText, 'Texto corregido copiado')}
                className="mt-3 text-xs font-extrabold text-[var(--brand)] hover:underline text-left"
              >
                Copiar corregido →
              </button>
            </div>

            {/* Paso 3: Resumen ejecutivo */}
            <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-extrabold text-[var(--gold)] uppercase">
                    PASO 3 · RESUMEN
                  </span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[var(--gold)]/10 text-[var(--gold)]">
                    {autopilotReport.executiveSummary ? 'Sintetizado' : 'En espera'}
                  </span>
                </div>
                <p className="text-xs text-[var(--text)] leading-relaxed max-h-[130px] overflow-y-auto whitespace-pre-wrap break-words pr-1">
                  {autopilotReport.executiveSummary || 'Esperando texto…'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyText(autopilotReport.executiveSummary, 'Resumen ejecutivo copiado')}
                className="mt-3 text-xs font-extrabold text-[var(--gold)] hover:underline text-left"
              >
                Copiar resumen →
              </button>
            </div>

            {/* Paso 4: Preguntas de autoevaluación */}
            <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1.5">
                  <span className="text-[10px] font-extrabold text-[var(--green)] uppercase">
                    PASO 4 · PREGUNTAS
                  </span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[var(--green)]/10 text-[var(--green)]">
                    {autopilotReport.studyQuestions.length} ítems
                  </span>
                </div>
                <div className="space-y-1 text-xs text-[var(--text)] max-h-[130px] overflow-y-auto pr-1">
                  {autopilotReport.studyQuestions.slice(0, 4).map((q, i) => (
                    <p key={i} className="leading-snug break-words">{q}</p>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyText(autopilotReport.studyQuestions.join('\n'), 'Test de estudio copiado')}
                className="mt-3 text-xs font-extrabold text-[var(--green)] hover:underline text-left"
              >
                Copiar test →
              </button>
            </div>

            {/* Paso 5: Kit SEO y Legibilidad */}
            <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/70 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-extrabold text-[#ee4f98] uppercase">
                    PASO 5 · SEO & HUERTA
                  </span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-[#ee4f98]/10 text-[#ee4f98]">
                    {autopilotReport.metrics.huertaScore}/100
                  </span>
                </div>
                <div className="text-xs">
                  <strong className="block text-[var(--muted)] text-[10px]">Titular SEO:</strong>
                  <span className="font-bold text-[var(--text)] block break-words leading-snug">{autopilotReport.seoHeadline}</span>
                </div>
                <div className="text-xs">
                  <strong className="block text-[var(--muted)] text-[10px]">URL Slug:</strong>
                  <code className="text-[11px] text-[var(--brand2)] block break-all">/{autopilotReport.urlSlug}</code>
                </div>
                <div className="text-xs">
                  <strong className="block text-[var(--muted)] text-[10px]">Legibilidad:</strong>
                  <span className="font-bold text-[var(--gold)]">
                    {autopilotReport.metrics.huertaScore}/100 ({autopilotReport.metrics.huertaLabel})
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyText(`${autopilotReport.seoHeadline}\n/${autopilotReport.urlSlug}\n${autopilotReport.hashtags}`, 'Kit SEO copiado')}
                className="mt-3 text-xs font-extrabold text-[#ee4f98] hover:underline text-left"
              >
                Copiar kit SEO →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
