import React from 'react';

interface CounterChipProps {
  length: number;
  max: number;
  words?: number;
  platformName?: string;
  recommendedLimit?: number;
  className?: string;
}

export const CounterChip: React.FC<CounterChipProps> = ({
  length,
  max,
  words,
  platformName,
  recommendedLimit,
  className = '',
}) => {
  const percent = max > 0 ? (length / max) * 100 : 0;
  const isNearMax = percent >= 90 && percent < 100;
  const isMaxReached = percent >= 100;

  // 3-state styling for global character counter:
  // gris (<90%), ámbar suave (90-99%), ámbar firme (100%)
  const counterColorClass = isMaxReached
    ? 'border-amber-500/80 bg-amber-500/20 text-amber-300 font-extrabold'
    : isNearMax
    ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 font-bold'
    : 'border-[var(--line)] bg-[var(--surface2)]/80 text-[var(--muted)] font-medium';

  const counterLabel = isMaxReached
    ? `${length.toLocaleString('es-ES')} · máximo alcanzado (${max.toLocaleString('es-ES')})`
    : isNearMax
    ? `${length.toLocaleString('es-ES')} caracteres · Cerca del máximo (${max.toLocaleString('es-ES')})`
    : words !== undefined
    ? `${length.toLocaleString('es-ES')} caracteres · ${words.toLocaleString('es-ES')} palabras`
    : `${length.toLocaleString('es-ES')} caracteres`;

  const isOverPlatform = recommendedLimit && length > recommendedLimit;

  return (
    <div className={`flex flex-wrap items-center gap-2 text-xs ${className}`}>
      <span className={`px-2.5 py-1 rounded-xl border text-[11px] tabular-nums transition ${counterColorClass}`}>
        {counterLabel}
      </span>

      {platformName && recommendedLimit && (
        <span
          className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold tabular-nums transition ${
            isOverPlatform
              ? 'border-amber-500/60 bg-amber-500/15 text-amber-300'
              : 'border-[var(--line)] bg-[var(--surface2)]/60 text-[var(--muted)]'
          }`}
          title={isOverPlatform ? `${platformName} recortará al publicar pero 930Text preserva todo el texto` : `${platformName} recomendación oficial`}
        >
          {isOverPlatform
            ? `${length.toLocaleString('es-ES')}/${recommendedLimit} · ${platformName} recortará al publicar`
            : `${platformName} recomienda ≤${recommendedLimit}`}
        </span>
      )}
    </div>
  );
};
