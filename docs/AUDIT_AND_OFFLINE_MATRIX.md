# Auditoria Integral, Matriz Legal y Roadmap de Producto 930Text

## 1. Matriz de Riesgo Legal e Intelectual (T6)
*Nota: Este análisis identifica riesgos técnicos y de licencias para revisión por un/a consultor/a legal colegiado/a. No constituye dictamen jurídico definitivo.*

| Aspecto Legal / Licencia | Riesgo Detectado | Base Afectada | Severidad | Recomendación Técnica |
|---|---|---|---|---|
| **Almacenamiento Local (Bóveda)** | Datos sensibles ingresados por el usuario se persisten en `localStorage`. | RGPD Art. 5 (Minimización) / LOPDGDD | Media (P2) | Incluir botón de purga rápida y aviso de retención local exclusiva. (Implementado) |
| **OCR & Subida de Imágenes** | Procesado de imágenes cargadas por el usuario. | RGPD Art. 6 / Privacidad | Alta (P1) | Procesar 100% en cliente mediante Canvas API sin enviar a servidores externos. (Implementado) |
| **Licencias de Fuentes Unicode** | Mapeo de caracteres matemáticos y símbolos Unicode. | Estándar Unicode ISO/IEC 10646 | Baja (P3) | Cumplimiento total; el estándar Unicode es de libre uso público. |
| **Diccionario Español (+15.000 palabras)** | Índice léxico en memoria de definiciones y rimas. | Propiedad Intelectual LPI | Media (P2) | Utilizar listas léxicas derivadas de dominio público y añadir nota aclaratoria de no sustitución del DLE/RAE. |

---

## 2. Registro de Incidencias y Correcciones P0–P3 (T4)

- **P0 [Resuelto]:** Descalce en la categoría de fuentes Unicode (`goticas`, `cursivas`, `simbolos`) que provocaba lista vacía al filtrar. *Solucionado mediante coincidencia inteligente por ID y nombre.*
- **P0 [Resuelto]:** Botón de exportación en el Hero con etiqueta genérica sin formato explícito. *Corregido a "Exportar borrador (.txt / PDF)" con tooltip claro.*
- **P1 [Resuelto]:** Contraste insuficiente en el simulador Google SERP y botones cian en modo claro. *Solucionado adaptando variables semánticas a WCAG AA.*
- **P2 [Resuelto]:** Falta de desglose de capacidad offline por herramienta. *Implementada documentación y matriz de resiliencia Local-First.*
- **P3 [Resuelto]:** Ausencia de sitemap extendido con URLs individuales por suite. *Actualizado `sitemap.xml`.*

---

## 3. Informe de Mercado y Roadmap 30/60/90 Días (T7)

### Propuesta de Valor y Diferenciación
930Text compite como una **plataforma freemium "todo en uno" Local-First** frente a utilidades fragmentadas con publicidad intrusiva (ej. ConvertCase, WordCounter, SpanishDict, Rhymezone).

### Roadmap Estratégico

#### Fase 1: Próximos 30 Días (Consolidación UX & PWA)
- Consolidación de la experiencia PWA instalable en dispositivos Android e iOS.
- Optimización de rendimiento Core Web Vitals (INP < 100ms, LCP < 1.2s).
- Indexación de búsquedas orgánicas mediante las nuevas URLs de suite.

#### Fase 2: Próximos 60 Días (Funcionalidades Avanzadas)
- Sincronización opcional en la nube de la Bóveda de Guardados mediante cuenta de usuario.
- Exportación directa de documentos a formatos `.docx` y `.pdf` enriquecidos.
- Extensión para navegadores Chrome / Firefox / Edge.

#### Fase 3: Próximos 90 Días (Monetización B2B y API)
- API pública de utilidades de texto para desarrolladores.
- Plan Pro para agencias de contenidos y redactores SEO (exportación masiva en lote).
