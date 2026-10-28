import {
  Type,
  Languages,
  AlignLeft,
  Sparkles,
  Eraser,
  BarChart3,
  CaseSensitive,
  Music,
  Wand2,
  Briefcase,
  Camera
} from 'lucide-react';
import { CATALOG } from '../config/catalog';
import { DICTIONARY_TOTAL_WORDS } from '../utils/rhymeTools';

export interface ToolCatalogItem {
  id: string;
  index: string;
  href: string;
  title: string;
  subtitle: string;
  sample: string;
  search: string;
  featured?: boolean;
  featuredMusic?: boolean;
  icon: any;
}

export const TOOL_CATALOG: ToolCatalogItem[] = [
  {
    id: 'fuente',
    index: '01',
    href: '#fuente',
    title: 'Fuentes Unicode Pro',
    subtitle: `${CATALOG.FONT_FAMILIES_LABEL} + ${CATALOG.FRAMES_LABEL} para redes, bios y titulares`,
    sample: '𝟗𝟑𝟎𝐓𝐞𝐱𝐭 · 𝔊ó𝔱𝔦𝔠𝔬 · 𝒜𝓇𝓉ℯ',
    search: 'fuentes unicode tipografias instagram whatsapp tiktok linkedin bios negrita cursiva gotico vaporwave marcos',
    featured: true,
    icon: Type
  },
  {
    id: 'traductor',
    index: '02',
    href: '#traductor',
    title: `Traductor Universal (${CATALOG.LANGUAGES_LABEL})`,
    subtitle: 'Todos los idiomas del mundo con voz neural, filtro rápido y espejo bilingüe',
    sample: '🇪🇸 ⇄ 🇬🇧 · 🇫🇷 · 🇩🇪 · 🇵🇹 · 🇮🇹 · 🇨🇳 · 🇯🇵 +100',
    search: 'traducir traduccion todos los idiomas ingles frances aleman portugues italiano chino japones arabe ruso catalan gallego euskera latin voz',
    icon: Languages
  },
  {
    id: 'resumidor',
    index: '03',
    href: '#resumidor',
    title: 'Resumidor Extractivo',
    subtitle: '6 formatos (ejecutivo, viñetas, plan de acción, test, hilo)',
    sample: 'Ejecutivo · Viñetas · Plan · Test · Hilo',
    search: 'resumir resumen estudio apuntes universidad oficina texto largo ideas principales hilo preguntas',
    icon: AlignLeft
  },
  {
    id: 'mejorador',
    index: '04',
    href: '#mejorador',
    title: 'Corrector de Estilo',
    subtitle: '4 niveles editoriales + diagnóstico de cambios aplicados',
    sample: 'Correos · Informes · Sin muletillas',
    search: 'mejorar redactar correccion puntuacion estilo muletillas redundancias correos',
    icon: Sparkles
  },
  {
    id: 'limpiador',
    index: '05',
    href: '#limpiador',
    title: 'Limpiador Profundo',
    subtitle: '8 filtros combinables + Buscar y Reemplazar al instante',
    sample: 'Sin HTML · Sin URLs · Sin duplicados',
    search: 'limpiar espacios formato texto pdf excel html markdown urls emails duplicados ordenar',
    icon: Eraser
  },
  {
    id: 'analizador',
    index: '06',
    href: '#analizador',
    title: 'Analizador & SEO',
    subtitle: 'Legibilidad Huerta, simulador SERP Google y límites de redes',
    sample: 'Huerta 84/100 · SERP · X/IG/SEO',
    search: 'analizar estadisticas palabras lectura keywords legibilidad huerta densidad seo serp',
    icon: BarChart3
  },
  {
    id: 'convertidor',
    index: '07',
    href: '#convertidor',
    title: 'Convertidor & Formatos',
    subtitle: '20 transformaciones de mayúsculas, tablas Markdown, slugs y código',
    sample: 'MAYÚSCULAS · Tabla MD · url-slug · #tags',
    search: 'convertir mayusculas minusculas titulo frase camel pascal snake slug hashtags base64 tabla markdown enlaces',
    icon: CaseSensitive
  },
  {
    id: 'rimar',
    index: '08',
    href: '#rimar',
    title: 'Rimar Multi-Idioma & Diccionario',
    subtitle: `${DICTIONARY_TOTAL_WORDS.toLocaleString('es-ES')}+ voces + Rimas en 7 idiomas, estrofas automáticas, métrica y BPM`,
    sample: '[A · 11 síl.] 🇪🇸 · 🇬🇧 · 🇫🇷 · 🇵🇹 · 🇮🇹 · 🇩🇪 · 🇦🇷',
    search: 'rimar rimas diccionario espanol ingles frances portugues italiano aleman catalan definiciones sinonimos musica poesia rap cantante compositor letras cancion versos barras metronomo multisilabicas',
    featuredMusic: true,
    icon: Music
  },
  {
    id: 'autopilot',
    index: '09',
    href: '#autopilot',
    title: 'Autopilot 1-Clic (5 en 1)',
    subtitle: 'Limpia + Corrige + Resume + Analiza SEO + Crea Titular en 1 clic',
    sample: 'Dossier Ejecutivo · 5 Motores Simultáneos',
    search: 'autopilot automatico todo en uno limpiar corregir resumir seo dossier informe',
    featured: true,
    icon: Wand2
  },
  {
    id: 'laboratorio',
    index: '10',
    href: '#laboratorio',
    title: 'Comparador, Citas APA & Plantillas',
    subtitle: 'Diff de versiones, citas APA 7 / MLA / ISO y plantillas B2B',
    sample: 'APA 7 · Diff A/B · Emails & WhatsApp',
    search: 'comparar textos diff versiones citas bibliograficas apa mla harvard iso plantillas correos whatsapp',
    icon: Briefcase
  }
];

export const COMMAND_ITEMS = [
  { title: 'Centro de herramientas (10 Suites)', desc: 'Explorar todas las suites de 930Text', target: '#centro', tag: '⌘' },

  { title: 'Fuentes Unicode Pro', desc: `${CATALOG.FONT_FAMILIES} estilos + ${CATALOG.FRAMES_LABEL} decorativos para redes y titulares`, target: '#fuente', tag: 'Aa' },
  { title: `Traducir Pro (${CATALOG.LANGUAGES_LABEL})`, desc: 'Todos los idiomas del mundo con pronunciación y descarga bilingüe', target: '#traductor', tag: '文' },
  { title: 'Resumir Pro', desc: '6 formatos: Ejecutivo, Viñetas, Párrafo, Plan, Hilo y Test', target: '#resumidor', tag: '≡' },
  { title: 'Mejorar y Corregir Pro', desc: 'Corrector ortográfico y fonético profundo + 4 niveles de edición', target: '#mejorador', tag: '✦' },
  { title: 'Limpiar Pro', desc: 'Repara PDF, HTML, Markdown, URLs, emails, duplicados y reemplazo', target: '#limpiador', tag: '⌁' },
  { title: 'Analizar Pro & SEO', desc: 'Legibilidad Huerta, SERP Google y límites de redes', target: '#analizador', tag: '▥' },
  { title: 'Convertir Pro (20 en 1)', desc: '20 transformaciones + Tablas Markdown y Extractor de enlaces', target: '#convertidor', tag: 'A↔a' },
  { title: 'Rimar & Diccionario Español (+15.000 palabras)', desc: 'Diccionario completo de rimas y definiciones, métrica poética y BPM', target: '#rimar', tag: '♪' },
  { title: 'Autopilot 1-Clic (5 en 1)', desc: 'Limpia, corrige, resume, audita SEO y crea titular al instante', target: '#autopilot', tag: '⚡' },
  { title: 'Comparador Diff, Citas APA 7 y Plantillas', desc: 'Comparar versiones A/B, bibliografía APA/MLA/ISO y correos B2B', target: '#laboratorio', tag: '⚖' },
  { title: 'Modo Enfoque Zen (Sin distracciones)', desc: 'Espacio de concentración a pantalla completa para escribir y medir textos', target: 'zen', tag: '⛶' },
  { title: 'Exportador Multi-formato (Word, Markdown, PDF, JSON)', desc: 'Descarga cualquier documento en formatos profesionales con 1 clic', target: 'export', tag: '📄' },
  { title: 'Pantalla Splash Screen', desc: 'Ver pantalla de bienvenida en página separada (fondo negro / blanco)', target: '#splash', tag: '✦' },
  { title: 'Historial local', desc: 'Ver y descargar textos guardados', target: 'history', tag: '↺' },
  { title: 'Apoyar 930Text (PayPal)', desc: 'Agradecer el ahorro de tiempo con una donación voluntaria', target: 'support', tag: '♥' },
  { title: 'Información legal y privacidad', desc: 'Aviso legal, RGPD, términos y cookies', target: 'legal', tag: '§' }
];
