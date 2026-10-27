// src/config/limits.ts
// Tabla centralizada de límites funcionales y recomendaciones informativas de 930Text

export const LIMITS = {
  // Motores pesados (Sin límites arbitrarios: hasta 100.000 caracteres por campo)
  GLOBAL_MAX: 100_000,
  HEAVY: 100_000,
  FUENTES: 100_000,
  TRADUCTOR_SOURCE: 100_000,
  TRADUCTOR_TARGET: 100_000,
  RESUMIDOR: 100_000,
  CORRECTOR: 100_000,
  LIMPIADOR: 100_000,
  ANALIZADOR: 100_000,
  CONVERTIDOR: 100_000,
  AUTOPILOT: 100_000,
  DIFF_A: 100_000,
  DIFF_B: 100_000,
  PLANTILLAS: 100_000,
  RIMAS_ESTROFAS: 100_000,
  OCR_TEXT: 100_000,

  // Campos con plataforma destino (10.000 funcionales + chip informativo no bloqueante)
  PLATFORM: 10_000,
  IG_BIO: 10_000,
  X_POST: 10_000,
  TIKTOK_BIO: 10_000,
  LINKEDIN_POST: 10_000,

  // Campos SEO y meta (5.000 funcionales + chip informativo Google ~155/~60)
  META: 5_000,
  META_DESCRIPTION: 5_000,
  SEO_TITLE: 5_000,
  TITULO_SEO: 5_000,

  // Campos específicos de herramientas
  RHYME: 5_000,
  RIMAS_PALABRA: 5_000,
  RIMAS_VERSO: 5_000,

  // Búsqueda y reemplazo
  SEARCH_REPLACE: 2_000,
  BUSCAR: 2_000,
  REEMPLAZAR: 2_000,

  // Citas académicas
  CITATION_AUTHOR: 1_000,
  CITA_AUTOR: 1_000,
  CITATION_TITLE: 2_000,
  CITA_TITULO: 2_000,
  CITATION_URL: 2_000,
  CITA_URL: 2_000,
  CITATION_YEAR: 100,
  CITA_ANIO: 100,
} as const;

export const PLATFORM_RECOMMENDED = {
  IG_BIO: 150,
  X_POST: 280,
  TIKTOK_BIO: 80,
  LINKEDIN_POST: 3000,
  GOOGLE_TITLE: 60,
  GOOGLE_META: 155,
} as const;
