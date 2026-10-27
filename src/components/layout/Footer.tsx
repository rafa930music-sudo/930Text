import React from 'react';
import { Gift } from 'lucide-react';
import { CATALOG } from '../../config/catalog';
import { LEGAL_TABS, LegalTabId } from '../../data/legalData';

interface FooterProps {
  theme: 'dark' | 'light';
  setShowSplash: (show: boolean) => void;
  setLegalModalTab: (tab: LegalTabId) => void;
  openSupportModal: (amount?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme,
  setShowSplash,
  setLegalModalTab,
  openSupportModal
}) => {
  return (
    <footer className="py-12 border-t border-[var(--line)] bg-[var(--surface)] pb-10 sm:pb-12 shadow-inner">
      <div className="max-w-[1260px] mx-auto px-5">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* Col 1: Brand & Creator */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-3 font-display font-extrabold">
              <span className="w-9 h-9 rounded-2xl grid place-items-center bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#D97706] shadow-lg shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 6.5h14M5 11.5h10M5 16.5h7" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-lg font-black text-[var(--text)] tracking-tight">
                930<span className="bg-gradient-to-r from-[#38E8FF] via-[#9D8CFF] to-[#F0C96B] bg-clip-text text-transparent">Text</span>
              </span>
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Plataforma web 10 en 1 de referencia para profesionales, estudiantes y creadores. Procesamiento 100% privado en el navegador y multilingüe ({CATALOG.LANGUAGES_LABEL}).
            </p>
            <div className="pt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[var(--surface2)] border border-[var(--line)]">
              <span className="w-2 h-2 rounded-full bg-[var(--brand2)] animate-pulse" />
              <span className="text-xs font-bold text-[var(--text)]">
                Creado con pasión por <span className="text-[var(--brand2)] font-black">Rafa 930</span>
              </span>
            </div>
          </div>

          {/* Col 2: 10 Suites Direct Directory */}
          <nav aria-label="Directorio de herramientas" className="md:col-span-5">
            <strong className="block text-xs font-extrabold uppercase tracking-wider text-[var(--gold)] mb-3">
              Directorios de las 10 Suites
            </strong>
            <ul className="grid grid-cols-2 gap-2 text-xs font-bold text-[var(--muted)]">
              <li><a href="#fuente" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">01</span> Fuentes Unicode</a></li>
              <li><a href="#traductor" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">02</span> Traductor (105)</a></li>
              <li><a href="#resumidor" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">03</span> Resumidor Online</a></li>
              <li><a href="#mejorador" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">04</span> Corrector Estilo</a></li>
              <li><a href="#limpiador" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">05</span> Limpiador Texto</a></li>
              <li><a href="#analizador" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">06</span> Contador & SEO</a></li>
              <li><a href="#convertidor" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">07</span> Convertidor Caso</a></li>
              <li><a href="#rimar" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">08</span> Rimas Multi-Idioma</a></li>
              <li><a href="#autopilot" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">09</span> Autopilot 5 en 1</a></li>
              <li><a href="#laboratorio" className="hover:text-[var(--brand2)] transition flex items-center gap-1.5"><span className="text-[10px] text-[var(--brand2)]">10</span> Citas APA & Diff</a></li>
              <li className="col-span-2 pt-2 mt-1 border-t border-[var(--line)]">
                <button
                  type="button"
                  onClick={() => setShowSplash(true)}
                  className="text-[var(--brand2)] hover:underline transition inline-flex items-center gap-1.5 font-extrabold text-xs"
                >
                  <span>✦ Abrir Pantalla Splash ({theme === 'dark' ? 'Oscura' : 'Clara'})</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Col 3: Legal & Support */}
          <div className="md:col-span-3 flex flex-col space-y-4 md:items-end">
            <div>
              <strong className="block text-xs font-extrabold uppercase tracking-wider text-[var(--gold)] mb-3 md:text-right">
                Legal & Opciones
              </strong>
              <div className="flex flex-col space-y-2 md:items-end text-xs font-bold text-[var(--muted)]">
                {LEGAL_TABS.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setLegalModalTab(t.id)}
                    className="hover:text-[var(--brand2)] transition"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col space-y-2 md:items-end">
              <button
                type="button"
                onClick={() => openSupportModal('5')}
                className="px-3 py-1.5 rounded-xl border border-[#c92573]/50 bg-[#c92573]/10 text-[#ee4f98] text-xs font-bold hover:bg-[#c92573]/20 transition inline-flex items-center gap-1.5"
              >
                <Gift className="w-3.5 h-3.5" /> Apoyar proyecto
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
