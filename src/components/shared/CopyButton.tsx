import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  label?: string;
  onCopySuccess?: (label: string) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copiar',
  onCopySuccess,
  className = '',
  variant = 'secondary',
  size = 'md',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (onCopySuccess) onCopySuccess(label);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      setCopied(true);
      if (onCopySuccess) onCopySuccess(label);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  const baseStyle =
    size === 'sm'
      ? 'h-8 px-2.5 rounded-lg text-[11px] font-bold'
      : 'h-9 px-3.5 rounded-xl text-xs font-bold';

  const variantStyle =
    copied
      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-400'
      : variant === 'primary'
      ? 'bg-[var(--brand)] text-white hover:brightness-110 border border-transparent'
      : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--brand2)]';

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-1.5 transition select-none ${baseStyle} ${variantStyle} ${className}`}
      aria-label={label}
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
      <span>{copied ? '¡Copiado!' : label}</span>
    </button>
  );
};
