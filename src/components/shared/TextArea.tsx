import React from 'react';
import { LIMITS } from '../../config/limits';
import { CounterChip } from './CounterChip';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChangeValue: (val: string) => void;
  max?: number;
  label?: string;
  platformName?: string;
  recommendedLimit?: number;
  showCounter?: boolean;
  extraHeaderActions?: React.ReactNode;
}

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChangeValue,
  max = LIMITS.GLOBAL_MAX,
  label,
  platformName,
  recommendedLimit,
  showCounter = true,
  extraHeaderActions,
  className = '',
  rows = 5,
  placeholder,
  ...rest
}) => {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className="w-full space-y-1.5">
      {(label || showCounter || extraHeaderActions) && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          {label && <label className="text-xs font-extrabold text-[var(--muted)]">{label}</label>}
          <div className="flex items-center gap-2 ml-auto">
            {extraHeaderActions}
            {showCounter && (
              <CounterChip
                length={value.length}
                max={max}
                words={words}
                platformName={platformName}
                recommendedLimit={recommendedLimit}
              />
            )}
          </div>
        </div>
      )}
      <textarea
        value={value}
        onChange={e => onChangeValue(e.target.value)}
        maxLength={max}
        rows={rows}
        placeholder={placeholder}
        className={`w-full p-3.5 sm:p-4 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-[var(--text)] resize-y leading-relaxed outline-none focus:border-[var(--brand2)] transition ${className}`}
        {...rest}
      />
    </div>
  );
};
