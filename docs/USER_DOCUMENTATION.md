# Guia de Usuario: Boveda de Guardados y Funcionamiento Offline

## 1. Funcionamiento de la Boveda de Guardados (Favoritos e Historial)

### ¿Que es la Boveda?
La Bóveda de 930Text es un almacén privado que te permite guardar, consultar y reutilizar los resultados generados en cualquiera de las 10 suites (resúmenes, traducciones, correcciones, listas de rimas o citas bibliográficas APA 7).

### ¿Donde se almacenan tus datos?
- **100% Privado en tu Navegador:** Toda tu información se guarda en el almacenamiento local (`localStorage`) de tu propio dispositivo.
- **Sin Servidores Externos:** Ningún texto ni resultado guardado se envía a servidores de terceros.
- **Persistencia:** Tus elementos guardados se mantienen disponibles incluso si cierras la pestaña o reinicias el navegador.

### ¿Como utilizarla?
1. **Guardar:** Pulsa el botón **Guardar** o el icono de **Marcador / Estrella** en cualquier suite.
2. **Consultar:** Abre la Bóveda desde el icono de reloj/historial en la cabecera superior o menú móvil.
3. **Reutilizar:** Haz clic en cualquier elemento guardado para copiarlo o cargarlo de nuevo en la herramienta activa.
4. **Fijar (Pin):** Haz clic en la chincheta para mantener los elementos más importantes arriba del todo.
5. **Eliminar:** Pulsa la papelera individual o el botón "Limpiar todo" para borrar tu historial cuando lo desees.

---

## 2. Guía de Uso en Modo Offline (Sin Conexión a Internet)

930Text ha sido diseñado con una arquitectura **Local-First (PWA)** para funcionar sin necesidad de acceso a internet en casi la totalidad de sus herramientas.

### Matriz de Disponibilidad Offline

| Suite / Herramienta | Disponibilidad Offline | Explicación Técnica |
|---|---|---|
| **01 · Fuentes Unicode** | 🟢 100% Offline | Transformaciones de caracteres basadas en mapas Unicode locales. |
| **02 · Traductor Multilingüe** | 🟡 Parcial Offline | El diccionario de traducción básico funciona offline. La pronunciación avanzada o traducciones extensas requieren red. |
| **03 · Resumidor de Textos** | 🟢 100% Offline | Algoritmo extractivo TF-IDF local. |
| **04 · Corrector Ortográfico** | 🟢 100% Offline | Motor de reglas gramaticales y diccionario en memoria local. |
| **05 · Limpiador de Texto** | 🟢 100% Offline | Limpiador mediante regex y Web Worker local (`processor.worker.ts`). |
| **06 · Analizador & SERP** | 🟢 100% Offline | Métricas de legibilidad Fernández Huerta, densidad y vista previa SERP locales. |
| **07 · Convertidor 20 en 1** | 🟢 100% Offline | Transformaciones de formato en cliente. |
| **08 · Rimar & Diccionario** | 🟢 100% Offline | Índice léxico de +15.000 palabras, silabeo poético y caja de ritmos BPM integrados. |
| **09 · Autopilot 5 en 1** | 🟢 100% Offline | Tubería de procesado combinada 100% local. |
| **10 · Laboratorio (Diff & APA 7)** | 🟢 100% Offline | Comparador Diff palabra por palabra y generador de citas bibliográficas local. |
| **11 · OCR (Escáner de Imagen)** | 🟢 100% Offline | Procesado local en navegador mediante Canvas API. |
