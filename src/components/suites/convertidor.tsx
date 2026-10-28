import React, { useState, useEffect } from 'react';
import { ConvertMode, convertTextFormat } from '../../utils/textTools';
import { LIMITS } from '../../config/limits';
import {
  Bookmark,
  ClipboardPaste,
  Wand2,
  Copy,
  Download,
  Image as ImageIcon,
  QrCode,
  Printer,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export interface ConvertidorSuiteProps {
  input?: string;
  onInputChange?: (val: string) => void;
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  saveToHistory?: (tool: string, input: string, output: string) => void;
  sampleText?: string;
  onRecordRecent?: (toolId: string) => void;
  openSocialCardModal?: (text: string, author?: string) => void;
  openQrTransfer?: (title: string, text: string) => void;
  printFormattedReport?: (title: string, text: string, subtitle?: string) => void;
  sendToTool?: (toolId: string, text: string) => void;
  addToast?: (msg: string, kind?: 'ok' | 'error') => void;
}

const CONVERT_MODES: Array<[ConvertMode, string]> = [
  ['upper', 'MAYÚSCULAS'],
  ['lower', 'minúsculas'],
  ['sentence', 'Tipo frase'],
  ['title', 'Tipo Título Pro'],
  ['alternating', 'aLtErNaDo'],
  ['noAccents', 'Sin tildes'],
  ['camel', 'camelCase'],
  ['pascal', 'PascalCase'],
  ['snake', 'snake_case'],
  ['screamingSnake', 'SCREAMING_SNAKE'],
  ['slug', 'url-slug'],
  ['hashtags', '#hashtags'],
  ['numbered', '1. Numerar'],
  ['bullets', '• Viñetas'],
  ['checklist', '[ ] Tareas'],
  ['csvRow', 'Fila CSV'],
  ['markdownTable', 'Tabla Markdown'],
  ['extractLinks', 'Extraer Enlaces'],
  ['base64Encode', 'Base64'],
  ['urlEncode', 'URL Encode'],
  ['reverse', 'Invertir']
];

export const ConvertidorSuite: React.FC<ConvertidorSuiteProps> = ({
  input: controlledInput,
  onInputChange,
  copyText,
  downloadTxt,
  saveToHistory,
  sampleText = 'Guía definitiva de productividad, diseño web y marketing digital 2026',
  onRecordRecent,
  openSocialCardModal,
  openQrTransfer,
  printFormattedReport,
  sendToTool,
  addToast
}) => {
  const [internalInput, setInternalInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-conv') || sampleText;
    } catch {
      return sampleText;
    }
  });

  const convInput = controlledInput !== undefined ? controlledInput : internalInput;

  const setConvInput = (val: string) => {
    if (onInputChange) {
      onInputChange(val);
    }
    setInternalInput(val);
  };

  const [convOutput, setConvOutput] = useState('');
  const [convMode, setConvMode] = useState<ConvertMode>('title');
  const [convStatus, setConvStatus] = useState<{ msg: string; type: '' | 'ok' | 'error' }>({ msg: '', type: '' });

  useEffect(() => {
    try {
      localStorage.setItem('tt-draft-conv', convInput);
    } catch {
      // quota safe
    }
    if (!convInput.trim()) {
      setConvOutput('');
      return;
    }
    setConvOutput(convertTextFormat(convInput, convMode));
  }, [convInput, convMode]);

  const handleConvert = (customMode?: ConvertMode) => {
    const activeMode = customMode || convMode;
    if (customMode) setConvMode(customMode);
    if (!convInput.trim()) {
      setConvStatus({ msg: 'Escribe un texto para convertir.', type: 'error' });
      if (addToast) addToast('Escribe o pega un texto para convertir', 'error');
      return;
    }
    if (onRecordRecent) onRecordRecent('convertidor');
    const out = convertTextFormat(convInput, activeMode);
    setConvOutput(out);
    setConvStatus({ msg: `Formato aplicado: ${activeMode}.`, type: 'ok' });
    if (addToast) addToast(`Formato «${activeMode}» aplicado`);
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setConvInput(text);
        setConvStatus({ msg: 'Texto pegado del portapapeles.', type: 'ok' });
        if (addToast) addToast('Texto pegado del portapapeles', 'ok');
      }
    } catch {
      setConvStatus({ msg: 'Usa Ctrl+V para pegar manualmente.', type: 'error' });
      if (addToast) addToast('Usa Ctrl+V para pegar manualmente', 'error');
    }
  };

  return (
    <section id="convertidor" className="py-10 sm:py-16 border-t border-[var(--line)]">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <span className="section-number">SUITE 07 · TRANSFORMACIÓN, LISTAS & CÓDIGO</span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-balance mt-1">
          Convertidor de Formatos Pro
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[var(--muted)] max-w-2xl">
          21 transformaciones instantáneas: mayúsculas, título inteligente, camelCase, PascalCase, snake_case, CONSTANTE_MAYUS, url-slug, sin tildes, hashtags, numerar líneas, tareas [ ], CSV, Base64, URL Encode y conversión a imagen PNG.
        </p>

        <div className="mt-5 sm:mt-6 rounded-[22px] sm:rounded-[28px] studio-console overflow-hidden">
          <div className="px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-[var(--line)] bg-[var(--surface2)]/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap no-scrollbar pb-1 sm:pb-0">
              {CONVERT_MODES.map(([mId, label]) => (
                <button
                  key={mId}
                  type="button"
                  onClick={() => handleConvert(mId)}
                  className={`h-8 px-2.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                    convMode === mId
                      ? 'bg-[var(--brand)] text-white'
                      : 'bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] border border-[var(--line)]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {saveToHistory && (
              <button
                type="button"
                onClick={() => {
                  if (!convOutput.trim()) {
                    if (addToast) addToast('Convierte un texto antes de guardar en el historial', 'error');
                    return;
                  }
                  saveToHistory('Conversión Pro', convInput, convOutput);
                  if (addToast) addToast('Guardado en tu historial local', 'ok');
                }}
                className="h-8 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 shrink-0"
              >
                <Bookmark className="w-3.5 h-3.5" /> Guardar
              </button>
            )}
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-[var(--muted)]">Texto de entrada</span>
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
                      setConvInput(sampleText);
                      setConvOutput(convertTextFormat(sampleText, convMode));
                      if (addToast) addToast('Texto de ejemplo cargado');
                    }}
                    className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--gold)] inline-flex items-center gap-1"
                  >
                    <Wand2 className="w-3 h-3 text-[var(--gold)]" /> Ejemplo
                  </button>
                  <span className="text-xs text-[var(--muted)] tabular-nums">{convInput.length} / {LIMITS.GLOBAL_MAX}</span>
                </div>
              </div>
              <textarea
                value={convInput}
                onChange={e => setConvInput(e.target.value)}
                maxLength={LIMITS.GLOBAL_MAX}
                rows={6}
                placeholder="Escribe o pega tu texto aquí…"
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--text)] resize-y"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleConvert()}
                  className="h-10 px-5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] inline-flex items-center justify-center whitespace-nowrap shrink-0 shadow-md active:scale-95 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Convertir ahora
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setConvInput('');
                    setConvOutput('');
                    setConvStatus({ msg: '', type: '' });
                    if (addToast) addToast('Lienzo limpiado');
                  }}
                  className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold inline-flex items-center justify-center whitespace-nowrap shrink-0"
                >
                  Limpiar
                </button>
              </div>
              {convStatus.msg && (
                <p
                  role="status"
                  className={`mt-3 text-xs font-bold ${
                    convStatus.type === 'ok' ? 'text-[var(--green)]' : 'text-[var(--danger)]'
                  }`}
                >
                  {convStatus.msg}
                </p>
              )}
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[var(--muted)]">Resultado convertido</span>
                <span className="text-xs text-[var(--muted)] tabular-nums">{convOutput.length} caracteres</span>
              </div>
              <textarea
                value={convOutput}
                readOnly
                rows={6}
                placeholder="El texto convertido aparecerá aquí…"
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/60 text-[var(--text)] resize-y font-mono text-xs sm:text-sm"
              />

              {/* Action Buttons Row */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyText(convOutput, 'Resultado copiado al portapapeles')}
                  className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 shrink-0" /> Copiar
                </button>

                {openSocialCardModal && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!convOutput.trim()) {
                        if (addToast) addToast('Convierte un texto primero para crear la imagen', 'error');
                        return;
                      }
                      openSocialCardModal(convOutput, '930Text · Convertidor');
                    }}
                    className="h-10 px-3.5 rounded-xl border border-[var(--brand2)]/50 bg-[var(--brand2)]/10 text-[var(--brand2)] text-xs font-bold hover:bg-[var(--brand2)]/20 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                    title="Convertir a tarjeta de imagen PNG HD"
                  >
                    <ImageIcon className="w-3.5 h-3.5 shrink-0" /> Crear Imagen (PNG)
                  </button>
                )}

                {openQrTransfer && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!convOutput.trim()) {
                        if (addToast) addToast('No hay resultado para transferir por QR', 'error');
                        return;
                      }
                      openQrTransfer('Texto Convertido', convOutput);
                    }}
                    className="h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold text-[var(--text)] hover:border-[var(--brand2)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                    title="Escanear con la cámara del móvil"
                  >
                    <QrCode className="w-3.5 h-3.5 shrink-0" /> QR Móvil
                  </button>
                )}

                {printFormattedReport && (
                  <button
                    type="button"
                    onClick={() => {
                      if (!convOutput.trim()) {
                        if (addToast) addToast('No hay contenido para generar PDF', 'error');
                        return;
                      }
                      printFormattedReport('Texto Convertido', convOutput, `Formato ${convMode}`);
                    }}
                    className="h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold text-[var(--text)] hover:border-[var(--gold)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                    title="Exportar a documento PDF editorial"
                  >
                    <Printer className="w-3.5 h-3.5 shrink-0" /> PDF
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => downloadTxt('930text-convertido.txt', convOutput)}
                  className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> TXT
                </button>
              </div>

              {/* Batch & Cross-suite Row */}
              <div className="mt-2.5 pt-2.5 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const allModes: Array<[ConvertMode, string]> = [
                      ['upper', 'MAYÚSCULAS'],
                      ['lower', 'minúsculas'],
                      ['sentence', 'Tipo frase'],
                      ['title', 'Tipo Título Pro'],
                      ['camel', 'camelCase'],
                      ['pascal', 'PascalCase'],
                      ['snake', 'snake_case'],
                      ['screamingSnake', 'SCREAMING_SNAKE'],
                      ['slug', 'URL Slug SEO'],
                      ['hashtags', 'Hashtags'],
                      ['numbered', 'Lista numerada'],
                      ['checklist', 'Checklist de tareas'],
                      ['csvRow', 'Fila CSV'],
                      ['base64Encode', 'Base64'],
                      ['urlEncode', 'URL Encode']
                    ];
                    const bundle = allModes
                      .map(([m, lbl]) => `=== ${lbl.toUpperCase()} ===\n${convertTextFormat(convInput || '930Text', m)}`)
                      .join('\n\n');
                    downloadTxt('930text-18-formatos.txt', bundle);
                    if (addToast) addToast('Descargado paquete con los 18 formatos', 'ok');
                  }}
                  className="h-9 px-3 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> Descargar los 18 Formatos en 1 Archivo
                </button>

                {sendToTool && (
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-[var(--muted)] mr-1">Enviar a:</span>
                    <button
                      type="button"
                      onClick={() => sendToTool('mejorador', convOutput)}
                      className="px-2 py-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[11px] font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1"
                    >
                      Mejorador <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => sendToTool('analizador', convOutput)}
                      className="px-2 py-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-[11px] font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1"
                    >
                      Analizador <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
