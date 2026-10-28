import React from 'react';
import { ArrowRight, Wand2, Download } from 'lucide-react';
import { DICTIONARY_TOTAL_WORDS } from '../../utils/rhymeTools';
import { convertTextFormat } from '../../utils/textTools';
import { LIMITS } from '../../config/limits';

interface HeroProps {
  zenText: string;
  autoInput: string;
  sumInput?: string;
  impInput?: string;
  fontInput?: string;
  openExportModal: (title: string, content: string) => void;
  heroDemoTab: 'fuentes' | 'correccion' | 'metricas' | 'rimas';
  setHeroDemoTab: (tab: 'fuentes' | 'correccion' | 'metricas' | 'rimas') => void;
  heroDemoText: string;
  setHeroDemoText: (text: string) => void;
  heroLiveFonts: { name: string; output: string }[];
  heroLiveAnalysis: { words: number; chars: number; huertaReadability: number; huertaLabel: string };
  heroLiveMeter: { endingWord: string; metricSyllables: number };
  heroLiveRhymes: { word: string; syllableBreakdown: string }[];
  copyText: (text: string, label?: string) => void;
  setFontInput: (val: string) => void;
  setImpInput: (val: string) => void;
  setAnInput: (val: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  zenText,
  autoInput,
  sumInput = "",
  impInput = "",
  fontInput = "",
  openExportModal,
  heroDemoTab,
  setHeroDemoTab,
  heroDemoText,
  setHeroDemoText,
  heroLiveFonts,
  heroLiveAnalysis,
  heroLiveMeter,
  heroLiveRhymes,
  copyText,
  setFontInput,
  setImpInput,
  setAnInput
}) => {
  return (
    <section id="inicio" className="pt-7 pb-10 sm:pt-12 sm:pb-14">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5 grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left Column: Universal Value Proposition */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/35 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 text-[11px] font-extrabold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                <span>Motor Lingüístico Local Activo · Cero Latencia · 100% Privado</span>
              </div>
              <div className="text-[11px] sm:text-xs font-bold text-[var(--gold)] tracking-wide">
                ESTUDIANTES · PROFESIONALES · CREADORES · ESCRITORES
              </div>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight leading-[1.06] text-balance">
              <span className="block text-[var(--brand2)] text-xs sm:text-sm font-black tracking-[0.25em] uppercase mb-1.5">
                UN TEXTO, MÚLTIPLES POSIBILIDADES
              </span>
              Todo lo que necesitas hacer con tu texto,{' '}
              <span className="bg-gradient-to-r from-[var(--brand)] via-[var(--brand2)] to-[var(--gold)] bg-clip-text text-transparent">
                resuelto en segundos.
              </span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-[var(--muted)] max-w-[58ch] leading-relaxed">
              Resume apuntes o informes, corrige la ortografía, limpia formato de PDFs, traduce tanto tus textos como toda la web en más de 105 idiomas, audita el SEO, cambia fuentes Unicode o busca rimas y estrofas en 7 idiomas y +15.000 voces.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <a
                href="#centro"
                className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-2xl font-extrabold text-sm text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] shadow-lg hover:brightness-110 active:scale-95 transition whitespace-nowrap"
              >
                Ver las 10 Suites <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#autopilot"
                className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-2xl font-extrabold text-sm border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--brand2)] transition whitespace-nowrap"
              >
                <Wand2 className="w-4 h-4 text-[var(--brand2)]" /> Autopilot 5 en 1
              </a>
              <button
                type="button"
                onClick={() =>
                  openExportModal(
                    'Documento 930Text',
                    zenText || autoInput || sumInput || impInput || fontInput || '930Text'
                  )
                }
                title="Abrir panel de exportación a archivo .txt, PDF o tarjeta social"
                className="inline-flex items-center justify-center gap-2 h-11 px-4 rounded-2xl font-extrabold text-xs sm:text-sm border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--gold)] transition whitespace-nowrap"
              >
                <Download className="w-4 h-4 text-[var(--gold)]" /> Exportar borrador (.txt / PDF)
              </button>
            </div>
          </div>

          {/* Quantitative Architecture Bar */}
          <div className="mt-6 pt-5 border-t border-[var(--line)] grid grid-cols-3 gap-3">
            <div>
              <strong className="block font-display text-xl sm:text-2xl font-extrabold tabular-nums text-[var(--text)]">
                10 Suites
              </strong>
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--muted)] block">
                Integradas en 1 web
              </span>
            </div>
            <div>
              <strong className="block font-display text-xl sm:text-2xl font-extrabold tabular-nums text-[var(--brand2)]">
                {DICTIONARY_TOTAL_WORDS.toLocaleString('es-ES')}+
              </strong>
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--muted)] block">
                Voces y rimas en español
              </span>
            </div>
            <div>
              <strong className="block font-display text-xl sm:text-2xl font-extrabold tabular-nums text-[var(--gold)]">
                100% Gratis
              </strong>
              <span className="text-[11px] sm:text-xs font-semibold text-[var(--muted)] block">
                Sin registro · Hasta 100.000 caracteres por herramienta · Sin coste
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive Studio Console in Hero */}
        <div className="lg:col-span-6 flex">
          <div className="w-full rounded-[24px] sm:rounded-[28px] studio-console p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-4 border-b border-[var(--line)]">
                <div>
                  <span className="section-number">PRUEBA RÁPIDA EN VIVO</span>
                  <h2 className="text-base font-extrabold text-[var(--text)]">
                    Transforma cualquier frase al instante
                  </h2>
                </div>

                {/* Interactive Mode Switch */}
                <div className="grid grid-cols-4 sm:flex items-center gap-1 p-1 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
                  {(
                    [
                      ['fuentes', 'Fuentes'],
                      ['correccion', 'Formatos'],
                      ['metricas', 'Métricas'],
                      ['rimas', 'Rimas']
                    ] as const
                  ).map(([tabId, label]) => (
                    <button
                      key={tabId}
                      type="button"
                      onClick={() => setHeroDemoTab(tabId)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap ${
                        heroDemoTab === tabId
                          ? 'bg-[var(--brand)] text-white'
                          : 'text-[var(--muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Input */}
              <div className="mt-4">
                <label htmlFor="hero-live-input" className="block text-xs font-bold text-[var(--muted)] mb-1.5">
                  Escribe una frase, titular o verso:
                </label>
                <input
                  id="hero-live-input"
                  type="text"
                  value={heroDemoText}
                  onChange={e => setHeroDemoText(e.target.value)}
                  maxLength={LIMITS.GLOBAL_MAX}
                  placeholder="Escribe cualquier texto para transformarlo…"
                  className="w-full h-11 px-4 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-sm font-semibold text-[var(--text)]"
                />
              </div>

              {/* Live Output based on selected tab */}
              <div className="mt-4">
                {heroDemoTab === 'fuentes' && (
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {heroLiveFonts.map(f => (
                      <div
                        key={f.name}
                        onClick={() => copyText(f.output, `Copiado: ${f.name}`)}
                        className="cursor-pointer p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)]/70 hover:border-[var(--brand2)] transition flex flex-col justify-between gap-1"
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--muted)] font-bold">
                          <span>{f.name}</span>
                          <span className="text-[var(--brand2)] shrink-0">Copiar</span>
                        </div>
                        <p data-no-i18n="true" className="mt-1 text-sm font-semibold text-[var(--text)] break-words leading-snug">{f.output}</p>
                      </div>
                    ))}
                  </div>
                )}

                {heroDemoTab === 'correccion' && (
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {[
                      { label: 'MAYÚSCULAS', val: convertTextFormat(heroDemoText, 'upper') },
                      { label: 'Tipo Título Editorial', val: convertTextFormat(heroDemoText, 'title') },
                      { label: 'URL Slug SEO', val: convertTextFormat(heroDemoText, 'slug') },
                      { label: 'Hashtags Automáticos', val: convertTextFormat(heroDemoText, 'hashtags') }
                    ].map(item => (
                      <div
                        key={item.label}
                        onClick={() => copyText(item.val, `Copiado: ${item.label}`)}
                        className="cursor-pointer p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)]/70 hover:border-[var(--brand2)] transition"
                      >
                        <div className="flex items-center justify-between gap-2 text-[11px] text-[var(--muted)] font-bold">
                          <span>{item.label}</span>
                          <span className="text-[var(--brand2)] shrink-0">Copiar</span>
                        </div>
                        <p data-no-i18n="true" className="mt-1 text-xs font-mono text-[var(--text)] break-words leading-snug">{item.val}</p>
                      </div>
                    ))}
                  </div>
                )}

                {heroDemoTab === 'metricas' && (
                  <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)]/70 space-y-3">
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--line)]">
                        <strong className="block text-lg font-extrabold tabular-nums text-[var(--brand2)]">
                          {heroLiveAnalysis.words}
                        </strong>
                        <span className="text-[10px] font-bold text-[var(--muted)]">Palabras</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--line)]">
                        <strong className="block text-lg font-extrabold tabular-nums text-[var(--text)]">
                          {heroLiveAnalysis.chars}
                        </strong>
                        <span className="text-[10px] font-bold text-[var(--muted)]">Caracteres</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--line)]">
                        <strong className="block text-sm font-extrabold text-[var(--gold)] mt-1">
                          {heroLiveAnalysis.huertaLabel}
                        </strong>
                        <span className="text-[10px] font-bold text-[var(--muted)]">
                          Legibilidad ({heroLiveAnalysis.huertaReadability}/100)
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {heroDemoTab === 'rimas' && (
                  <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)]/70">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs mb-2">
                      <span className="font-bold text-[var(--muted)]">
                        Rimas para «<strong className="text-[var(--brand2)]">{heroLiveMeter.endingWord}</strong>» ({heroLiveMeter.metricSyllables} síl.):
                      </span>
                      <a href="#rimar" className="text-xs font-bold text-[var(--brand2)] hover:underline">
                        Ir a Rimar →
                      </a>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {heroLiveRhymes.length > 0 ? (
                        heroLiveRhymes.map(r => (
                          <button
                            key={r.word}
                            type="button"
                            onClick={() => copyText(r.word, `Rima copiada: ${r.word}`)}
                            className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] text-left hover:border-[var(--brand2)] transition"
                          >
                            <strong className="block text-xs font-extrabold text-[var(--text)] break-words">{r.word}</strong>
                            <span className="text-[10px] font-mono text-[var(--muted)] break-words block">{r.syllableBreakdown}</span>
                          </button>
                        ))
                      ) : (
                        <span className="col-span-full text-xs text-[var(--muted)]">
                          Escribe otra palabra final para explorar rimas instantáneas.
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted)]">
              <span>Haz clic en cualquier tarjeta para copiar</span>
              <button
                type="button"
                onClick={() => {
                  setFontInput(heroDemoText);
                  setImpInput(heroDemoText);
                  setAnInput(heroDemoText);
                  const el = document.getElementById('fuente');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-extrabold text-[var(--brand2)] hover:underline"
              >
                Abrir en suite completa →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
