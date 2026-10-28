import React, { useState, useMemo } from 'react';
import { FontStyleDef, FontFrameDef, FONT_FRAMES } from '../../utils/textTools';
import { LIMITS } from '../../config/limits';
import { Copy, QrCode, ImageIcon, Star, Sparkles, Search, RotateCcw } from 'lucide-react';

interface FontSuiteProps {
  input: string;
  onInputChange: (val: string) => void;
  fontStyles: FontStyleDef[];
  activeFrame: FontFrameDef;
  onFrameChange: (frameId: string) => void;
  onCopy: (text: string, label: string) => void;
  onOpenQr: (title: string, text: string) => void;
  onOpenSocialCard: (text: string, author: string) => void;
  favoriteFonts: string[];
  toggleFavFont: (id: string) => void;
  copyText: (text: string, label: string) => void;
}

const CATEGORIES = [
  { id: 'todas', label: 'Todas las fuentes' },
  { id: 'destacadas', label: '★ Favoritas & Destacadas' },
  { id: 'redes', label: 'Redes & Bios' },
  { id: 'goticas', label: 'Góticas & Antiguas' },
  { id: 'cursivas', label: 'Cursivas & Caligrafía' },
  { id: 'simbolos', label: 'Simbolismos & Vaporwave' }
];

export const FontSuite: React.FC<FontSuiteProps> = ({
  input,
  onInputChange,
  fontStyles,
  activeFrame,
  onFrameChange,
  onCopy,
  onOpenQr,
  onOpenSocialCard,
  favoriteFonts,
  toggleFavFont,
  copyText
}) => {
  const [activeCategory, setActiveCategory] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFonts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return fontStyles.filter(style => {
      const isFav = favoriteFonts.includes(style.id);
      const nameLower = style.name.toLowerCase();
      const idLower = style.id.toLowerCase();
      const catLower = (style.category || '').toLowerCase();

      let matchesCategory = false;
      if (activeCategory === 'todas') {
        matchesCategory = true;
      } else if (activeCategory === 'destacadas') {
        matchesCategory = isFav;
      } else if (activeCategory === 'redes') {
        matchesCategory = catLower === 'redes' || nameLower.includes('negrita') || nameLower.includes('versalitas') || nameLower.includes('titular');
      } else if (activeCategory === 'goticas') {
        matchesCategory = catLower === 'urbano' || idLower.includes('gothic') || nameLower.includes('gótico') || nameLower.includes('runic') || idLower.includes('doublegothic');
      } else if (activeCategory === 'cursivas') {
        matchesCategory = catLower === 'elegantes' || idLower.includes('italic') || idLower.includes('script') || nameLower.includes('cursiva') || nameLower.includes('caligráfica');
      } else if (activeCategory === 'simbolos') {
        matchesCategory = catLower === 'decorativas' || idLower.includes('bubble') || idLower.includes('square') || idLower.includes('sparkle') || idLower.includes('mark') || nameLower.includes('burbuja') || nameLower.includes('tachado') || nameLower.includes('vaporwave') || nameLower.includes('espejo') || nameLower.includes('invertido');
      } else {
        matchesCategory = catLower === activeCategory.toLowerCase();
      }

      const matchesQuery =
        !q ||
        nameLower.includes(q) ||
        idLower.includes(q);

      return matchesCategory && matchesQuery;
    });
  }, [fontStyles, activeCategory, favoriteFonts, searchQuery]);

  return (
    <section id="fuente" className="py-10 sm:py-16 border-t border-[var(--line)] bg-[var(--surface)]/35">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="section-number">SUITE 01</span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 text-[var(--text)]">
              Fuentes Unicode Pro & Marcos Estéticos
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[var(--muted)] max-w-[65ch]">
              Transforma tu texto con más de 44 familias tipográficas Unicode compatibles con Instagram, WhatsApp, TikTok, X (Twitter) y LinkedIn. Sin plugins ni descargas.
            </p>
          </div>

          {/* Search Box */}
          <div className="flex items-center gap-2 h-11 px-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] w-full md:w-auto md:min-w-[280px]">
            <Search className="w-4 h-4 text-[var(--brand2)] shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar estilo o tipo de fuente…"
              className="w-full bg-transparent border-0 outline-none text-xs font-semibold text-[var(--text)] placeholder:text-[var(--muted)]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-xs font-bold text-[var(--muted)] hover:text-[var(--text)]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Input Box & Frame Selector */}
        <div className="rounded-[24px] studio-console p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="font-suite-input" className="text-xs font-bold text-[var(--muted)]">
              Escribe o pega el texto para previsualizar todas las fuentes:
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-[var(--muted)]">
                {input.length}/{LIMITS.GLOBAL_MAX}
              </span>
              {input && (
                <button
                  type="button"
                  onClick={() => onInputChange('')}
                  className="p-1 rounded-lg text-xs font-bold text-[var(--muted)] hover:text-[var(--danger)] transition"
                  title="Limpiar entrada"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <textarea
            id="font-suite-input"
            value={input}
            onChange={e => onInputChange(e.target.value)}
            maxLength={LIMITS.GLOBAL_MAX}
            rows={3}
            placeholder="Escribe aquí tu frase, nombre de perfil, biografía o titular…"
            className="w-full p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-sm font-semibold text-[var(--text)] placeholder:text-[var(--muted)] leading-relaxed focus:outline-none focus:border-[var(--brand2)]"
          />

          {/* Marcos Estéticos (Frame Selector) */}
          <div className="space-y-2 pt-2 border-t border-[var(--line)]/60">
            <span className="block text-xs font-bold text-[var(--muted)]">
              Marcos y encuadres decorativos:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {FONT_FRAMES.map(frame => {
                const isActive = activeFrame.id === frame.id;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => onFrameChange(frame.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'border-[var(--brand2)] bg-[var(--brand2)]/15 text-[var(--brand2)] shadow-xs'
                        : 'border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {frame.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categories Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 border-t border-[var(--line)]/60">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'border-[var(--brand)] bg-[var(--brand)] text-white shadow-xs'
                      : 'border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--brand2)]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredFonts.length === 0 ? (
            <div className="col-span-full p-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-center text-xs text-[var(--muted)]">
              No se encontraron estilos para la categoría o búsqueda «{searchQuery}».
            </div>
          ) : (
            filteredFonts.map(style => {
              const baseText = input || '930Text · Estudio Tipográfico';
              const formatted = activeFrame.wrap(style.transform(baseText));
              const isFav = favoriteFonts.includes(style.id);

              return (
                <div
                  key={style.id}
                  className="p-4 rounded-[22px] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--brand2)]/60 transition shadow-xs flex flex-col justify-between gap-3 group"
                >
                  {/* Card Top Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-[var(--line)]/60 pb-2">
                    <span className="text-xs font-extrabold text-[var(--muted)] group-hover:text-[var(--brand2)] transition">
                      {style.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFavFont(style.id)}
                      title={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                      className={`p-1 rounded-lg transition ${
                        isFav ? 'text-[var(--gold)]' : 'text-[var(--muted)] hover:text-[var(--gold)]'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-[var(--gold)]' : ''}`} />
                    </button>
                  </div>

                  {/* Transformed Text Output */}
                  <p
                    data-no-i18n="true"
                    className="text-base sm:text-lg font-semibold text-[var(--text)] break-words leading-relaxed my-1 min-h-[44px] flex items-center"
                  >
                    {formatted}
                  </p>

                  {/* Card Bottom Actions */}
                  <div className="pt-2 border-t border-[var(--line)]/60 flex items-center justify-between gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => onCopy(formatted, `Copiado: ${style.name}`)}
                      className="px-3 py-1.5 rounded-xl bg-[var(--brand-soft)] text-[var(--brand2)] border border-[var(--brand2)]/40 font-extrabold hover:bg-[var(--brand2)] hover:text-white transition inline-flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" /> Copiar
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onOpenQr(`Estilo: ${style.name}`, formatted)}
                        title="Generar código QR"
                        className="p-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--brand2)] transition"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenSocialCard(formatted, style.name)}
                        title="Generar tarjeta de imagen social"
                        className="p-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--brand2)] transition"
                      >
                        <ImageIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
