import { describe, it, expect } from 'vitest';
import { summarizeTextDetailed } from '../utils/textTools';

describe('Suite 03 - Resumidor Engine Tests', () => {
  const longSpanishArticle = `
    La inteligencia artificial generativa y el aprendizaje automático están transformando radicalmente la productividad empresarial moderna en todo el mundo.
    Diversas organizaciones globales han implementado herramientas de síntesis documental para agilizar el procesamiento masivo de datos no estructurados.
    Los empleados que utilizan sistemas avanzados de automatización reducen hasta un cuarenta por ciento el tiempo dedicado a redactar informes repetitivos.
    Sin embargo, la supervisión humana sigue siendo un pilar indispensable para garantizar la precisión conceptual, la coherencia ética y el rigor analítico.
    Por lo tanto, la combinación simbiótica entre el criterio editorial humano y los algoritmos computacionales representa el estándar óptimo de trabajo.
    En conclusión, la adopción estratégica de tecnologías de síntesis permite liberar tiempo de alto valor intelectual para la toma de decisiones complejas.
  `;

  it('executive summary guarantees genuine condensation (never expands word count)', () => {
    const originalWords = longSpanishArticle.trim().split(/\s+/).length;
    const result = summarizeTextDetailed(longSpanishArticle, 2, 'executive');
    
    expect(result.output).toBeDefined();
    expect(result.output.length).toBeGreaterThan(0);
    
    const summaryWords = result.output.trim().split(/\s+/).length;
    // CRITICAL: Condensation property - summary must be strictly shorter than original
    expect(summaryWords).toBeLessThan(originalWords);
    // Compression ratio must be significant (< 0.75 of original)
    expect(summaryWords / originalWords).toBeLessThan(0.75);
  });

  it('bullets mode extracts key sentences correctly', () => {
    const result = summarizeTextDetailed(longSpanishArticle, 3, 'bullets');
    expect(result.extractedSentences.length).toBeLessThanOrEqual(3);
    expect(result.extractedSentences.length).toBeGreaterThan(0);
    expect(result.output).toContain('•');
  });

  it('study questions generates interrogative items', () => {
    const result = summarizeTextDetailed(longSpanishArticle, 3, 'studyQuestions');
    expect(result.output).toContain('¿');
    expect(result.output).toContain('?');
  });

  it('handles empty or single sentence input gracefully without crash', () => {
    expect(() => summarizeTextDetailed('', 3, 'executive')).toThrow('Pega o escribe un texto para resumir.');

    const short = 'Solo una frase sencilla.';
    const shortResult = summarizeTextDetailed(short, 3, 'executive');
    expect(shortResult.output.length).toBeGreaterThan(0);
  });
});
