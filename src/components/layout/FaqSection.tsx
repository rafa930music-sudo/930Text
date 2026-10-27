import React from 'react';
import { Gift } from 'lucide-react';
import { CATALOG } from '../../config/catalog';
import { LIMITS } from '../../config/limits';

interface FaqSectionProps {
  rating: number;
  setRating: (r: number) => void;
  feedbackCategory: string;
  setFeedbackCategory: (cat: string) => void;
  feedbackText: string;
  setFeedbackText: (txt: string) => void;
  feedbackSending: boolean;
  handleFeedbackSubmit: () => void;
  feedbackStatus: { msg: string; type: '' | 'ok' | 'error' };
  setIsSupportOpen: (open: boolean) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  rating,
  setRating,
  feedbackCategory,
  setFeedbackCategory,
  feedbackText,
  setFeedbackText,
  feedbackSending,
  handleFeedbackSubmit,
  feedbackStatus,
  setIsSupportOpen
}) => {
  return (
    <section id="faq" className="py-10 sm:py-14 border-t border-[var(--line)]">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-5 grid lg:grid-cols-12 gap-8 items-start">
        {/* Left 6 cols: Concise FAQ */}
        <div className="lg:col-span-6">
          <span className="section-number">GUÍA RÁPIDA & DUDAS FRECUENTES</span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Preguntas frecuentes
          </h2>
          <div className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
            {[
              [
                '¿Cómo cambiar el tipo de letra para Instagram, TikTok, WhatsApp o LinkedIn?',
                `Escribe tu frase en Fuentes Unicode Pro (#fuente), elige entre los 44 estilos tipográficos y ${CATALOG.FRAMES_LABEL} decorativos y pulsa Copiar. Al usar estándares Unicode oficiales, el formato se mantiene en biografías, comentarios y publicaciones.`
              ],
              [
                '¿Cómo funciona el Resumidor de Textos y Apuntes?',
                'Analiza la densidad léxica y posición de cada frase para sintetizar textos largos en 6 formatos: ficha ejecutiva, viñetas de estudio, párrafo fluido, preguntas tipo test, plan de acción o hilo para redes.'
              ],
              [
                '¿Cómo mide las sílabas poéticas y encuentra rimas en más de 15.000 palabras?',
                'El estudio Rimar (#rimar) indexa el diccionario español completo con definiciones y sinónimos, y divide cada verso aplicando sinalefas y la ley del acento final (+1 aguda, -1 esdrújula).'
              ],
              [
                '¿Hay suscripción, registro o costes ocultos?',
                'No. Todas las herramientas funcionan gratis y al instante sin crear cuenta. Si te ahorra tiempo, puedes apoyar el proyecto voluntariamente por PayPal.'
              ]
            ].map(([q, a]) => (
              <details key={q} className="py-3.5 group">
                <summary className="cursor-pointer font-extrabold text-sm text-[var(--text)] leading-snug">
                  {q}
                </summary>
                <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Right 6 cols: Direct Feedback + Optional Coffee Support */}
        <div id="valoracion" className="lg:col-span-6 space-y-4">
          <div className="p-5 sm:p-6 rounded-[24px] studio-console">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="section-number">VALORACIONES 930TEXT</span>
                <h3 className="font-display text-lg sm:text-xl font-extrabold mt-0.5 text-[var(--text)]">
                  Valora y opina sobre 930Text
                </h3>
              </div>
              <div className="flex gap-1" role="group" aria-label="Valoración de 1 a 5 estrellas">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    aria-label={`${star} de 5 estrellas`}
                    className={`w-9 h-9 rounded-xl border text-base transition ${
                      star <= rating
                        ? 'border-[var(--gold)] bg-[var(--gold-soft)] text-[var(--gold)] font-bold'
                        : 'border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)]'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
              {['Sugerencia de mejora', 'Me ha ahorrado tiempo', 'Nueva herramienta', 'Reporte de fallo'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFeedbackCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition whitespace-nowrap shrink-0 ${
                    feedbackCategory === cat
                      ? 'border-[var(--brand2)] bg-[var(--brand2)]/15 text-[var(--brand2)]'
                      : 'border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <textarea
              value={feedbackText}
              onChange={e => setFeedbackText(e.target.value)}
              maxLength={LIMITS.GLOBAL_MAX}
              rows={2}
              placeholder="Escribe tu comentario o sugerencia sobre 930Text…"
              className="mt-2.5 w-full p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs sm:text-sm text-[var(--text)]"
            />

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                disabled={feedbackSending}
                onClick={handleFeedbackSubmit}
                className="min-h-[38px] px-4 py-1.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] disabled:opacity-50 inline-flex items-center justify-center shadow-md"
              >
                {feedbackSending ? 'Enviando…' : 'Enviar valoración'}
              </button>

              <button
                type="button"
                onClick={() => setIsSupportOpen(true)}
                className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-[#c92573]/50 bg-[#c92573]/10 text-[#ee4f98] text-xs font-extrabold inline-flex items-center justify-center gap-1.5 hover:bg-[#c92573]/20 transition"
              >
                <Gift className="w-3.5 h-3.5 shrink-0" />
                <span>Donar en PayPal</span>
              </button>
            </div>

            {feedbackStatus.msg && (
              <p
                role="status"
                className={`mt-2.5 text-xs font-bold ${
                  feedbackStatus.type === 'ok' ? 'text-[var(--green)]' : 'text-[var(--danger)]'
                }`}
              >
                {feedbackStatus.msg}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
