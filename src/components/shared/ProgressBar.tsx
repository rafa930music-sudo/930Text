import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  onCancel?: () => void;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label = 'Procesando...',
  onCancel,
  className = '',
}) => {
  const clamped = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <div className={`p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)]/80 space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between text-xs font-bold text-[var(--muted)]">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--brand2)] animate-pulse" />
          <span>{label}</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="tabular-nums font-mono text-[var(--brand2)]">{clamped}%</span>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-2 py-0.5 rounded-md border border-[var(--line)] text-[10px] text-[var(--muted)] hover:text-red-400 hover:border-red-400 transition"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>
      <div className="w-full h-1.5 rounded-full bg-[var(--surface)] overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] transition-all duration-200"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};
