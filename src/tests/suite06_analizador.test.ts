import { describe, it, expect } from 'vitest';
import { analyzeText } from '../utils/textTools';

describe('Suite 06 - Analizador & SEO Engine Tests', () => {
  const sampleArticle = `
    El desarrollo web moderno requiere altos estándares de calidad y rendimiento técnico.
    El desarrollo web ágil combina pruebas continuas y arquitectura modular limpia.
    Cada componente de desarrollo web debe responder a criterios accesibles de usabilidad universal.
    La arquitectura de software sostenible facilita el mantenimiento de sistemas complejos a largo plazo.
  `;

  it('computes word count, character count and Huerta readability', () => {
    const metrics = analyzeText(sampleArticle);
    expect(metrics.words).toBeGreaterThan(20);
    expect(metrics.chars).toBeGreaterThan(metrics.words);
    expect(metrics.huertaReadability).toBeGreaterThanOrEqual(0);
    expect(metrics.huertaReadability).toBeLessThanOrEqual(100);
    expect(metrics.huertaLabel).toBeDefined();
  });

  it('calculates keyword density accurately as percentage of total words', () => {
    const metrics = analyzeText(sampleArticle);
    expect(metrics.keywords.length).toBeGreaterThan(0);

    let totalDensitySum = 0;
    metrics.keywords.forEach(kw => {
      const numDensity = parseFloat(kw.densityPct);
      expect(numDensity).toBeGreaterThan(0);
      expect(numDensity).toBeLessThanOrEqual(100);
      
      // Verification of math: count / total words * 100
      const expected = (kw.count / metrics.words) * 100;
      expect(Math.abs(numDensity - expected)).toBeLessThan(0.2);

      totalDensitySum += numDensity;
    });

    // Sum of top keywords density must always be <= 100%
    expect(totalDensitySum).toBeLessThanOrEqual(100);
  });

  it('detects recurring bigrams and trigrams without stopwords', () => {
    const metrics = analyzeText(sampleArticle);
    expect(Array.isArray(metrics.bigrams)).toBe(true);
    // "desarrollo web" appears 3 times
    const dwBigram = metrics.bigrams.find(b => b.phrase.includes('desarrollo') && b.phrase.includes('web'));
    expect(dwBigram).toBeDefined();
    expect(dwBigram?.count).toBeGreaterThanOrEqual(2);
  });

  it('handles empty text gracefully', () => {
    const metrics = analyzeText('');
    expect(metrics.words).toBe(0);
    expect(metrics.chars).toBe(0);
    expect(metrics.keywords.length).toBe(0);
    expect(metrics.huertaReadability).toBe(0);
  });
});
