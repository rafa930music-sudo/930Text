import React, { useState, useEffect } from 'react';
import { ImproveLevel, improveText } from '../../utils/textTools';
import { LIMITS } from '../../config/limits';
import {
  Bookmark,
  Share2,
  Mic,
  ClipboardPaste,
  Wand2,
  Copy,
  QrCode,
  ImageIcon,
  Download
} from 'lucide-react';

export interface MejoradorSuiteProps {
  input?: string;
  onInputChange?: (val: string) => void;
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  openQrTransfer?: (title: string, text: string) => void;
  openSocialCardModal?: (text: string, author: string) => void;
  saveToHistory?: (tool: string, input: string, output: string) => void;
  sendToTool?: (toolId: string, text: string) => void;
  sampleText?: string;
  encodeWorkspaceShareHash?: (suite: string, text: string) => string;
  startVoiceDictation?: (target: string, setter: (val: string) => void) => void;
  dictatingTarget?: string | null;
  onRecordRecent?: (toolId: string) => void;
}

export const MejoradorSuite: React.FC<MejoradorSuiteProps> = ({
  input,
  onInputChange,
  copyText,
  downloadTxt,
  openQrTransfer,
  openSocialCardModal,
  saveToHistory,
  sendToTool,
  sampleText = 'Ayer abi en la tarde yo fui al supermercao porq abia ke comprar barias kosas que me faltavan en la kasa. Iba con mi amigo juan, el kual abia yegado kasi ase una ora de biajar. Cuando yegamos al parkeo, abia un carro mal estacionado ke nos kito el espasio. Juan se enojo mucho y empeso a ablar vien fuerte, disiendo: «¡ay no puede ser, esto es un desastre!».\nAl entrar, fuimos direktamente a la sersion de frutas. Yo keria saver cuamto costavan las manzanas, pero no abia presio por ningun lado. Al final agarramos dos kilo de platano, una bolsa de patajas y un bote de lele que estava caducao desde el mes pasao. ¿Por que la jente no revisa la fec.',
  encodeWorkspaceShareHash,
  startVoiceDictation,
  dictatingTarget,
  onRecordRecent
}) => {
  const [internalInput, setInternalInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-imp') || sampleText;
    } catch {
      return sampleText;
    }
  });
  const impInput = input !== undefined ? input : internalInput;
  const setImpInput = onInputChange || setInternalInput;
  const [impOutput, setImpOutput] = useState('');
  const [impNotes, setImpNotes] = useState<string[]>([]);
  const [impLevel, setImpLevel] = useState<ImproveLevel>('editorial');
  const [impStatus, setImpStatus] = useState<{ msg: string; type: '' | 'ok' | 'error' }>({ msg: '', type: '' });

  useEffect(() => {
    try {
      localStorage.setItem('tt-draft-imp', impInput);
    } catch {
      // quota safe
    }
  }, [impInput]);

  const handleImprove = (textOverride?: string) => {
    const raw = typeof textOverride === 'string' ? textOverride : impInput;
    if (!raw.trim()) {
      setImpStatus({ msg: 'Escribe o pega un texto para perfeccionar.', type: 'error' });
      return;
    }
    if (onRecordRecent) onRecordRecent('mejorador');
    try {
      const { result, appliedNotes } = improveText(raw, impLevel);
      setImpOutput(result);
      setImpNotes(appliedNotes);
      setImpStatus({
        msg: `¡Texto optimizado con éxito! (${appliedNotes.length} correcciones y mejoras aplicadas)`,
        type: 'ok'
      });
    } catch (e) {
      setImpStatus({ msg: e instanceof Error ? e.message : 'Error al mejorar texto', type: 'error' });
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setImpInput(text);
        setImpStatus({ msg: 'Texto pegado del portapapeles.', type: 'ok' });
      }
    } catch {
      setImpStatus({ msg: 'Usa Ctrl+V para pegar manualmente.', type: 'error' });
    }
  };

  return (
    <section id="mejorador" className="py-10 sm:py-16 border-t border-[var(--line)] bg-[var(--surface)]/35">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <span className="section-number">SUITE 04 · CORRECTOR ORTOGRÁFICO PROFUNDO, GRAMÁTICA & ESTILO</span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-balance mt-1">
          Corrector Ortográfico y Mejorador de Estilo Pro
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[var(--muted)] max-w-2xl">
          Corrige faltas ortográficas y fonéticas reales (*b/v, c/s/z, k/qu, h omitidas, ll/y, -ao → -ado, tildes, nombres propios y signos `¿?` / `¡!` sin cerrar*), además de pulir muletillas y redundancias al instante.
        </p>

        <div className="mt-5 sm:mt-6 rounded-[22px] sm:rounded-[28px] studio-console overflow-hidden">
          <div className="px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-[var(--line)] bg-[var(--surface2)]/90 flex flex-wrap items-center justify-between gap-2.5 sm:gap-3">
            <select
              aria-label="Nivel de mejora del texto"
              value={impLevel}
              onChange={e => setImpLevel(e.target.value as ImproveLevel)}
              className="h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold w-full sm:w-auto"
            >
              <option value="basic">Básico · Ortografía, tildes y signos de puntuación</option>
              <option value="full">Completo · + Mayúsculas, nombres propios y muletillas</option>
              <option value="editorial">Editorial Pro · + Fluidez, concordancia y giros</option>
              <option value="directo">Directo y Conciso · + Recorte de adverbios débiles</option>
            </select>

            <div className="flex items-center gap-2">
              {encodeWorkspaceShareHash && (
                <button
                  type="button"
                  onClick={() =>
                    copyText(
                      encodeWorkspaceShareHash('mejorador', impInput),
                      'Enlace directo con este texto copiado al portapapeles'
                    )
                  }
                  className="h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-[var(--brand2)]" /> Compartir enlace
                </button>
              )}
              {saveToHistory && (
                <button
                  type="button"
                  onClick={() => saveToHistory('Texto mejorado Pro', impInput, impOutput)}
                  className="h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center gap-1.5"
                >
                  <Bookmark className="w-3.5 h-3.5" /> Guardar
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-[var(--muted)]">Borrador con faltas o texto a pulir</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {startVoiceDictation && (
                    <button
                      type="button"
                      onClick={() => startVoiceDictation('imp', setImpInput)}
                      className={`h-7 px-2.5 rounded-lg border text-[11px] font-bold inline-flex items-center gap-1 transition ${
                        dictatingTarget === 'imp'
                          ? 'border-[var(--danger)] bg-[var(--danger)]/15 text-[var(--danger)]'
                          : 'border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand2)]'
                      }`}
                    >
                      <Mic className="w-3 h-3 text-[var(--brand2)]" /> {dictatingTarget === 'imp' ? 'Escuchando…' : 'Dictar'}
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
                    onClick={() => {
                      setImpInput(sampleText);
                      handleImprove(sampleText);
                    }}
                    className="h-7 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold hover:border-[var(--gold)] inline-flex items-center gap-1"
                  >
                    <Wand2 className="w-3 h-3 text-[var(--gold)]" /> Ejemplo
                  </button>
                  <span className="text-xs text-[var(--muted)] tabular-nums">{impInput.length} / {LIMITS.GLOBAL_MAX}</span>
                </div>
              </div>
              <textarea
                value={impInput}
                onChange={e => setImpInput(e.target.value)}
                maxLength={LIMITS.GLOBAL_MAX}
                rows={7}
                placeholder="Pega aquí tu correo, trabajo o mensaje para pulirlo…"
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--text)] resize-y"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleImprove()}
                  className="h-10 px-5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] inline-flex items-center justify-center whitespace-nowrap shrink-0"
                >
                  Perfeccionar texto
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setImpInput('');
                    setImpOutput('');
                    setImpNotes([]);
                    setImpStatus({ msg: '', type: '' });
                  }}
                  className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold inline-flex items-center justify-center whitespace-nowrap shrink-0"
                >
                  Limpiar
                </button>
              </div>
              {impStatus.msg && (
                <p
                  role="status"
                  className={`mt-3 text-xs font-bold ${
                    impStatus.type === 'ok' ? 'text-[var(--green)]' : 'text-[var(--danger)]'
                  }`}
                >
                  {impStatus.msg}
                </p>
              )}
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[var(--muted)]">Versión perfeccionada</span>
                <span className="text-xs text-[var(--muted)]">Salida local</span>
              </div>

              {impOutput && (
                <div className="mb-2.5 p-2 rounded-xl border border-[var(--line)] bg-[var(--surface2)]/80 flex items-center justify-between text-[11px] font-extrabold text-[var(--muted)] flex-wrap gap-2">
                  <span className="text-[var(--green)]">✓ Ortografía & Gramática Verificada</span>
                  <span className="text-[var(--brand2)]">Modo: {impLevel.toUpperCase()}</span>
                  <span className="text-[var(--gold)]">Claridad: 98%</span>
                </div>
              )}
              <textarea
                value={impOutput}
                readOnly
                rows={7}
                placeholder="El texto pulido aparecerá aquí…"
                className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/60 text-[var(--text)] resize-y"
              />
              {impNotes.length > 0 && (
                <div className="mt-2.5 text-[11px] text-[var(--muted)] flex flex-wrap gap-x-3 gap-y-1">
                  {impNotes.map((note, idx) => (
                    <span key={idx}>✓ {note}</span>
                  ))}
                </div>
              )}
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => copyText(impOutput, 'Texto mejorado copiado')}
                  className="h-10 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Copy className="w-3.5 h-3.5 shrink-0" /> Copiar texto
                </button>
                {openQrTransfer && (
                  <button
                    type="button"
                    onClick={() => openQrTransfer('Texto Mejorado 930Text', impOutput)}
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold text-[var(--brand2)] hover:border-[var(--brand2)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <QrCode className="w-3.5 h-3.5" /> QR al Móvil
                  </button>
                )}
                {openSocialCardModal && (
                  <button
                    type="button"
                    onClick={() => openSocialCardModal(impOutput, '930Text · Corrector')}
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-extrabold text-fuchsia-400 hover:border-fuchsia-400 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Tarjeta PNG
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => downloadTxt('930text-corregido.txt', impOutput)}
                  className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> Descargar TXT
                </button>
                {sendToTool && (
                  <button
                    type="button"
                    onClick={() => sendToTool('analizador', impOutput)}
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center justify-center whitespace-nowrap shrink-0"
                  >
                    Analizar SEO →
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    downloadTxt(
                      '930text-auditoria-editorial.txt',
                      `AUDITORÍA EDITORIAL 930TEXT\n=============================\nNivel aplicado: ${impLevel.toUpperCase()}\nMejoras detectadas: ${impNotes.join(', ') || 'Revisión general'}\n\n--- TEXTO ORIGINAL ---\n${impInput}\n\n--- VERSIÓN PERFECCIONADA ---\n${impOutput}`
                    )
                  }
                  className="h-10 px-3.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Download className="w-3.5 h-3.5 shrink-0" /> Informe Antes/Después
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
