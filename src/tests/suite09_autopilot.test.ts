import { describe, it, expect } from 'vitest';
import { runAutopilotPipeline } from '../utils/enterpriseTools';

describe('Suite 09 - Autopilot 5-Motor Pipeline Tests', () => {
  const draftText = `
    Ayer abi en la tarde yo fui al supermercao porq abia ke comprar barias kosas que me faltavan en la kasa. 
    Ademas, la optimizacion de flujos de trabajo y el formateo digital avanzado estan transformando 
    la productividad de estudiantes, empresas y creadores digitales en un 42% anual. 
    Sin embargo, el 68% de los equipos pierde mas de 4 horas semanales limpiando documentos mal formateados.
  `;

  it('executes all 5 motors sequentially and outputs complete dossier', () => {
    const report = runAutopilotPipeline(draftText);

    // Motor 1: Clean
    expect(report.cleanedText).toBeDefined();
    expect(report.cleanedText.length).toBeGreaterThan(0);

    // Motor 2: Orthography & editorial correction
    expect(report.correctedText).toBeDefined();
    expect(report.correctionsCount).toBeGreaterThanOrEqual(1);

    // Motor 3: Executive summary
    expect(report.executiveSummary).toBeDefined();
    expect(report.executiveSummary.length).toBeGreaterThan(0);

    // Motor 4: Study questions
    expect(Array.isArray(report.studyQuestions)).toBe(true);
    expect(report.studyQuestions.length).toBeGreaterThan(0);

    // Motor 5: SEO Kit & Huerta metrics
    expect(report.seoHeadline).toBeDefined();
    expect(report.urlSlug).toBeDefined();
    expect(report.metrics.huertaScore).toBeGreaterThanOrEqual(0);
    expect(report.metrics.huertaScore).toBeLessThanOrEqual(100);

    // Full Markdown Dossier contains all 4 major sections
    expect(report.markdownBundle).toContain('# DOSSIER AUTOPILOT — 930TEXT');
    expect(report.markdownBundle).toContain('Titular sugerido:');
    expect(report.markdownBundle).toContain('Índice Fernández Huerta:');
  });

  it('handles empty input safely without exceptions', () => {
    const emptyReport = runAutopilotPipeline('');
    expect(emptyReport.originalText).toBe('');
    expect(emptyReport.correctionsCount).toBe(0);
    expect(emptyReport.studyQuestions).toEqual([]);
    expect(emptyReport.metrics.words).toBe(0);
  });
});
