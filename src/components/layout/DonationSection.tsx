import React from 'react';
import { Gift } from 'lucide-react';
import { DONATION_TIERS, DonationTier } from '../../data/presetsData';

interface DonationSectionProps {
  openSupportModal: (amount?: string) => void;
  setLegalModalTab: (tab: any) => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  openSupportModal,
  setLegalModalTab
}) => {
  return (
    <section id="donar" className="py-10 sm:py-12 border-t border-[var(--line)] bg-gradient-to-r from-[var(--surface)] via-[var(--brand-soft)]/35 to-[var(--surface)]">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5">
        <div className="p-5 sm:p-7 rounded-[26px] studio-console border border-[var(--line)] space-y-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-wider text-[#ee4f98]">
                <Gift className="w-3.5 h-3.5" />
                <span>100% GRATIS Y ABIERTO · APOYO VOLUNTARIO</span>
              </div>
              <h2 className="font-display text-xl sm:text-3xl font-extrabold text-[var(--text)]">
                Todas las herramientas y descargas son gratis. Si te resulta útil, puedes apoyar con una donación.
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                En 930Text no hay muros de pago, ni suscripciones ni funciones bloqueadas. Todo está abierto gratis para todo el mundo. Si te ahorra tiempo y te apetece invitar a un café a Rafa, puedes donar libremente por PayPal.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => openSupportModal('5')}
                className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#c92573] via-[#ee4f98] to-[#c9a75c] text-white text-xs sm:text-sm font-extrabold shadow-lg hover:brightness-110 inline-flex items-center justify-center gap-2 transition text-center leading-snug"
              >
                <Gift className="w-4 h-4 shrink-0" />
                <span>Donar voluntariamente en PayPal</span>
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2 border-t border-[var(--line)]">
            {DONATION_TIERS.map(tier => (
              <a
                key={tier.amount}
                href={`https://www.paypal.com/paypalme/Rafa930paypal/${tier.amount}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-2xl border flex flex-col justify-between transition ${
                  tier.featured
                    ? 'border-[#ee4f98]/60 bg-[#c92573]/10 shadow-md'
                    : 'border-[var(--line)] bg-[var(--surface2)]/85 hover:border-[#ee4f98]/50'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-display text-xl font-extrabold tabular-nums text-[var(--text)]">
                      {tier.amount} €
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[10px] font-extrabold uppercase text-[#ee4f98]">
                      {tier.badge}
                    </span>
                  </div>
                  <strong className="block text-xs sm:text-sm font-extrabold text-[var(--text)] mt-1.5">
                    {tier.title}
                  </strong>
                  <p className="mt-1 text-[11px] text-[var(--muted)] leading-snug">{tier.desc}</p>
                </div>

                <span
                  className={`mt-4 w-full min-h-[38px] px-3 py-2 rounded-xl text-xs font-extrabold inline-flex items-center justify-center gap-1.5 transition text-center leading-tight ${
                    tier.featured
                      ? 'bg-gradient-to-r from-[#c92573] via-[#ee4f98] to-[#c9a75c] text-white shadow-sm hover:brightness-110'
                      : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[#ee4f98]'
                  }`}
                >
                  <Gift className="w-3.5 h-3.5 text-[#ee4f98] shrink-0" />
                  <span>Donar {tier.amount} €</span>
                </span>
              </a>
            ))}
          </div>

          {/* Explicit Non-Liability Disclaimer Box */}
          <div className="p-3.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)]/90 text-[11px] text-[var(--muted)] leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <strong className="text-[var(--text)] font-extrabold">⚠️ Aviso importante y exención de responsabilidad:</strong>{' '}
              Todas las herramientas de 930Text son gratuitas y se ofrecen «tal cual» (<em>as-is</em>). <strong>El creador NO se hace responsable si alguna herramienta, descarga, traducción o función no llega a funcionar</strong> en tu navegador o dispositivo. Contacto oficial: <a href="mailto:rafa.930music@gmail.com" className="text-[var(--brand2)] font-bold hover:underline">rafa.930music@gmail.com</a>.
            </div>
            <button
              type="button"
              onClick={() => setLegalModalTab('legal')}
              className="shrink-0 text-xs font-extrabold text-[var(--brand2)] hover:underline self-start sm:self-center"
            >
              Ver cláusula legal →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
