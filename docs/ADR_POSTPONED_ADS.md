# ADR 001: Decision de Postposicion de Publicidad en 930Text

- **Estado:** Aceptado
- **Fecha:** 2026-10-28
- **Contexto:** 930Text es un estudio textual freemium con 10 suites especializadas (fuentes Unicode, diccionario fonético, resumidor, corrector, etc.).
- **Decisión:** Se pospone indefinidamente la integración de scripts publicitarios de terceros (Google AdSense, Mediavine, Ezoic) durante la fase de crecimiento orgánico y consolidación de la experiencia de usuario.

## Razones de la Decisión
1. **Rendimiento y Core Web Vitals:** Los scripts de red publicitaria suelen degradar el First Input Delay (FID), Interaction to Next Paint (INP) y Cumulative Layout Shift (CLS) en hasta un 40%.
2. **Experiencia de Usuario (UX) y Retención:** La propuesta de valor central de 930Text es la inmediatez, la limpieza visual y la ausencia de distracciones.
3. **Privacidad y Cumplimiento RGPD / LSSI-CE:** La inclusión de cookies publicitarias de seguimiento requiere un CMP (Consent Management Platform) complejo con banners intrusivos.
4. **Resiliencia Modo Offline / PWA:** Los anuncios requieren conexión continua y rompen la experiencia fluida sin conexión que ofrecen 8 de las 10 suites.

## Requisitos para Futuras Integraciones (Si se reevalúa)
- Adopción exclusiva de redes no intrusivas o patrocinios directos B2B sin cookies de seguimiento de terceros.
- Carga perezosa (Lazy loading) estricta tras la interacción inicial del usuario.
- Opción de eliminación de publicidad mediante donación voluntaria o suscripción Pro.
