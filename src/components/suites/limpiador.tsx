import React, { useState, useEffect } from 'react';
import { cleanTextAdvanced } from '../../utils/textTools';
import { LIMITS } from '../../config/limits';
import {
  Bookmark,
  ClipboardPaste,
  Wand2,
  Copy,
  Download
} from 'lucide-react';

export interface LimpiadorSuiteProps {
  input?: string;
  onInputChange?: (val: string) => void;
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  saveToHistory?: (tool: string, input: string, output: string) => void;
  sendToTool?: (toolId: string, text: string) => void;
  sampleText?: string;
  onRecordRecent?: (toolId: string) => void;
}

const DEFAULT_SAMPLE = '<h1>Documento de Prueba</h1><p>Visita https://ejemplo.com o envía un correo a contacto@ejemplo.com [00:15].</p><ul><li>Línea 1 con   espacios   extra</li><li>Línea 1 con   espacios   extra</li></ul>';

export const LimpiadorSuite: React.FC<LimpiadorSuiteProps> = ({
  input,
  onInputChange,
  copyText,
  downloadTxt,
  saveToHistory,
  sendToTool,
  sampleText = DEFAULT_SAMPLE,
  onRecordRecent
}) => {
  const [internalInput, setInternalInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-clean') || sampleText;
    } catch {
      return sampleText;
    }
  });
  const cleanInput = input !== undefined ? input : internalInput;
  const setCleanInput = onInputChange || setInternalInput;

  const [cleanOutput, setCleanOutput] = useState('');
  const [cleanMode, setCleanMode] = useState<'balanced' | 'aggressive'>('balanced');
  const [stripHtml, setStripHtml] = useState(true);
  const [stripMarkdown, setStripMarkdown] = useState(false);
  const [stripUrls, setStripUrls] = useState(false);
  const [stripEmails, setStripEmails] = useState(false);
  const [stripEmojis, setStripEmojis] = useState(false);
  const [stripTimestamps, setStripTimestamps] = useState(false);
  const [stripLeadingNumbers, setStripLeadingNumbers] = useState(false);
  const [dedupeLines, setDedupeLines] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [sortLines, setSortLines] = useState<'none' | 'asc' | 'desc' | 'length'>('none');
  const [cleanStatus, setCleanStatus] = useState<{ msg: string; type: '' | 'ok' | 'error' }>({ msg: '', type: '' });

  useEffect(() => {
    try {
      localStorage.setItem('tt-draft-clean', cleanInput);
    } catch {
      // quota safe
    }
    if (!cleanInput.trim()) {
      setCleanOutput('');
      return;
    }
    try {
      const out = cleanTextAdvanced(cleanInput, {
        mode: cleanMode,
        stripHtml,
        stripMarkdown,
        stripUrls,
        stripEmails,
        stripEmojis,
        stripTimestamps,
        stripLeadingNumbers,
        dedupeLines,
        findText,
        replaceText,
        sortLines
      });
      setCleanOutput(out);
    } catch {
      // safe fallback
    }
  }, [
    cleanInput,
    cleanMode,
    stripHtml,
    stripMarkdown,
    stripUrls,
    stripEmails,
    stripEmojis,
    stripTimestamps,
    stripLeadingNumbers,
    dedupeLines,
    findText,
    replaceText,
    sortLines
  ]);

  const handleClean = (customText?: string) => {
    const sourceText = customText !== undefined ? customText : cleanInput;
    if (!sourceText.trim()) {
      setCleanStatus({ msg: 'Escribe un texto para limpiar.', type: 'error' });
      return;
    }
    if (onRecordRecent) onRecordRecent('limpiador');
    try {
      const out = cleanTextAdvanced(sourceText, {
        mode: cleanMode,
        stripHtml,
        stripMarkdown,
        stripUrls,
        stripEmails,
        stripEmojis,
        stripTimestamps,
        stripLeadingNumbers,
        dedupeLines,
        findText,
        replaceText,
        sortLines
      });
      setCleanOutput(out);
      setCleanStatus({ msg: 'Texto limpiado y normalizado con éxito.', type: 'ok' });
    } catch (e) {
      setCleanStatus({ msg: e instanceof Error ? e.message : 'Error al limpiar', type: 'error' });
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setCleanInput(text);
      }
    } catch {
      // ignore
    }
  };

  return (
    <section id="limpiador" className="py-10 sm:py-16 border-t border-[var(--line)]">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <span className="section-number">SUITE 05 · SANEAMIENTO DE DOCUMENTOS & LISTAS</span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-balance mt-1">
          Limpiador y Normalizador Pro
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[var(--muted)] max-w-2xl">
          Elimina etiquetas HTML, formato Markdown, enlaces, correos, marcas de tiempo `[00:12]`, numeración de listas, duplicados y aplica buscar/reemplazar instantáneo.
        </p>

        <div className="mt-5 sm:mt-6 rounded-[22px] sm:rounded-[28px] studio-console overflow-hidden">
          <div className="px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-[var(--line)] bg-[var(--surface2)]/90 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-x-3 gap-y-2 text-xs font-bold w-full lg:w-auto">
                <select
                  aria-label="Modo de limpieza"
                  value={cleanMode}
                  onChange={e => setCleanMode(e.target.value as 'balanced' | 'aggressive')}
                  className="col-span-2 sm:col-span-1 h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] w-full sm:w-auto"
                >
                  <option value="balanced">Modo equilibrado</option>
                  <option value="aggressive">Limpieza profunda (1 línea/párrafo)</option>
                </select>

                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={stripHtml} onChange={e => setStripHtml(e.target.checked)} />
                  <span>Sin HTML</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={stripMarkdown} onChange={e => setStripMarkdown(e.target.checked)} />
                  <span>Sin Markdown</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={stripUrls} onChange={e => setStripUrls(e.target.checked)} />
                  <span>Sin URLs</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={stripEmails} onChange={e => setStripEmails(e.target.checked)} />
                  <span>Sin Emails</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={stripEmojis} onChange={e => setStripEmojis(e.target.checked)} />
                  <span>Sin Emojis</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={stripTimestamps} onChange={e => setStripTimestamps(e.target.checked)} />
                  <span>Sin tiempos [00:00]</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={stripLeadingNumbers}
                    onChange={e => setStripLeadingNumbers(e.target.checked)}
                  />
                  <span>Sin viñetas/núm.</span>
                </label>
                <label className="inline-flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={dedupeLines} onChange={e => setDedupeLines(e.target.checked)} />
                  <span>Sin repetidas</span>
                </label>
              </div>

              {saveToHistory && (
                <button
                  type="button"
                  onClick={() => saveToHistory('Texto limpio Pro', cleanInput, cleanOutput)}
                  className="h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center gap-1.5 shrink-0"
                >
                  <Bookmark className="w-3.5 h-3.5" /> Guardar
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 pt-1 border-t border-[var(--line)]/60">
              <input
                type="text"
                value={findText}
                onChange={e => setFindText(e.target.value)}
                maxLength={LIMITS.BUSCAR}
                placeholder="Buscar texto…"
                className="h-9 sm:h-8 px-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-xs w-full sm:w-40"
              />
              <input
                type="text"
                value={replaceText}
                onChange={e => setReplaceText(e.target.value)}
                maxLength={LIMITS.REEMPLAZAR}
                placeholder="Reemplazar por…"
                className="h-9 sm:h-8 px-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-xs w-full sm:w-40"
              />
              <select
                aria-label="Ordenar líneas"
                value={sortLines}
                onChange={e => setSortLines(e.target.value as 'none' | 'asc' | 'desc' | 'length')}
                className="col-span-2 sm:col-span-1 h-9 sm:h-8 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-xs font-bold w-full sm:w-auto"
              >
                <option value="none">Orden original</option>
                <option value="asc">Ordenar A → Z</option>
                <option value="desc">Ordenar Z → A</option>
                <option value="length">Ordenar por longitud</option>
              </select>
              <button
                type="button"
                onClick={() => setCleanInput(cleanInput.split('\n').reverse().join('\n'))}
                className="h-9 sm:h-8 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand2)] transition whitespace-nowrap"
              >
                Invertir líneas (Reversa)
              </button>
              {cleanInput && (
                <span className="ml-auto text-[11px] font-bold text-[var(--muted)] whitespace-nowrap">
                  {Math.max(0, cleanInput.length - cleanOutput.length)} caract. purgados · {cleanOutput.split('\n').filter(Boolean).length} líneas limpias
                </span>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-[var(--muted)]">Texto sucio o desordenado</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={pasteFromClipboard}
                    className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1"
                  >
                    <ClipboardPaste className="w-3 h-3 text-[var(--brand2)]" /> Pegar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCleanInput(sampleText);
                      setStripHtml(true);
                      setStripUrls(true);
                      setStripTimestamps(true);
                      setDedupeLines(true);
                      handleClean(sampleText);
                    }}
                    className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--gold)] inline-flex items-center gap-1"
                  >
                    <Wand2 className="w-3 h-3 text-[var(--gold)]" /> Ejemplo
                  </button>
                  <span className="text-xs text-[var(--muted)] tabular-nums">{cleanInput.length} / {LIMITS.GLOBAL_MAX}</span>
                </div>
              </div>
              <textarea
                value={cleanInput}
                onChange={e => setCleanInput(e.target.value)}
                maxLength={LIMITS.GLOBAL_MAX}
                rows={7}
                placeholder="Pega contenido desde PDFs, subtítulos, Excels, webs o correos…"
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--text)] resize-y"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleClean()}
                  className="h-10 px-5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] inline-flex items-center justify-center whitespace-nowrap shrink-0"
                >
                  Ejecutar limpieza Pro
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCleanInput('');
                    setCleanOutput('');
                    setCleanStatus({ msg: '', type: '' });
                  }}
                  className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold inline-flex items-center justify-center whitespace-nowrap shrink-0"
                >
                  Limpiar campo
                </button>
              </div>
              {cleanStatus.msg && (
                <p
                  role="status"
                  className={`mt-3 text-xs font-bold ${
                    cleanStatus.type === 'ok' ? 'text-[var(--green)]' : 'text-[var(--danger)]'
                  }`}
                >
                  {cleanStatus.msg}
                </p>
              )}
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[var(--muted)]">Texto limpio</span>
                <span className="text-xs text-[var(--muted)] tabular-nums">{cleanOutput.length} caract.</span>
              </div>
              <textarea
                value={cleanOutput}
                readOnly
                rows={7}
                placeholder="Tu texto normalizado aparecerá aquí…"
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/60 text-[var(--text)] resize-y"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copyText(cleanOutput, 'Texto limpio copiado')}
                  className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 shrink-0" /> Copiar texto
                </button>
                <button
                  type="button"
                  onClick={() => downloadTxt('930text-limpio.txt', cleanOutput)}
                  className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> Descargar TXT
                </button>
                {sendToTool && (
                  <button
                    type="button"
                    onClick={() => sendToTool('mejorador', cleanOutput)}
                    className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center whitespace-nowrap shrink-0"
                  >
                    Enviar a Mejorar →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    const lines = (cleanOutput || cleanInput)
                      .split(/\r?\n/)
                      .map(l => l.trim())
                      .filter(Boolean);
                    const csv = ['"Indice","Linea_Limpia"', ...lines.map((l, i) => `"${i + 1}","${l.replace(/"/g, '""')}"`)].join('\n');
                    const json = JSON.stringify({ totalLines: lines.length, items: lines }, null, 2);
                    downloadTxt(
                      '930text-datos-estructurados.txt',
                      `PACK DE DATOS LIMPIOS (CSV + JSON) · 930TEXT\n==============================================\nTotal registros limpios: ${lines.length}\n\n--- FORMATO CSV PARA EXCEL / SHEETS ---\n${csv}\n\n--- FORMATO JSON PARA DESARROLLO ---\n${json}`
                    );
                  }}
                  className="h-10 px-3.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> Exportar CSV + JSON
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
