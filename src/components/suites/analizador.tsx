import React, { useState, useMemo } from 'react';
import { analyzeText } from '../../utils/textTools';
import { buildSerpPreview } from '../../utils/enterpriseTools';
import { LIMITS } from '../../config/limits';
import {
  ClipboardPaste,
  Wand2,
  Download
} from 'lucide-react';

export interface AnalizadorSuiteProps {
  input?: string;
  onInputChange?: (val: string) => void;
  copyText: (text: string, label?: string) => void;
  downloadTxt: (filename: string, content: string) => void;
  sampleText?: string;
}

const DEFAULT_SAMPLE = 'El desarrollo web moderno requiere altos estándares de calidad y rendimiento técnico. El desarrollo web ágil combina pruebas continuas y arquitectura modular limpia. Cada componente de desarrollo web debe responder a criterios accesibles de usabilidad universal.';

export const AnalizadorSuite: React.FC<AnalizadorSuiteProps> = ({
  input,
  onInputChange,
  copyText,
  downloadTxt,
  sampleText = DEFAULT_SAMPLE
}) => {
  const [internalInput, setInternalInput] = useState<string>(sampleText);
  const anInput = input !== undefined ? input : internalInput;
  const setAnInput = onInputChange || setInternalInput;

  const [serpCustomTitle, setSerpCustomTitle] = useState('');
  const [serpCustomDesc, setSerpCustomDesc] = useState('');
  const [serpDomain, setSerpDomain] = useState('930text.es');

  const analysisMetrics = useMemo(() => analyzeText(anInput), [anInput]);
  const serpPreview = useMemo(
    () => buildSerpPreview(anInput, serpCustomTitle, serpCustomDesc, serpDomain),
    [anInput, serpCustomTitle, serpCustomDesc, serpDomain]
  );

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setAnInput(text);
      }
    } catch {
      // ignore
    }
  };

  return (
    <section id="analizador" className="py-10 sm:py-16 border-t border-[var(--line)] bg-[var(--surface)]/35">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <span className="section-number">SUITE 06 · AUDITORÍA LÉXICA, LEGIBILIDAD & SIMULADOR SERP GOOGLE</span>
        <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-balance mt-1">
          Analizador de Texto, Densidad SEO y Simulador SERP
        </h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-base text-[var(--muted)] max-w-2xl">
          Mide legibilidad Fernández Huerta, tono predominante, densidad porcentual de palabras clave y previsualiza tu resultado en Google Search y redes sociales en vivo.
        </p>

        <div className="mt-5 sm:mt-6 rounded-[22px] sm:rounded-[28px] studio-console overflow-hidden p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="text-xs font-extrabold text-[var(--muted)]">Texto a inspeccionar</span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
              <button
                type="button"
                onClick={pasteFromClipboard}
                className="h-8 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1"
              >
                <ClipboardPaste className="w-3.5 h-3.5 text-[var(--brand2)]" /> Pegar
              </button>
              <button
                type="button"
                onClick={() => setAnInput(sampleText)}
                className="h-8 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--gold)] inline-flex items-center gap-1"
              >
                <Wand2 className="w-3.5 h-3.5 text-[var(--gold)]" /> Ejemplo
              </button>
              <span className="text-xs text-[var(--muted)] tabular-nums">{anInput.length} / {LIMITS.GLOBAL_MAX}</span>
              <button
                type="button"
                onClick={() => {
                  const report = [
                    `Palabras: ${analysisMetrics.words} · Caracteres: ${analysisMetrics.chars} (sin espacios: ${analysisMetrics.charsNoSpaces})`,
                    `Frases: ${analysisMetrics.sentences} (más larga: ${analysisMetrics.longestSentenceWords} pal.) · Párrafos: ${analysisMetrics.paragraphs}`,
                    `Tiempo de lectura: ${analysisMetrics.readingTimeMin} min · Locución: ${analysisMetrics.speakingTimeSec} s`,
                    `Legibilidad Fernández Huerta: ${analysisMetrics.huertaReadability}/100 (${analysisMetrics.huertaLabel}) · Tono: ${analysisMetrics.toneIndicator}`,
                    `Palabras clave: ${analysisMetrics.keywords.map(k => `${k.word} (${k.count} - ${k.densityPct}%)`).join(', ')}`
                  ].join('\n');
                  copyText(report, 'Informe completo copiado');
                }}
                className="h-8 px-2.5 sm:px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand)]"
              >
                Copiar informe
              </button>
            </div>
          </div>

          <textarea
            value={anInput}
            onChange={e => setAnInput(e.target.value)}
            maxLength={LIMITS.GLOBAL_MAX}
            rows={5}
            placeholder="Pega o escribe tu texto para auditar todas sus métricas en tiempo real…"
            className="w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--text)] resize-y"
          />

          <div className="mt-4 sm:mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            <div className="p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-center">
              <strong className="block text-lg sm:text-xl font-extrabold tabular-nums">{analysisMetrics.words}</strong>
              <span className="text-[10px] sm:text-[11px] text-[var(--muted)] font-bold">Palabras</span>
            </div>
            <div className="p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-center">
              <strong className="block text-lg sm:text-xl font-extrabold tabular-nums">{analysisMetrics.chars}</strong>
              <span className="text-[10px] sm:text-[11px] text-[var(--muted)] font-bold">
                Caract. ({analysisMetrics.charsNoSpaces})
              </span>
            </div>
            <div className="p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-center">
              <strong className="block text-lg sm:text-xl font-extrabold tabular-nums">{analysisMetrics.sentences}</strong>
              <span className="text-[10px] sm:text-[11px] text-[var(--muted)] font-bold">
                Frases ({analysisMetrics.avgWordsPerSentence} p/f)
              </span>
            </div>
            <div className="p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-center">
              <strong className="block text-lg sm:text-xl font-extrabold tabular-nums">
                {analysisMetrics.readingTimeMin} min
              </strong>
              <span className="text-[10px] sm:text-[11px] text-[var(--muted)] font-bold">
                Lectura ({analysisMetrics.speakingTimeSec}s)
              </span>
            </div>
            <div className="p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-center">
              <strong className="block text-lg sm:text-xl font-extrabold tabular-nums text-[var(--brand2)]">
                {analysisMetrics.huertaReadability}
              </strong>
              <span className="text-[10px] sm:text-[11px] text-[var(--muted)] font-bold break-words block">
                {analysisMetrics.huertaLabel}
              </span>
            </div>
            <div className="p-3 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-center">
              <strong className="block text-xs sm:text-sm font-extrabold break-words text-[var(--gold)] mt-1">
                {analysisMetrics.toneIndicator}
              </strong>
              <span className="text-[10px] sm:text-[11px] text-[var(--muted)] font-bold">
                Variedad: {analysisMetrics.uniquePercentage}%
              </span>
            </div>
          </div>

          <div className="mt-3.5 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
            {[
              { name: 'X / Post', limit: 280 },
              { name: 'Instagram Bio', limit: 150 },
              { name: 'Meta Description SEO', limit: 160 },
              { name: 'LinkedIn Post', limit: 3000 }
            ].map(plat => {
              const pct = Math.min(100, Math.round((analysisMetrics.chars / plat.limit) * 100));
              const over = analysisMetrics.chars > plat.limit;
              return (
                <div key={plat.name} className="p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)]/60">
                  <div className="flex justify-between font-bold mb-1">
                    <span>{plat.name}</span>
                    <span className={`tabular-nums ${over ? 'text-[var(--danger)]' : 'text-[var(--muted)]'}`}>
                      {analysisMetrics.chars}/{plat.limit}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--line)] overflow-hidden">
                    <div
                      className={`h-full ${over ? 'bg-[var(--danger)]' : 'bg-[var(--brand2)]'}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-[var(--line)] space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold text-[var(--muted)] mr-1">Densidad de palabras clave:</span>
              {analysisMetrics.keywords.length > 0 ? (
                analysisMetrics.keywords.map((kw, idx) => (
                  <React.Fragment key={kw.word}>
                    {idx > 0 && <span className="text-[var(--muted)] opacity-50">·</span>}
                    <span className="text-xs font-bold text-[var(--text)]">
                      {kw.word}{' '}
                      <span className="tabular-nums text-[var(--brand2)]">
                        ({kw.count} · {kw.densityPct}%)
                      </span>
                    </span>
                  </React.Fragment>
                ))
              ) : (
                <span className="text-xs text-[var(--muted)]">
                  Escribe para calcular densidad léxica.
                </span>
              )}
            </div>

            {analysisMetrics.bigrams.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-[var(--muted)] mr-1">Expresiones frecuentes (2 pal.):</span>
                {analysisMetrics.bigrams.map((bg, idx) => (
                  <React.Fragment key={bg.phrase}>
                    {idx > 0 && <span className="text-[var(--muted)] opacity-50">·</span>}
                    <span className="text-xs font-bold text-[var(--gold)]">
                      “{bg.phrase}” ({bg.count})
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}

            {analysisMetrics.trigrams.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-[var(--muted)] mr-1">Frases SEO (3 pal.):</span>
                {analysisMetrics.trigrams.map((tg, idx) => (
                  <React.Fragment key={tg.phrase}>
                    {idx > 0 && <span className="text-[var(--muted)] opacity-50">·</span>}
                    <span className="text-xs font-bold text-[var(--brand2)]">
                      “{tg.phrase}” ({tg.count})
                    </span>
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {/* SIMULADOR EN VIVO DE GOOGLE SERP + OPENGRAPH + META TAGS */}
          <div className="mt-5 pt-5 border-t border-[var(--line)]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-[11px] font-extrabold text-[var(--brand)] uppercase tracking-wider">
                  NUEVO · SIMULADOR VISUAL GOOGLE SERP & OPENGRAPH SOCIAL
                </span>
                <h3 className="font-display text-sm sm:text-base font-extrabold text-[var(--text)]">
                  Previsualización de Snippet en Buscadores, Tarjeta Social y Código Meta HTML
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  value={serpDomain}
                  onChange={e => setSerpDomain(e.target.value)}
                  placeholder="Dominio (ej. 930text.es)"
                  className="h-8 px-2.5 rounded-lg border border-[var(--line)] bg-[var(--surface2)] text-xs font-semibold w-36"
                />
                <button
                  type="button"
                  onClick={() => copyText(serpPreview.title, 'Título SEO copiado al portapapeles')}
                  className="h-8 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand2)]"
                >
                  Copiar Title
                </button>
                <button
                  type="button"
                  onClick={() => copyText(serpPreview.description, 'Meta Description copiada al portapapeles')}
                  className="h-8 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold hover:border-[var(--brand2)]"
                >
                  Copiar Desc.
                </button>
                <button
                  type="button"
                  onClick={() => copyText(serpPreview.htmlMetaSnippet, 'Etiquetas Meta HTML y OpenGraph copiadas')}
                  className="h-8 px-3 rounded-xl bg-[var(--brand-soft)] border border-[var(--brand)]/40 text-[var(--brand)] text-xs font-extrabold hover:bg-[var(--brand)] hover:text-white transition"
                >
                  Copiar Meta Tags HTML
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const schemaJson = JSON.stringify(
                      {
                        '@context': 'https://schema.org',
                        '@type': 'Article',
                        headline: serpPreview.title,
                        description: serpPreview.description,
                        wordCount: analysisMetrics.words,
                        inLanguage: 'es-ES',
                        mainEntityOfPage: `https://${serpPreview.domain}/${serpPreview.slug}`
                      },
                      null,
                      2
                    );
                    downloadTxt(
                      '930text-auditoria-seo.txt',
                      `AUDITORÍA TÉCNICA SEO & CÓDIGO WEB · 930TEXT\n==============================================\nURL Objetivo: https://${serpPreview.domain}/${serpPreview.slug}\nPalabras: ${analysisMetrics.words} · Caracteres: ${analysisMetrics.chars}\nLegibilidad Fernández Huerta: ${analysisMetrics.huertaReadability}/100 (${analysisMetrics.huertaLabel})\nTono detectado: ${analysisMetrics.toneIndicator}\n\n1. TOP PALABRAS CLAVE (DENSIDAD):\n${analysisMetrics.keywords.map(k => `- ${k.word}: ${k.count} apariciones (${k.densityPct}%)`).join('\n')}\n\n2. ETIQUETAS META HTML & OPENGRAPH:\n${serpPreview.htmlMetaSnippet}\n\n3. DATOS ESTRUCTURADOS SCHEMA.ORG (JSON-LD):\n<script type="application/ld+json">\n${schemaJson}\n</script>`
                    );
                  }}
                  className="h-8 px-3 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] hover:brightness-110 inline-flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" /> Descargar Auditoría SEO + Schema
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-2.5 mb-3">
              <div className="space-y-1">
                <input
                  type="text"
                  value={serpCustomTitle}
                  onChange={e => setSerpCustomTitle(e.target.value)}
                  maxLength={LIMITS.SEO_TITLE}
                  placeholder={`Título SEO opcional (auto: ${serpPreview.title.slice(0, 42)}…)`}
                  className="w-full h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs text-[var(--text)]"
                />
                <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
                  <span>Google muestra ~60</span>
                  <span className={serpPreview.titleLength > 60 ? 'text-amber-400 font-bold' : ''}>
                    {serpPreview.titleLength}/60 {serpPreview.titleLength > 60 ? '(Google recortará al publicar)' : ''}
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <input
                  type="text"
                  value={serpCustomDesc}
                  onChange={e => setSerpCustomDesc(e.target.value)}
                  maxLength={LIMITS.META_DESCRIPTION}
                  placeholder="Meta Description opcional (por defecto se extrae de tu texto)…"
                  className="w-full h-9 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs text-[var(--text)]"
                />
                <div className="flex items-center justify-between text-[10px] text-[var(--muted)]">
                  <span>Google muestra ~155</span>
                  <span className={serpPreview.descLength > 155 ? 'text-amber-400 font-bold' : ''}>
                    {serpPreview.descLength}/155 {serpPreview.descLength > 155 ? '(Google recortará al publicar)' : ''}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-3.5">
              {/* Google Search Result Card */}
              <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
                <div className="flex flex-wrap items-center justify-between gap-1 text-[11px] font-bold text-[var(--muted)] mb-2">
                  <span>Vista previa en Google Search (Desktop / Mobile)</span>
                  <span
                    className={
                      serpPreview.titleStatus === 'optimal' && serpPreview.descStatus === 'optimal'
                        ? 'text-[var(--green)]'
                        : 'text-[var(--gold)]'
                    }
                  >
                    Título: {serpPreview.titleLength}/60 · Desc: {serpPreview.descLength}/155
                  </span>
                </div>
                <div data-no-i18n="true" className="text-xs text-[var(--muted)] break-all">
                  https://{serpPreview.domain}/{serpPreview.slug}
                </div>
                <div data-no-i18n="true" className="mt-1 text-base font-bold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline break-words leading-snug">
                  {serpPreview.title}
                </div>
                <p data-no-i18n="true" className="mt-1 text-xs text-[var(--muted)] leading-relaxed break-words">
                  {serpPreview.description}
                </p>
              </div>

              {/* Social OpenGraph Card (LinkedIn / X) */}
              <div className="p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] font-bold text-[var(--muted)] mb-2">
                  <span>Tarjeta OpenGraph (LinkedIn / X / WhatsApp)</span>
                  <span className="text-[var(--brand2)] uppercase font-mono text-[10px]">og:card</span>
                </div>
                <div data-no-i18n="true" className="p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)]">
                  <div className="text-[10px] font-extrabold text-[var(--brand)] uppercase tracking-wider break-all">
                    {serpPreview.domain}
                  </div>
                  <div className="font-display text-xs sm:text-sm font-extrabold text-[var(--text)] break-words leading-snug mt-0.5">
                    {serpPreview.title}
                  </div>
                  <p className="text-[11px] text-[var(--muted)] mt-1 break-words leading-relaxed">
                    {serpPreview.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
