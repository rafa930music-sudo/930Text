import React from 'react';
import { Sparkles, Command, History, Sun, Moon, WifiOff } from 'lucide-react';
import { CATALOG } from '../../config/catalog';

interface HeaderProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isOnline: boolean;
  historyLength: number;
  setIsHistoryOpen: (open: boolean) => void;
  setIsCommandOpen: (open: boolean) => void;
  setIsSiteLangModalOpen: (open: boolean) => void;
  setSiteLangSearch: (search: string) => void;
  setCommandQuery: (query: string) => void;
  setCommandIdx: (idx: number) => void;
  triggerHaptic: (ms?: number) => void;
  activeSection: string;
  navLinks: { href: string; label: string }[];
  currentSiteLangMeta: { flag: string; name: string };
  isSiteTranslating: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  toggleTheme,
  isOnline,
  historyLength,
  setIsHistoryOpen,
  setIsCommandOpen,
  setIsSiteLangModalOpen,
  setSiteLangSearch,
  setCommandQuery,
  setCommandIdx,
  triggerHaptic,
  activeSection,
  navLinks,
  currentSiteLangMeta,
  isSiteTranslating
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[var(--surface)]/85 border-b border-[var(--line)] transition-colors">
      <div className="max-w-[1260px] mx-auto px-3.5 sm:px-5 h-14 sm:h-20 flex items-center justify-between gap-2">
        {/* Zone 1: Sleek Compact Brand Logo & Title */}
        <a href="#inicio" className="flex items-center gap-1.5 sm:gap-2 group shrink-0 focus:outline-none">
          <span className="w-6.5 h-6.5 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-gradient-to-tr from-[var(--brand)] via-[var(--brand2)] to-[var(--gold)] grid place-items-center shadow-xs group-hover:scale-105 transition shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white sm:w-[18px] sm:h-[18px]">
              <path d="M4 6.5C4 5.11929 5.11929 4 6.5 4H17.5C18.8807 4 20 5.11929 20 6.5V17.5C20 18.8807 18.8807 20 17.5 20H6.5C5.11929 20 4 18.8807 4 17.5V6.5Z" stroke="currentColor" strokeWidth="2" opacity="0.3" />
              <path d="M8 8H16M8 12H14M8 16H11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="font-display text-base sm:text-xl font-black tracking-tight text-[var(--text)] group-hover:text-[var(--brand2)] transition leading-none">
            930<span className="bg-gradient-to-r from-[var(--brand)] via-[var(--brand2)] to-[var(--gold)] bg-clip-text text-transparent">Text</span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-extrabold text-[var(--muted)] tracking-wider uppercase hidden md:inline border-l border-[var(--line)] pl-2 py-0.5 leading-none">
            Estudio Textual
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-bold text-[var(--muted)]">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`py-1.5 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                activeSection === href
                  ? 'border-[var(--brand2)] text-[var(--text)]'
                  : 'border-transparent hover:text-[var(--text)]'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Quick Utilities & Global Page Language */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setSiteLangSearch('');
              setIsSiteLangModalOpen(true);
            }}
            title={`Cambiar el idioma de toda la página web (${CATALOG.LANGUAGES_LABEL})`}
            aria-label="Cambiar idioma de toda la página web"
            className="inline-flex items-center gap-1 sm:gap-2 h-8.5 sm:h-10 px-2 sm:px-3.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--text)] hover:border-[var(--brand2)] transition whitespace-nowrap shrink-0 shadow-xs"
          >
            <span data-no-i18n="true" className="text-sm sm:text-base leading-none">{currentSiteLangMeta.flag}</span>
            <span data-no-i18n="true" className="font-extrabold text-[11px] sm:text-xs max-w-[65px] sm:max-w-none truncate">{currentSiteLangMeta.name}</span>
            {isSiteTranslating ? (
              <span className="text-[10px] text-[var(--brand2)] font-bold animate-pulse">…</span>
            ) : (
              <span className="hidden md:inline text-[11px] text-[var(--brand2)] font-bold">(105)</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsCommandOpen(true);
              setCommandQuery('');
              setCommandIdx(0);
            }}
            title="Buscador rápido de herramientas (Ctrl/Cmd + K)"
            aria-label="Abrir buscador de herramientas"
            className="hidden sm:inline-flex items-center gap-1.5 h-8.5 sm:h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--brand)] transition whitespace-nowrap shrink-0"
          >
            <Command className="w-4 h-4 text-[var(--brand)] shrink-0" />
            <span className="tabular-nums">⌘K</span>
          </button>

          {/* Connectivity Pill */}
          <div
            className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-extrabold transition shrink-0 ${
              isOnline
                ? 'border-emerald-500/25 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400'
                : 'border-amber-500/35 bg-amber-500/15 text-amber-500 dark:text-amber-400 animate-pulse'
            }`}
            title={
              isOnline
                ? 'Modo Online · Privado y con 0ms de latencia'
                : 'Modo sin conexión · 8 de 10 herramientas funcionan 100% en local'
            }
          >
            {isOnline ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>Online</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 shrink-0" />
                <span>Offline (8/10)</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              triggerHaptic(10);
              setIsHistoryOpen(true);
            }}
            title="Bóveda e historial guardado"
            aria-label="Abrir bóveda e historial"
            className="relative w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl grid place-items-center border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--brand)] transition shrink-0 shadow-xs"
          >
            <History className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {historyLength > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-white text-[9px] font-black grid place-items-center shadow-xs">
                {historyLength > 99 ? '99+' : historyLength}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic(10);
              toggleTheme();
            }}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema de la interfaz"
            className="w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-xl grid place-items-center border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--brand)] transition shrink-0 shadow-xs"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--gold)]" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--brand)]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
