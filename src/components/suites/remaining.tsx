import React from 'react';
import { LIMITS } from '../../config/limits';
import { Eraser, BarChart3, CaseSensitive, Music, Wand2, Briefcase, Camera } from 'lucide-react';

// Common interface for suite props (simplified for this automation)
interface SuiteProps {
  input: string;
  onInputChange: (val: string) => void;
  output: string;
  onRun: () => void;
  onCopy: (text: string, label: string) => void;
}

export const SuiteSkeleton: React.FC<SuiteProps & { title: string, placeholder: string }> = ({ title, placeholder, input, onInputChange, output, onRun, onCopy }) => (
  <div className="p-4 bg-[var(--surface2)] rounded-2xl">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <textarea
      value={input}
      onChange={(e) => onInputChange(e.target.value)}
      maxLength={LIMITS.GLOBAL_MAX}
      className="w-full p-3 border border-[var(--line)] rounded-xl bg-[var(--surface)]"
      rows={5}
      placeholder={placeholder}
    />
    <button onClick={onRun} className="mt-2 bg-[var(--brand)] text-white px-4 py-2 rounded-lg">Procesar</button>
    <div className="mt-4 p-3 bg-[var(--surface)] border border-[var(--line)] rounded-xl">
      <p className="whitespace-pre-wrap">{output}</p>
    </div>
  </div>
);
