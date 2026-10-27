import { describe, it, expect } from 'vitest';
import { findRhymes, analyzeVerseMeter, analyzeStanzaScheme, lookupSpanishDictionaryWord, generatePoeticStanza } from '../utils/rhymeTools';

describe('Suite 08 · Rimar & Diccionario Engine', () => {
  it('finds consonante and asonante rhymes for valid Spanish terms', () => {
    const rhymesCons = findRhymes('cantar', 'consonante', 5, 0, 'todas', 'es');
    expect(rhymesCons.length).toBeGreaterThan(0);
    expect(rhymesCons[0].word).toBeDefined();

    const rhymesAson = findRhymes('amor', 'asonante', 5, 0, 'todas', 'es');
    expect(rhymesAson.length).toBeGreaterThan(0);
  });

  it('analyzes verse meter and sinalefas correctly', () => {
    const meter = analyzeVerseMeter('Caminante no hay camino');
    expect(meter.metricSyllables).toBeGreaterThan(0);
    expect(meter.endingWord).toBeDefined();
  });

  it('scans stanzas and assigns rhyme scheme letters', () => {
    const poem = `Caminante no hay camino\nse hace camino al andar\nal andar se hace camino\ny al volver la vista atrás`;
    const scheme = analyzeStanzaScheme(poem);
    expect(scheme.rows.length).toBe(4);
    expect(scheme.stanzaPatternName).toBeDefined();
  });

  it('looks up dictionary definitions in Spanish', () => {
    const wordInfo = lookupSpanishDictionaryWord('cantar');
    expect(wordInfo).not.toBeNull();
    if (wordInfo) {
      expect(wordInfo.word).toBe('cantar');
      expect(wordInfo.definition).toBeDefined();
    }
  });

  it('generates poetic stanzas', () => {
    const stanza = generatePoeticStanza('corazón', 'cuarteta', 'es');
    expect(stanza).toContain('corazón');
  });
});
