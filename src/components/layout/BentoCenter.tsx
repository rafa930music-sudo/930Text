import React from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { TOOL_CATALOG } from '../../data/catalogData';

interface BentoCenterProps {
  toolSearch: string;
  setToolSearch: (search: string) => void;
  recentTools: string[];
  setRecentTools: (tools: string[]) => void;
  recordRecentTool: (toolId: string) => void;
  filteredTools: typeof TOOL_CATALOG;
}

export const BentoCenter: React.FC<BentoCenterProps> = ({
  toolSearch,
  setToolSearch,
  recentTools,
  setRecentTools,
  recordRecentTool,
  filteredTools
}) => {
  const [isGridCollapsed, setIsGridCollapsed] = React.useState(false);
  const [activeStory, setActiveStory] = React.useState<string | null>(null);

  const instagramStories = [
    { id: 'fuente', label: 'Letras IG', icon: '✨', href: '#fuente', color: 'from-pink-500 via-purple-500 to-indigo-500' },
    { id: 'traductor', label: 'Traductor', icon: '🌍', href: '#traductor', color: 'from-cyan-500 via-blue-500 to-indigo-600' },
    { id: 'resumidor', label: 'Resumidor', icon: '🎯', href: '#resumidor', color: 'from-amber-500 via-orange-500 to-rose-500' },
    { id: 'mejorador', label: 'Corrector', icon: '✍️', href: '#mejorador', color: 'from-emerald-500 via-teal-500 to-cyan-500' },
    { id: 'limpiador', label: 'Limpiador', icon: '🧹', href: '#limpiador', color: 'from-purple-500 via-pink-500 to-rose-500' },
    { id: 'analizador', label: 'Auditoría SEO', icon: '📊', href: '#analizador', color: 'from-blue-600 via-indigo-600 to-violet-600' },
    { id: 'convertidor', label: '20 en 1', icon: '⚡', href: '#convertidor', color: 'from-yellow-500 via-amber-600 to-red-600' },
    { id: 'rimar', label: 'Rimas & Música', icon: '🎶', href: '#rimar', color: 'from-fuchsia-500 via-purple-600 to-cyan-500' },
    { id: 'autopilot', label: 'Autopilot 5 en 1', icon: '🚀', href: '#autopilot', color: 'from-emerald-400 via-teal-500 to-blue-600' },
    { id: 'laboratorio', label: 'Citas APA & Diff', icon: '💼', href: '#laboratorio', color: 'from-rose-500 via-purple-500 to-indigo-600' },
  ];

  return (
    <section id="centro" className="py-10 sm:py-16 border-t border-[var(--line)]">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        {/* Instagram-style Stories / Highlights Bar */}
        <div className="mb-8 pb-4 border-b border-[var(--line)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[var(--muted)] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 animate-ping" />
              Historias & Accesos Destacados IG-Style
            </span>
            <span className="text-[11px] font-bold text-[var(--brand2)]">10 Suites Verificadas</span>
          </div>
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 px-1">
            {instagramStories.map(story => (
              <a
                key={story.id}
                href={story.href}
                onClick={() => {
                  setActiveStory(story.id);
                  recordRecentTool(story.id);
                }}
                className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
              >
                <div className={`w-16 h-16 sm:w-18 sm:h-18 rounded-full p-[3px] bg-gradient-to-tr ${story.color} group-hover:scale-105 transition shadow-md`}>
                  <div className="w-full h-full rounded-full bg-[var(--surface)] border-2 border-[var(--bg)] flex items-center justify-center text-2xl group-hover:bg-[var(--surface2)] transition">
                    {story.icon}
                  </div>
                </div>
                <span className="text-[11px] font-bold text-[var(--text)] text-center max-w-[72px] truncate group-hover:text-[var(--brand2)] transition">
                  {story.label}
                </span>
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-5 mb-6 sm:mb-7">
          <div>
            <div className="flex items-center gap-2">
              <span className="section-number">CENTRO DE OPERACIONES</span>
              <button
                type="button"
                onClick={() => setIsGridCollapsed(prev => !prev)}
                className="text-[11px] font-bold text-[var(--brand2)] hover:underline ml-2"
              >
                {isGridCollapsed ? '▶ Expandir catálogo (10)' : '▼ Colapsar catálogo'}
              </button>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-[var(--text)]">
              Las 10 Suites de 930Text
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[var(--muted)]">
              Elige cualquier herramienta o usa el buscador rápido <kbd className="px-1.5 py-0.5 rounded border border-[var(--line)] text-[10px]">Ctrl+K</kbd>.
            </p>
          </div>

          <label
            htmlFor="tool-search"
            className="flex items-center gap-2.5 h-11 px-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] w-full md:w-auto md:min-w-[280px] focus-within:border-[var(--brand2)]"
          >
            <Search className="w-4 h-4 text-[var(--gold)] shrink-0" />
            <input
              id="tool-search"
              type="text"
              value={toolSearch}
              onChange={e => setToolSearch(e.target.value)}
              placeholder="Buscar herramienta (ej. resumir, correo, fuentes)…"
              className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-[var(--text)]"
            />
            {toolSearch && (
              <button
                type="button"
                onClick={() => setToolSearch('')}
                aria-label="Limpiar búsqueda"
                className="text-xs font-bold text-[var(--muted)] hover:text-[var(--text)]"
              >
                ×
              </button>
            )}
          </label>
        </div>

        {/* Recents Bar in Tool Center */}
        {recentTools.length > 0 && (
          <div className="mb-6 p-3.5 sm:px-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-3.5 flex-wrap">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-[var(--muted)] mr-1">Recientes:</span>
              {recentTools.map(rId => {
                const found = TOOL_CATALOG.find(t => t.id === rId);
                if (!found) return null;
                return (
                  <a
                    key={rId}
                    href={found.href}
                    className="px-2.5 py-1 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-[11px] font-bold text-[var(--text)] hover:border-[var(--brand)] transition"
                  >
                    {found.title}
                  </a>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  setRecentTools([]);
                  localStorage.removeItem('930text-recents');
                }}
                className="ml-1 text-[11px] font-semibold text-[var(--muted)] hover:text-[var(--text)]"
              >
                Limpiar
              </button>
            </div>
          </div>
        )}

        {!isGridCollapsed && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {filteredTools.map(tool => {
              const IconComp = tool.icon;
              return (
                <a
                  key={tool.id}
                  href={tool.href}
                  onClick={() => recordRecentTool(tool.id)}
                  className={`p-6 rounded-[24px] flex flex-col justify-between min-h-[196px] ${
                    tool.featuredMusic ? 'bento-card-music' : 'bento-card'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="section-number">{tool.index}</span>
                    <span
                      className={`w-11 h-11 rounded-2xl grid place-items-center border ${
                        tool.featuredMusic
                          ? 'bg-[var(--brand2)]/15 text-[var(--brand2)] border-[var(--brand2)]/30'
                          : 'bg-[var(--brand-soft)] text-[var(--brand)] border-[var(--brand)]/25'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="my-3">
                    <strong className="font-display text-lg font-extrabold text-[var(--text)] block">
                      {tool.title}
                    </strong>
                    <span className="mt-1 text-xs text-[var(--muted)] block leading-snug">
                      {tool.subtitle}
                    </span>
                  </div>

                  <div className="pt-2.5 border-t border-[var(--line)]/70 flex items-center justify-between gap-2 text-[11px] font-mono text-[var(--muted)]">
                    <span className="break-words leading-tight">{tool.sample}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[var(--brand2)]" />
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
