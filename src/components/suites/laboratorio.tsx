import React, { useState, useMemo } from 'react';
import {
  compareTextsDetailed,
  generateAcademicCitations,
  EXECUTIVE_TEMPLATES
} from '../../utils/enterpriseTools';
import { LIMITS } from '../../config/limits';
import { ArrowLeftRight, Download, Copy } from 'lucide-react';

export interface LaboratorioSuiteProps {
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  addToast: (msg: string) => void;
}

export const LaboratorioSuite: React.FC<LaboratorioSuiteProps> = ({
  copyText,
  downloadTxt,
  addToast
}) => {
  const [labTab, setLabTab] = useState<'diff' | 'citas' | 'plantillas'>('diff');

  // Diff state
  const [diffTextA, setDiffTextA] = useState<string>(
    'El informe trimestral refleja un aumento del 18% en ventas locales.'
  );
  const [diffTextB, setDiffTextB] = useState<string>(
    'El informe trimestral consolidado refleja un aumento sostenido del 24% en ventas internacionales.'
  );
  const diffReport = useMemo(
    () => compareTextsDetailed(diffTextA, diffTextB),
    [diffTextA, diffTextB]
  );

  // Citations state
  const [citeAuthorFirst, setCiteAuthorFirst] = useState('Rafael');
  const [citeAuthorLast, setCiteAuthorLast] = useState('Moreno Román');
  const [citeYear, setCiteYear] = useState('2026');
  const [citeTitle, setCiteTitle] = useState('Manual Avanzado de Procesamiento Local de Texto');
  const [citeSource, setCiteSource] = useState('Editorial Tech Press / AI Studio');
  const [citeUrl, setCiteUrl] = useState('https://930text.org/manual-local');

  const citationsOutput = useMemo(
    () =>
      generateAcademicCitations({
        authorFirst: citeAuthorFirst,
        authorLast: citeAuthorLast,
        year: citeYear,
        title: citeTitle,
        publisherOrSite: citeSource,
        url: citeUrl,
        accessDate: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
      }),
    [citeAuthorFirst, citeAuthorLast, citeYear, citeTitle, citeSource, citeUrl]
  );

  // Executive templates state
  const [tplSelected, setTplSelected] = useState<string>('comercial');
  const [tplTopic, setTplTopic] = useState('Propuesta de Optimización de Prototipos Local');
  const [tplRecipient, setTplRecipient] = useState('Dirección de Operaciones');
  const [tplSender, setTplSender] = useState('Equipo Técnico');
  const [tplCta, setTplCta] = useState('Confirmar reunión para el próximo martes');

  const tplGenerated = useMemo(() => {
    const found =
      EXECUTIVE_TEMPLATES.find(t => t.id === tplSelected) || EXECUTIVE_TEMPLATES[0];
    return found.build(tplTopic, tplSender, tplRecipient, tplCta);
  }, [tplSelected, tplTopic, tplSender, tplRecipient, tplCta]);

  return (
    <section id="laboratorio" className="py-12 sm:py-16 border-t border-[var(--line)] bg-[var(--surface)]/35">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="section-number">SUITE 10 · AUDITORÍA DE VERSIONES, BIBLIOGRAFÍA & PLANTILLAS</span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">
              Comparador Diff A/B, Citas APA 7 y Plantillas Ejecutivas
            </h2>
            <p className="mt-1.5 text-xs sm:text-base text-[var(--muted)] max-w-2xl">
              Compara dos versiones de un contrato o ensayo palabra por palabra, genera referencias bibliográficas oficiales (APA 7, MLA 9, ISO 690, Harvard, BibTeX) o redacta comunicaciones comerciales en segundos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-[var(--surface2)] border border-[var(--line)] self-start">
            {(
              [
                ['diff', 'Comparador A/B (Diff)'],
                ['citas', 'Citas APA 7 / ISO / MLA'],
                ['plantillas', 'Plantillas B2B & WhatsApp']
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setLabTab(id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition whitespace-nowrap shrink-0 ${
                  labTab === id
                    ? 'bg-[var(--brand)] text-white shadow'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {labTab === 'diff' && (
          <div className="rounded-[24px] sm:rounded-[28px] studio-console p-4 sm:p-6 space-y-5">
            <div className="flex items-center justify-between gap-2 flex-wrap pb-1 border-b border-[var(--line)]/60">
              <span className="text-xs font-bold text-[var(--muted)]">
                Compara dos borradores para ver añadidos y eliminados en tiempo real
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const tmp = diffTextA;
                    setDiffTextA(diffTextB);
                    setDiffTextB(tmp);
                    addToast('Textos intercambiados (A ↔ B)');
                  }}
                  className="h-8 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1.5"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-[var(--brand2)]" /> Intercambiar A ↔ B
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setDiffTextA('');
                    setDiffTextB('');
                  }}
                  className="h-8 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold"
                >
                  Vaciar
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-[var(--muted)] mb-1.5">
                  Versión Original (Texto A)
                </label>
                <textarea
                  value={diffTextA}
                  onChange={e => setDiffTextA(e.target.value)}
                  maxLength={LIMITS.DIFF_A}
                  rows={4}
                  placeholder="Pega aquí la versión original…"
                  className="w-full p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-sm text-[var(--text)]"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold text-[var(--muted)] mb-1.5">
                  Versión Modificada (Texto B)
                </label>
                <textarea
                  value={diffTextB}
                  onChange={e => setDiffTextB(e.target.value)}
                  maxLength={LIMITS.DIFF_B}
                  rows={4}
                  placeholder="Pega aquí la versión nueva para detectar qué ha cambiado…"
                  className="w-full p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-sm text-[var(--text)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-center">
                <strong className="block text-lg font-extrabold text-[var(--brand2)] tabular-nums">
                  {diffReport.similarityPct}%
                </strong>
                <span className="text-[11px] font-bold text-[var(--muted)]">Similitud textual</span>
              </div>
              <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-center">
                <strong className="block text-lg font-extrabold text-[var(--green)] tabular-nums">
                  +{diffReport.addedWords}
                </strong>
                <span className="text-[11px] font-bold text-[var(--muted)]">Palabras añadidas</span>
              </div>
              <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-center">
                <strong className="block text-lg font-extrabold text-[var(--danger)] tabular-nums">
                  -{diffReport.removedWords}
                </strong>
                <span className="text-[11px] font-bold text-[var(--muted)]">Palabras eliminadas</span>
              </div>
              <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-center">
                <strong className="block text-lg font-extrabold text-[var(--text)] tabular-nums">
                  {diffReport.lengthDeltaChars >= 0 ? `+${diffReport.lengthDeltaChars}` : diffReport.lengthDeltaChars}
                </strong>
                <span className="text-[11px] font-bold text-[var(--muted)]">Diferencia caract.</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/70">
              <span className="block text-xs font-extrabold text-[var(--muted)] mb-2">
                Mapa visual de cambios (Rojo tachado = eliminado · Verde = añadido):
              </span>
              <div className="text-sm leading-relaxed flex flex-wrap gap-1">
                {diffReport.tokens.map((tok, i) => (
                  <span
                    key={i}
                    className={
                      tok.type === 'added'
                        ? 'px-1.5 py-0.5 rounded bg-[var(--green-soft)] text-[var(--green)] font-bold'
                        : tok.type === 'removed'
                          ? 'px-1.5 py-0.5 rounded bg-[var(--danger)]/15 text-[var(--danger)] line-through opacity-80'
                          : 'text-[var(--text)]'
                    }
                  >
                    {tok.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {labTab === 'citas' && (
          <div className="rounded-[24px] sm:rounded-[28px] studio-console p-4 sm:p-6 space-y-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <label className="block">
                <span className="block text-xs font-bold text-[var(--muted)] mb-1">Nombre del autor/a</span>
                <input
                  type="text"
                  value={citeAuthorFirst}
                  onChange={e => setCiteAuthorFirst(e.target.value)}
                  maxLength={LIMITS.CITA_AUTOR}
                  className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-[var(--muted)] mb-1">Apellidos del autor/a</span>
                <input
                  type="text"
                  value={citeAuthorLast}
                  onChange={e => setCiteAuthorLast(e.target.value)}
                  maxLength={LIMITS.CITA_AUTOR}
                  className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-[var(--muted)] mb-1">Año de publicación</span>
                <input
                  type="text"
                  value={citeYear}
                  onChange={e => setCiteYear(e.target.value)}
                  maxLength={LIMITS.CITA_ANIO}
                  className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                />
              </label>
              <label className="block sm:col-span-2 lg:col-span-1">
                <span className="block text-xs font-bold text-[var(--muted)] mb-1">Título de la obra, artículo o web</span>
                <input
                  type="text"
                  value={citeTitle}
                  onChange={e => setCiteTitle(e.target.value)}
                  maxLength={LIMITS.CITA_TITULO}
                  className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-[var(--muted)] mb-1">Editorial, Universidad o Sitio Web</span>
                <input
                  type="text"
                  value={citeSource}
                  onChange={e => setCiteSource(e.target.value)}
                  maxLength={LIMITS.CITA_TITULO}
                  className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-[var(--muted)] mb-1">URL o DOI</span>
                <input
                  type="text"
                  value={citeUrl}
                  onChange={e => setCiteUrl(e.target.value)}
                  maxLength={LIMITS.CITA_URL}
                  className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-2 gap-3.5">
              {[
                { name: 'Formato APA (7.ª Edición)', value: citationsOutput.apa7 },
                { name: 'Formato MLA (9.ª Edición)', value: citationsOutput.mla9 },
                { name: 'Norma ISO 690 (España / UE)', value: citationsOutput.iso690 },
                { name: 'Estilo Harvard', value: citationsOutput.harvard },
                { name: 'Estilo Chicago', value: citationsOutput.chicago },
                { name: 'Código BibTeX (LaTeX / Overleaf)', value: citationsOutput.bibtex }
              ].map(item => (
                <div
                  key={item.name}
                  onClick={() => copyText(item.value, `${item.name} copiado`)}
                  className="cursor-pointer p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/75 hover:border-[var(--brand2)] transition flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-extrabold text-[var(--brand2)]">{item.name}</strong>
                    <span className="text-[11px] font-bold text-[var(--muted)]">Copiar</span>
                  </div>
                  <pre className="text-xs font-mono text-[var(--text)] whitespace-pre-wrap break-words">
                    {item.value}
                  </pre>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--line)]">
              <span className="text-xs text-[var(--muted)]">
                Haz clic en cualquier norma para copiarla individualmente o exporta la hoja bibliográfica completa:
              </span>
              <button
                type="button"
                onClick={() =>
                  downloadTxt(
                    '930text-bibliografia-6-normas.txt',
                    `REFERENCIA BIBLIOGRÁFICA OFICIAL (6 NORMAS) · 930TEXT\n=======================================================\n\n1. APA 7.ª EDICIÓN:\n${citationsOutput.apa7}\n\n2. MLA 9.ª EDICIÓN:\n${citationsOutput.mla9}\n\n3. NORMA ISO 690:\n${citationsOutput.iso690}\n\n4. ESTILO HARVARD:\n${citationsOutput.harvard}\n\n5. ESTILO CHICAGO:\n${citationsOutput.chicago}\n\n6. BIBTEX (LATEX):\n${citationsOutput.bibtex}`
                  )
                }
                className="h-9 px-3.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5 shrink-0" /> Descargar las 6 Normas (.TXT)
              </button>
            </div>
          </div>
        )}

        {labTab === 'plantillas' && (
          <div className="rounded-[24px] sm:rounded-[28px] studio-console p-4 sm:p-6 space-y-5">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {EXECUTIVE_TEMPLATES.map(tpl => (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => setTplSelected(tpl.id)}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    tplSelected === tpl.id
                      ? 'border-[var(--brand2)] bg-[var(--brand-soft)]'
                      : 'border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-xs font-extrabold text-[var(--text)]">{tpl.label}</strong>
                    <span className="text-[10px] font-bold text-[var(--gold)]">{tpl.badge}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-[var(--muted)] leading-snug">{tpl.description}</p>
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-4">
              <div className="lg:col-span-5 space-y-3">
                <label className="block">
                  <span className="block text-xs font-bold text-[var(--muted)] mb-1">Tema, proyecto o motivo</span>
                  <input
                    type="text"
                    value={tplTopic}
                    onChange={e => setTplTopic(e.target.value)}
                    maxLength={LIMITS.PLANTILLAS}
                    className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                  />
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <label className="block">
                    <span className="block text-xs font-bold text-[var(--muted)] mb-1">Destinatario</span>
                    <input
                      type="text"
                      value={tplRecipient}
                      onChange={e => setTplRecipient(e.target.value)}
                      maxLength={LIMITS.CITA_AUTOR}
                      className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                    />
                  </label>
                  <label className="block">
                    <span className="block text-xs font-bold text-[var(--muted)] mb-1">Tu nombre / firma</span>
                    <input
                      type="text"
                      value={tplSender}
                      onChange={e => setTplSender(e.target.value)}
                      maxLength={LIMITS.CITA_AUTOR}
                      className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                    />
                  </label>
                </div>
                <label className="block">
                  <span className="block text-xs font-bold text-[var(--muted)] mb-1">Llamada a la acción (CTA)</span>
                  <input
                    type="text"
                    value={tplCta}
                    onChange={e => setTplCta(e.target.value)}
                    maxLength={LIMITS.SEARCH_REPLACE}
                    className="w-full h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold"
                  />
                </label>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between">
                <textarea
                  value={tplGenerated}
                  readOnly
                  rows={8}
                  className="w-full p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-xs sm:text-sm text-[var(--text)] leading-relaxed"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => copyText(tplGenerated, 'Plantilla copiada al portapapeles')}
                    className="h-10 px-4 rounded-xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-white text-xs font-extrabold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Copy className="w-3.5 h-3.5 shrink-0" /> Copiar mensaje listo
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadTxt('930text-comunicado.txt', tplGenerated)}
                    className="h-10 px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" /> Descargar TXT
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const allTpls = EXECUTIVE_TEMPLATES.map(
                        t => `=== ${t.label.toUpperCase()} (${t.badge}) ===\n${t.build(tplTopic, tplSender, tplRecipient, tplCta)}`
                      ).join('\n\n----------------------------------------\n\n');
                      downloadTxt('930text-pack-6-plantillas-b2b.txt', allTpls);
                    }}
                    className="h-10 px-3.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" /> Descargar las 6 Plantillas
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
