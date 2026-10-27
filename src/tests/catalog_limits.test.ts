import { describe, it, expect } from 'vitest';
import { LIMITS } from '../config/limits';
import { CATALOG } from '../config/catalog';

describe('Configuration Centralization Tests', () => {
  it('verifies centralized limits', () => {
    expect(LIMITS.GLOBAL_MAX).toBe(100000);
    expect(LIMITS.LIMPIADOR).toBe(100000);
    expect(LIMITS.DIFF_A).toBe(100000);
    expect(LIMITS.TRADUCTOR_SOURCE).toBe(100000);
    expect(LIMITS.SEO_TITLE).toBe(5000);
    expect(LIMITS.META_DESCRIPTION).toBe(5000);
  });

  it('verifies centralized catalog constants', () => {
    expect(CATALOG.VOICES).toBeGreaterThan(0);
    expect(CATALOG.LANGUAGES).toBeGreaterThan(0);
    expect(CATALOG.FONT_FAMILIES).toBeGreaterThan(0);
    expect(CATALOG.FRAMES).toBeGreaterThan(0);
    expect(typeof CATALOG.VOICES_LABEL).toBe('string');
    expect(typeof CATALOG.LANGUAGES_LABEL).toBe('string');
  });
});
