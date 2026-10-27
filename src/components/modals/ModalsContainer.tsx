import React from 'react';
import {
  Search,
  Languages,
  Gift,
  Download,
  Copy,
  Check,
  X,
  Sparkles,
  Command,
  History,
  Trash2,
  Bookmark,
  Share2,
  QrCode
} from 'lucide-react';
import { CATALOG } from '../../config/catalog';
import { LEGAL_TABS, LEGAL_CONTENT, LegalTabId } from '../../data/legalData';
import { LANGUAGE_REGION_LABELS } from '../../data/languagesData';
import { DONATION_TIERS, DonationTier } from '../../data/presetsData';
import { SocialCardTheme, SocialCardRatio } from '../../utils/socialCardGenerator';

interface ModalsContainerProps {
  // Command palette
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;
  commandQuery: string;
  setCommandQuery: (q: string) => void;
  commandIdx: number;
  setCommandIdx: (idx: number) => void;
  filteredCommands: { id?: string; title: string; desc: string; href?: string; target?: string; tag?: string }[];
  executeCommand: (cmd: any) => void;

  // Site lang modal
  isSiteLangModalOpen: boolean;
  setIsSiteLangModalOpen: (open: boolean) => void;
  siteLangSearch: string;
  setSiteLangSearch: (q: string) => void;
  siteLang: string;
  setSiteLang: (code: string) => void;
  filteredSiteLanguages: { code: string; name: string; nativeName: string; flag: string; region: string }[];
  addToast: (msg: string, kind?: 'ok' | 'error') => void;

  // Support / PayPal modal
  isSupportOpen: boolean;
  setIsSupportOpen: (open: boolean) => void;
  donationAmount: string;
  setDonationAmount: (amt: string) => void;
  validDonation: boolean;
  paypalHref: string;

  // Legal modal
  legalModalTab: LegalTabId | null;
  setLegalModalTab: (tab: LegalTabId | null) => void;

  // History drawer
  isHistoryOpen: boolean;
  setIsHistoryOpen: (open: boolean) => void;
  history: { id: string; type: string; input: string; output: string; date: string; pinned?: boolean }[];
  togglePinHistory: (id: string) => void;
  deleteHistoryItem: (id: string) => void;
  clearAllHistory: () => void;
  copyText: (text: string, label?: string) => void;
  openSocialCardModal: (text: string, author?: string) => void;

  // Export modal
  isExportModalOpen: boolean;
  setIsExportModalOpen: (open: boolean) => void;
  exportModalData: { title: string; content: string };
  downloadTxt: (filename: string, content: string) => void;

  // QR Modal
  qrModal: { isOpen: boolean; qrDataUrl: string; generating: boolean; text: string; title: string };
  setQrModal: React.Dispatch<React.SetStateAction<{ isOpen: boolean; qrDataUrl: string; generating: boolean; text: string; title: string }>>;

  // Social Card Modal
  socialCardModal: {
    isOpen: boolean;
    previewUrl: string;
    loading: boolean;
    text: string;
    author: string;
    theme: SocialCardTheme;
    ratio: SocialCardRatio;
  };
  setSocialCardModal: React.Dispatch<React.SetStateAction<{
    isOpen: boolean;
    previewUrl: string;
    loading: boolean;
    text: string;
    author: string;
    theme: SocialCardTheme;
    ratio: SocialCardRatio;
  }>>;

  // Install Modal
  isInstallModalOpen: boolean;
  setIsInstallModalOpen: (open: boolean) => void;
  promptInstallPWA?: () => void;
}

export const ModalsContainer: React.FC<ModalsContainerProps> = ({
  isCommandOpen,
  setIsCommandOpen,
  commandQuery,
  setCommandQuery,
  commandIdx,
  setCommandIdx,
  filteredCommands,
  executeCommand,
  isSiteLangModalOpen,
  setIsSiteLangModalOpen,
  siteLangSearch,
  setSiteLangSearch,
  siteLang,
  setSiteLang,
  filteredSiteLanguages,
  addToast,
  isSupportOpen,
  setIsSupportOpen,
  donationAmount,
  setDonationAmount,
  validDonation,
  paypalHref,
  legalModalTab,
  setLegalModalTab,
  isHistoryOpen,
  setIsHistoryOpen,
  history,
  togglePinHistory,
  deleteHistoryItem,
  clearAllHistory,
  copyText,
  openSocialCardModal,
  isExportModalOpen,
  setIsExportModalOpen,
  exportModalData,
  downloadTxt,
  qrModal,
  setQrModal,
  socialCardModal,
  setSocialCardModal,
  isInstallModalOpen,
  setIsInstallModalOpen,
  promptInstallPWA
}) => {
  return (
    <>
      {/* COMMAND PALETTE (CTRL/CMD + K) */}
      {isCommandOpen && (
        <div
          onClick={() => setIsCommandOpen(false)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm grid place-items-start sm:place-items-center p-3 sm:p-4 pt-16 sm:pt-4"
        >
          <section
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Buscador rápido de comandos y herramientas"
            className="w-full max-w-2xl rounded-[24px] studio-console overflow-hidden shadow-2xl border border-[var(--line)]"
          >
            <div className="p-3.5 sm:p-4 border-b border-[var(--line)] flex items-center gap-3 bg-[var(--surface)]">
              <Command className="w-5 h-5 text-[var(--brand)] shrink-0" />
              <input
                type="text"
                autoFocus
                value={commandQuery}
                onChange={e => {
                  setCommandQuery(e.target.value);
                  setCommandIdx(0);
                }}
                onKeyDown={e => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setCommandIdx((commandIdx + 1) % Math.max(1, filteredCommands.length));
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setCommandIdx((commandIdx - 1 + filteredCommands.length) % Math.max(1, filteredCommands.length));
                  } else if (e.key === 'Enter' && filteredCommands[commandIdx]) {
                    e.preventDefault();
                    executeCommand(filteredCommands[commandIdx]);
                  } else if (e.key === 'Escape') {
                    setIsCommandOpen(false);
                  }
                }}
                placeholder="Busca cualquier función o herramienta (ej. resumir, fuentes, rimas)..."
                className="w-full bg-transparent border-0 outline-none text-sm sm:text-base text-[var(--text)] font-semibold"
              />
              <button
                type="button"
                onClick={() => setIsCommandOpen(false)}
                className="w-8 h-8 rounded-xl grid place-items-center border border-[var(--line)] text-xs font-bold"
              >
                Esc
              </button>
            </div>

            <div className="max-h-[360px] overflow-y-auto p-2 divide-y divide-[var(--line)]/60">
              {filteredCommands.length === 0 ? (
                <div className="p-6 text-center text-xs text-[var(--muted)]">
                  No se encontraron herramientas para «{commandQuery}»
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => (
                  <button
                    key={cmd.id}
                    type="button"
                    onClick={() => executeCommand(cmd)}
                    className={`w-full p-3 rounded-xl text-left transition flex items-center gap-3 ${
                      idx === commandIdx
                        ? 'bg-[var(--brand-soft)] text-[var(--brand2)] border border-[var(--brand2)]/40'
                        : 'hover:bg-[var(--surface2)] text-[var(--text)]'
                    }`}
                  >
                    <span className="w-8 h-8 rounded-lg bg-[var(--surface2)] border border-[var(--line)] grid place-items-center shrink-0">
                      <Sparkles className="w-4 h-4 text-[var(--brand)]" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <strong className="block text-xs font-extrabold break-words">{cmd.title}</strong>
                      <small className="block text-[11px] text-[var(--muted)] break-words">{cmd.desc}</small>
                    </div>
                    <span className="text-xs text-[var(--muted)]">↵</span>
                  </button>
                ))
              )}
            </div>
          </section>
        </div>
      )}

      {/* GLOBAL WEBSITE LANGUAGE MODAL (105 LANGUAGES FOR THE ENTIRE WEB) */}
      {isSiteLangModalOpen && (
        <div
          onClick={() => setIsSiteLangModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm grid place-items-center p-3 sm:p-4"
        >
          <section
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Seleccionar idioma de toda la página web"
            className="w-full max-w-3xl max-h-[88dvh] flex flex-col rounded-[24px] sm:rounded-[28px] studio-console overflow-hidden shadow-2xl"
          >
            <div className="px-4 sm:px-6 py-4 border-b border-[var(--line)] flex items-center justify-between gap-3 bg-[var(--surface)]">
              <div className="flex items-center gap-2.5">
                <Languages className="w-5 h-5 text-[var(--brand2)] shrink-0" />
                <div>
                  <h2 className="font-display text-base sm:text-lg font-extrabold text-[var(--text)]">
                    Idioma de toda la página web ({CATALOG.LANGUAGES_LABEL})
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[var(--muted)]">
                    Traduce automáticamente todos los menús, botones, títulos y las 10 suites al idioma que elijas
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsSiteLangModalOpen(false)}
                className="w-9 h-9 rounded-xl grid place-items-center border border-[var(--line)] shrink-0"
              >
                ×
              </button>
            </div>

            <div className="p-3.5 sm:px-6 border-b border-[var(--line)] bg-[var(--surface2)] flex flex-wrap items-center justify-between gap-2.5">
              <div className="flex items-center gap-2 flex-1 min-w-[220px] h-10 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)]">
                <Search className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={siteLangSearch}
                  onChange={e => setSiteLangSearch(e.target.value)}
                  placeholder="Buscar idioma (ej. English, Français, Català, العربية, 中文, Quechua)…"
                  className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-[var(--text)]"
                />
                {siteLangSearch && (
                  <button
                    type="button"
                    onClick={() => setSiteLangSearch('')}
                    className="text-xs text-[var(--muted)] hover:text-[var(--text)]"
                  >
                    ×
                  </button>
                )}
              </div>

              {siteLang !== 'es' && (
                <button
                  type="button"
                  onClick={() => {
                    setSiteLang('es');
                    setIsSiteLangModalOpen(false);
                    addToast('Idioma de la web restaurado a Español 🇪🇸');
                  }}
                  className="h-10 px-3.5 rounded-xl border border-[var(--brand2)]/50 bg-[var(--brand-soft)] text-xs font-extrabold text-[var(--brand2)] whitespace-nowrap shrink-0"
                >
                  🇪🇸 Restaurar Español original
                </button>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
              {(Object.keys(LANGUAGE_REGION_LABELS) as Array<keyof typeof LANGUAGE_REGION_LABELS>).map(regionKey => {
                const regionLangs = filteredSiteLanguages.filter(l => l.region === regionKey);
                if (regionLangs.length === 0) return null;
                return (
                  <div key={regionKey} className="space-y-2.5">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-[var(--gold)]">
                      {LANGUAGE_REGION_LABELS[regionKey]}
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {regionLangs.map(lang => {
                        const active = siteLang.toLowerCase() === lang.code.toLowerCase();
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            data-no-i18n="true"
                            onClick={() => {
                              setSiteLang(lang.code);
                              setIsSiteLangModalOpen(false);
                              addToast(`${lang.flag} ${lang.name} (${lang.nativeName})`);
                            }}
                            className={`p-2.5 rounded-xl border text-left transition flex items-center gap-2 ${
                              active
                                ? 'border-[var(--brand2)] bg-[var(--brand-soft)] text-[var(--text)] shadow-sm'
                                : 'border-[var(--line)] bg-[var(--surface2)]/70 hover:border-[var(--brand2)] text-[var(--text)]'
                            }`}
                          >
                            <span className="text-base shrink-0">{lang.flag}</span>
                            <div className="min-w-0 flex-1">
                              <strong className="block text-xs font-extrabold break-words leading-tight">
                                {lang.name}
                              </strong>
                              <span className="block text-[10px] text-[var(--muted)] break-words leading-tight mt-0.5">
                                {lang.nativeName}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* VOLUNTARY DONATION / PAYPAL MODAL */}
      {isSupportOpen && (
        <div
          onClick={() => setIsSupportOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-3 sm:p-4 overflow-y-auto"
        >
          <section
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-modal-title"
            className="w-full max-w-xl max-h-[90dvh] overflow-y-auto rounded-[24px] sm:rounded-[26px] studio-console"
          >
            <div className="px-5 sm:px-6 py-4 border-b border-[var(--line)] flex items-center justify-between sticky top-0 bg-[var(--surface)] z-10">
              <div className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-[#ee4f98] shrink-0" />
                <h2 id="support-modal-title" className="font-display text-base sm:text-lg font-extrabold">
                  Patrocinio y contribución voluntaria
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsSupportOpen(false)}
                className="w-9 h-9 rounded-xl grid place-items-center border border-[var(--line)]"
              >
                ×
              </button>
            </div>
            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                Todas las herramientas, suites y descargas de 930Text son de <strong>acceso 100% libre y gratuito</strong>. Si optimizan tu jornada académica o profesional, puedes respaldar el mantenimiento independiente del proyecto mediante una aportación voluntaria.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {DONATION_TIERS.map(opt => (
                  <a
                    key={opt.amount}
                    href={`https://www.paypal.com/paypalme/Rafa930paypal/${opt.amount}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                      opt.featured
                        ? 'border-[#ee4f98]/60 bg-[#c92573]/10 shadow-md'
                        : 'border-[var(--line)] bg-[var(--surface2)] hover:border-[#ee4f98]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-display text-lg font-extrabold tabular-nums text-[var(--text)]">{opt.amount} €</span>
                        <span className="text-[10px] font-extrabold text-[#ee4f98] uppercase">{opt.badge}</span>
                      </div>
                      <strong className="text-xs font-extrabold text-[var(--text)] mt-1 block">{opt.title}</strong>
                      <small className="text-[11px] text-[var(--muted)] mt-0.5 block leading-snug">{opt.desc}</small>
                    </div>
                    <span className="mt-3 w-full min-h-[36px] px-3 py-1.5 rounded-xl bg-[var(--surface)] border border-[var(--line)] text-[11px] font-extrabold text-[#ee4f98] inline-flex items-center justify-center text-center leading-tight">
                      Aportar {opt.amount} € →
                    </span>
                  </a>
                ))}
              </div>

              <div className="pt-1">
                <label htmlFor="custom-donation-modal" className="block text-xs font-extrabold mb-1.5">
                  O introduce un importe personalizado (€)
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <input
                    id="custom-donation-modal"
                    type="number"
                    min="1"
                    step="1"
                    value={donationAmount}
                    onChange={e => setDonationAmount(e.target.value)}
                    className="w-full sm:w-28 min-h-[44px] px-3.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-sm font-bold tabular-nums"
                  />
                  <a
                    href={paypalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-[#c92573] via-[#ee4f98] to-[#c9a75c] inline-flex items-center justify-center shadow-md text-center leading-snug"
                  >
                    Contribuir vía PayPal ({validDonation ? `${donationAmount} €` : '5 €'})
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* LEGAL INFORMATION MODAL */}
      {legalModalTab && (
        <div
          onClick={() => setLegalModalTab(null)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-3 sm:p-4"
        >
          <section
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Información legal"
            className="w-full max-w-2xl max-h-[85dvh] flex flex-col rounded-[22px] sm:rounded-[26px] studio-console overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[var(--line)] flex items-center justify-between shrink-0">
              <h2 className="font-display text-base sm:text-lg font-extrabold">{LEGAL_CONTENT[legalModalTab].title}</h2>
              <button
                type="button"
                onClick={() => setLegalModalTab(null)}
                className="w-9 h-9 rounded-xl grid place-items-center border border-[var(--line)] shrink-0"
              >
                ×
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
              <div className="flex items-center gap-1.5 overflow-x-auto sm:flex-wrap no-scrollbar pb-1 sm:pb-0">
                {LEGAL_TABS.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setLegalModalTab(tab.id)}
                    className={`h-8 px-3 rounded-xl text-xs font-bold transition whitespace-nowrap shrink-0 ${
                      legalModalTab === tab.id
                        ? 'bg-[var(--brand)] text-white'
                        : 'bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="space-y-3 sm:space-y-4">
                {LEGAL_CONTENT[legalModalTab].sections.map(sec => (
                  <div key={sec.heading} className="p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/50">
                    <h3 className="text-sm font-extrabold text-[var(--text)]">{sec.heading}</h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">{sec.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* LOCAL HISTORY DRAWER */}
      {isHistoryOpen && (
        <div
          onClick={() => setIsHistoryOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
        >
          <aside
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Historial local"
            className="w-full max-w-md h-full bg-[var(--surface)] border-l border-[var(--line)] flex flex-col shadow-2xl"
          >
            <div className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between">
              <div>
                <strong className="font-display text-base font-extrabold flex items-center gap-2">
                  <History className="w-4.5 h-4.5 text-[var(--brand2)]" /> Historial Local
                </strong>
                <span className="text-[11px] text-[var(--muted)] block mt-0.5">
                  Procesado 100% en tu dispositivo · Guardado automático
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsHistoryOpen(false)}
                className="w-8 h-8 rounded-xl grid place-items-center border border-[var(--line)] text-xs font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {history.length === 0 ? (
                <div className="py-16 text-center text-xs text-[var(--muted)]">
                  Tu historial está vacío. Los textos procesados en las suites se guardarán aquí automáticamente.
                </div>
              ) : (
                history.map(item => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/80 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-[var(--brand2)] uppercase tracking-wider">{item.type}</span>
                      <span className="text-[var(--muted)] font-mono">{item.date}</span>
                    </div>
                    <p className="text-xs text-[var(--text)] line-clamp-3 font-mono leading-relaxed bg-[var(--surface)] p-2 rounded-xl border border-[var(--line)]">
                      {item.output}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => copyText(item.output, 'Copiado del historial')}
                          className="p-1.5 rounded-lg hover:bg-[var(--line)] text-[var(--muted)] hover:text-[var(--text)]"
                          title="Copiar resultado"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => openSocialCardModal(item.output, `930Text · ${item.type}`)}
                          className="p-1.5 rounded-lg hover:bg-[var(--line)] text-[var(--muted)] hover:text-[var(--brand2)]"
                          title="Generar tarjeta de imagen"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => togglePinHistory(item.id)}
                          className={`p-1.5 rounded-lg hover:bg-[var(--line)] ${
                            item.pinned ? 'text-[var(--gold)]' : 'text-[var(--muted)]'
                          }`}
                          title={item.pinned ? 'Desfijar' : 'Fijar en el historial'}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => deleteHistoryItem(item.id)}
                        className="p-1.5 rounded-lg hover:bg-red-500/10 text-[var(--muted)] hover:text-red-400"
                        title="Eliminar de la lista"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {history.length > 0 && (
              <div className="p-4 border-t border-[var(--line)] bg-[var(--surface2)]/50">
                <button
                  type="button"
                  onClick={clearAllHistory}
                  className="w-full py-2 rounded-xl border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/10"
                >
                  Vaciar historial por completo
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* EXPORT MODAL */}
      {isExportModalOpen && (
        <div
          onClick={() => setIsExportModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-3 sm:p-4"
        >
          <section
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Exportar documento"
            className="w-full max-w-lg rounded-[24px] studio-console p-5 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
              <strong className="font-display text-base font-extrabold flex items-center gap-2">
                <Download className="w-4.5 h-4.5 text-[var(--gold)]" /> Exportar Documento Completo
              </strong>
              <button
                type="button"
                onClick={() => setIsExportModalOpen(false)}
                className="w-8 h-8 rounded-xl grid place-items-center border border-[var(--line)] text-xs font-bold"
              >
                ×
              </button>
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Descarga tu texto en cualquier formato estándar sin marcas de agua ni límites de uso.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {[
                { ext: 'txt', label: 'Texto Plano (.txt)', icon: '📄' },
                { ext: 'md', label: 'Markdown (.md)', icon: '📝' },
                { ext: 'json', label: 'Estructura (.json)', icon: '⚙️' }
              ].map(item => (
                <button
                  key={item.ext}
                  type="button"
                  onClick={() => {
                    downloadTxt(`${exportModalData.title.toLowerCase().replace(/\s+/g, '-')}.${item.ext}`, exportModalData.content);
                    setIsExportModalOpen(false);
                  }}
                  className="p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] hover:border-[var(--brand2)] text-left transition flex flex-col gap-1"
                >
                  <span className="text-base">{item.icon}</span>
                  <strong className="text-xs font-extrabold text-[var(--text)]">{item.label}</strong>
                </button>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* QR MODAL */}
      {qrModal.isOpen && (
        <div
          onClick={() => setQrModal(prev => ({ ...prev, isOpen: false }))}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-3 sm:p-4"
        >
          <section
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Código QR"
            className="w-full max-w-sm rounded-[24px] studio-console p-5 space-y-4 text-center"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
              <strong className="font-display text-sm font-extrabold flex items-center gap-2">
                <QrCode className="w-4 h-4 text-[var(--brand2)]" /> Escanear para Móvil
              </strong>
              <button
                type="button"
                onClick={() => setQrModal(prev => ({ ...prev, isOpen: false }))}
                className="w-8 h-8 rounded-xl grid place-items-center border border-[var(--line)] text-xs font-bold"
              >
                ×
              </button>
            </div>

            <div className="flex justify-center p-4 bg-white rounded-2xl border border-[var(--line)] shadow-inner">
              {qrModal.generating ? (
                <div className="w-48 h-48 grid place-items-center text-xs text-black font-bold">Generando QR...</div>
              ) : qrModal.qrDataUrl ? (
                <img src={qrModal.qrDataUrl} alt="Código QR para transferir a móvil" className="w-48 h-48 rounded-lg" />
              ) : (
                <div className="w-48 h-48 grid place-items-center text-xs text-red-500 font-bold">Error al generar QR</div>
              )}
            </div>

            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Escanea este código con la cámara de tu móvil para transferir el texto instantáneamente.
            </p>

            <button
              type="button"
              onClick={() => copyText(qrModal.text, 'Texto del QR copiado')}
              className="w-full py-2.5 rounded-xl bg-[var(--brand)] text-white text-xs font-extrabold hover:brightness-110"
            >
              Copiar Texto del QR
            </button>
          </section>
        </div>
      )}

      {/* INSTALL PWA MODAL */}
      {isInstallModalOpen && (
        <div
          onClick={() => setIsInstallModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm grid place-items-center p-3 sm:p-4"
        >
          <section
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Instalar Aplicación"
            className="w-full max-w-md rounded-[24px] studio-console p-5 sm:p-6 space-y-4 text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[var(--brand)] to-[var(--brand2)] grid place-items-center mx-auto text-white shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>

            <h2 className="font-display text-lg font-extrabold text-[var(--text)]">Instalar 930Text como App</h2>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Añade 930Text a tu pantalla de inicio para usarlo sin conexión, con cero latencia y acceso directo de 1 clic.
            </p>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  promptInstallPWA?.();
                  setIsInstallModalOpen(false);
                }}
                className="w-full py-3 rounded-xl bg-[var(--brand2)] text-[var(--brand-contrast)] text-xs font-extrabold shadow-md hover:brightness-110"
              >
                Instalar Ahora
              </button>
              <button
                type="button"
                onClick={() => setIsInstallModalOpen(false)}
                className="w-full py-2 text-xs font-bold text-[var(--muted)] hover:text-[var(--text)]"
              >
                Ahora no
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
