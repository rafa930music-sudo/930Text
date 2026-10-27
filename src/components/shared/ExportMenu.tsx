import React from 'react';
import { Download, Share2, QrCode, FileText } from 'lucide-react';

interface ExportMenuProps {
  title: string;
  content: string;
  onDownloadTxt: (name: string, content: string) => void;
  onExportPdf?: (title: string, content: string) => void;
  onOpenQr?: (title: string, content: string) => void;
  onShareLink?: (title: string, content: string) => void;
  className?: string;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({
  title,
  content,
  onDownloadTxt,
  onExportPdf,
  onOpenQr,
  onShareLink,
  className = '',
}) => {
  const slug = (title || 'documento')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || '930text-doc';

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={() => onDownloadTxt(`${slug}.txt`, content)}
        className="h-8 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand)] inline-flex items-center gap-1.5 transition"
      >
        <Download className="w-3.5 h-3.5 text-[var(--brand2)]" />
        <span>TXT</span>
      </button>

      {onExportPdf && (
        <button
          type="button"
          onClick={() => onExportPdf(title, content)}
          className="h-8 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-rose-500 inline-flex items-center gap-1.5 transition"
        >
          <FileText className="w-3.5 h-3.5 text-rose-500" />
          <span>PDF</span>
        </button>
      )}

      {onOpenQr && (
        <button
          type="button"
          onClick={() => onOpenQr(title, content)}
          className="h-8 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-cyan-400 inline-flex items-center gap-1.5 transition"
          title="Transferir a móvil con código QR"
        >
          <QrCode className="w-3.5 h-3.5 text-cyan-400" />
          <span>QR</span>
        </button>
      )}

      {onShareLink && (
        <button
          type="button"
          onClick={() => onShareLink(title, content)}
          className="h-8 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-xs font-bold hover:border-[var(--brand2)] inline-flex items-center gap-1.5 transition"
          title="Compartir enlace directo"
        >
          <Share2 className="w-3.5 h-3.5 text-[var(--brand2)]" />
          <span>Enlace</span>
        </button>
      )}
    </div>
  );
};
