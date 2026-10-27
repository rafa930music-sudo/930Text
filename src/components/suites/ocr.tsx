import React, { useState, useRef, useCallback } from 'react';
import { Camera, Upload, Copy, Download, ArrowRight, RefreshCw, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { LIMITS } from '../../config/limits';

interface OcrSuiteProps {
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  saveToHistory?: (type: string, input: string, output: string) => void;
  sendToTool?: (toolId: string, text: string) => void;
  addToast?: (msg: string, kind?: 'ok' | 'error') => void;
  onRecordRecent?: (toolId: string) => void;
}

export const OcrSuite: React.FC<OcrSuiteProps> = ({
  copyText,
  downloadTxt,
  saveToHistory,
  sendToTool,
  addToast,
  onRecordRecent
}) => {
  const [ocrImage, setOcrImage] = useState<string | null>(null);
  const [ocrFileName, setOcrFileName] = useState<string>('');
  const [ocrMime, setOcrMime] = useState<string>('image/jpeg');
  const [ocrLoading, setOcrLoading] = useState<boolean>(false);
  const [ocrResult, setOcrResult] = useState<string>('');
  const [ocrStats, setOcrStats] = useState<{ words: number; chars: number }>({ words: 0, chars: 0 });
  const [ocrStatus, setOcrStatus] = useState<{ msg: string; type: '' | 'ok' | 'error' }>({ msg: '', type: '' });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const processOcrImageFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        addToast?.('Por favor, selecciona un archivo de imagen (JPG, PNG, WebP).', 'error');
        return;
      }
      setOcrFileName(file.name);
      setOcrMime(file.type);
      setOcrResult('');
      setOcrStatus({ msg: '', type: '' });

      const reader = new FileReader();
      reader.onload = e => {
        const dataUrl = e.target?.result as string;
        if (!dataUrl) return;

        const img = new Image();
        img.onload = () => {
          const MAX_DIM = 2048;
          let width = img.width;
          let height = img.height;
          if (width > MAX_DIM || height > MAX_DIM) {
            if (width > height) {
              height = Math.round((height * MAX_DIM) / width);
              width = MAX_DIM;
            } else {
              width = Math.round((width * MAX_DIM) / height);
              height = MAX_DIM;
            }
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
              ctx.drawImage(img, 0, 0, width, height);
              const optimized = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.9);
              setOcrImage(optimized);
              addToast?.(`Imagen cargada (${width}×${height}px). Pulsa "Escanear Texto".`);
              return;
            }
          }
          setOcrImage(dataUrl);
          addToast?.('Imagen cargada. Pulsa "Escanear Texto".');
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    },
    [addToast]
  );

  const handleRunOcr = async () => {
    if (!ocrImage) {
      setOcrStatus({ msg: 'Sube una foto o abre la cámara primero.', type: 'error' });
      return;
    }
    setOcrLoading(true);
    setOcrStatus({ msg: 'Escaneando texto con IA visual de alta resolución…', type: '' });

    try {
      const res = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: ocrImage, mimeType: ocrMime })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Error ${res.status} al procesar la imagen.`);
      }

      const data = await res.json();
      if (!data.text) {
        throw new Error('No se detectó texto en la imagen. Intenta con una foto más nítida.');
      }

      const text = data.text;
      setOcrResult(text);
      const words = data.words || text.split(/\s+/).filter(Boolean).length;
      const chars = text.length;
      setOcrStats({ words, chars });
      setOcrStatus({ msg: `¡Texto extraído con éxito! (${words} palabras detectadas)`, type: 'ok' });
      addToast?.(`OCR completado: ${words} palabras extraídas.`);
      saveToHistory?.('Escáner OCR', ocrFileName || 'Foto/Captura', text);
      onRecordRecent?.('ocr');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error al procesar el escaneo.';
      setOcrStatus({ msg, type: 'error' });
      addToast?.(msg, 'error');
    } finally {
      setOcrLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processOcrImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleClear = () => {
    setOcrImage(null);
    setOcrFileName('');
    setOcrResult('');
    setOcrStats({ words: 0, chars: 0 });
    setOcrStatus({ msg: '', type: '' });
  };

  return (
    <section id="ocr" className="py-10 sm:py-16 border-t border-[var(--line)] bg-[var(--surface)]/35">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6 sm:mb-7">
          <div>
            <span className="section-number">SUITE 11 · RECONOCIMIENTO ÓPTICO DE CARACTERES (OCR)</span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-balance mt-1">
              Escáner OCR & Extraer Texto de Imagen
            </h2>
            <p className="mt-1.5 text-xs sm:text-base text-[var(--muted)] max-w-2xl">
              Convierte documentos impresos, capturas de pantalla, fotos de libros o notas manuscritas en texto editable al instante.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* LEFT: IMAGE INPUT & CAMERA AREA */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="p-4 sm:p-6 rounded-2xl studio-card border border-[var(--line)] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[var(--brand2)]" />
                  Imagen o Captura de Entrada
                </span>
                {ocrImage && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="text-xs font-bold text-red-400 hover:underline flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Quitar imagen
                  </button>
                )}
              </div>

              {!ocrImage ? (
                <div
                  onDragOver={e => e.preventDefault()}
                  onDrop={handleDrop}
                  className="p-8 border-2 border-dashed border-[var(--line)] hover:border-[var(--brand)] rounded-2xl bg-[var(--surface2)]/50 transition-colors flex flex-col items-center justify-center gap-3 text-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="w-12 h-12 rounded-2xl bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <strong className="block text-sm font-extrabold text-[var(--text)]">
                      Arrastra tu imagen aquí o haz clic para subir
                    </strong>
                    <span className="text-xs text-[var(--muted)] mt-1 block">
                      Soporta JPG, PNG, WebP y capturas de pantalla (hasta {LIMITS.GLOBAL_MAX.toLocaleString('es-ES')} chars equivalentes)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative rounded-xl overflow-hidden border border-[var(--line)] bg-black/40 max-h-[320px] flex items-center justify-center p-2">
                  <img src={ocrImage} alt="Vista previa OCR" className="max-h-[300px] object-contain rounded-lg" />
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => e.target.files?.[0] && processOcrImageFile(e.target.files[0])}
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={e => e.target.files?.[0] && processOcrImageFile(e.target.files[0])}
              />

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Seleccionar Imagen
                </button>
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="flex-1 h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand2)] flex items-center justify-center gap-2"
                >
                  <Camera className="w-4 h-4 text-[var(--brand2)]" /> Usar Cámara Móvil
                </button>
              </div>

              <button
                type="button"
                disabled={!ocrImage || ocrLoading}
                onClick={handleRunOcr}
                className="w-full h-12 rounded-xl bg-[var(--brand2)] text-[var(--brand-contrast)] text-sm font-extrabold hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
              >
                {ocrLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Escaneando imagen con IA...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Escanear y Extraer Texto</span>
                  </>
                )}
              </button>

              {ocrStatus.msg && (
                <div
                  className={`p-3 rounded-xl text-xs font-medium ${
                    ocrStatus.type === 'ok'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : ocrStatus.type === 'error'
                      ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                      : 'bg-[var(--brand-soft)] text-[var(--brand2)] border border-[var(--brand2)]/30'
                  }`}
                >
                  {ocrStatus.msg}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: TEXT OUTPUT AREA */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="p-4 sm:p-6 rounded-2xl studio-card border border-[var(--line)] flex flex-col gap-4 h-full">
              <div className="flex items-center justify-between">
                <span className="text-sm font-extrabold">Texto Extraído</span>
                {ocrStats.words > 0 && (
                  <span className="px-2.5 py-1 rounded-lg bg-[var(--brand-soft)] text-[var(--brand2)] text-xs font-bold font-mono">
                    {ocrStats.words} palabras · {ocrStats.chars} caracteres
                  </span>
                )}
              </div>

              <textarea
                readOnly
                value={ocrResult}
                placeholder="El texto digitalizado aparecerá aquí automáticamente tras escanear la imagen..."
                rows={10}
                className="w-full p-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs sm:text-sm font-mono leading-relaxed text-[var(--text)] focus:outline-none resize-none flex-1"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--line)]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!ocrResult}
                    onClick={() => copyText(ocrResult, 'Texto OCR')}
                    className="h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" /> Copiar
                  </button>
                  <button
                    type="button"
                    disabled={!ocrResult}
                    onClick={() => downloadTxt('930text-ocr-extraido.txt', ocrResult)}
                    className="h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] disabled:opacity-50 inline-flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" /> Exportar .txt
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={!ocrResult}
                    onClick={() => sendToTool?.('resumidor', ocrResult)}
                    className="h-9 px-3 rounded-xl bg-[var(--brand-soft)] text-[var(--brand)] text-xs font-extrabold hover:brightness-110 disabled:opacity-50 inline-flex items-center gap-1"
                  >
                    Enviar a Resumidor <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
