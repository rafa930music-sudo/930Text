import { TOOL_CATALOG, COMMAND_ITEMS } from "./data/catalogData";
import { UNIVERSAL_PRESETS } from "./data/presetsData";
import { Header } from "./components/layout/Header";
import { Hero } from "./components/layout/Hero";
import { BentoCenter } from "./components/layout/BentoCenter";
import { DonationSection } from "./components/layout/DonationSection";
import { FaqSection } from "./components/layout/FaqSection";
import { Footer } from "./components/layout/Footer";
import { ModalsContainer } from "./components/modals/ModalsContainer";
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {
  FONT_STYLES,
  FONT_FRAMES,
  summarizeTextDetailed,
  SummaryDetailedResult,
  improveText,
  cleanTextAdvanced,
  analyzeText,
  convertTextFormat,
  SummaryFormat,
  ImproveLevel,
  ConvertMode
} from './utils/textTools';
import { MAX_INPUT_CHARS } from './utils/constants';
import {
  findRhymes,
  analyzeVerseMeter,
  analyzeStanzaScheme,
  lookupSpanishDictionaryWord,
  generatePoeticStanza,
  RhymeLanguageCode,
  DICTIONARY_TOTAL_WORDS,
  FREESTYLE_PROMPTS
} from './utils/rhymeTools';
import { WordCategory } from './data/spanishDictionary';
import {
  WORLD_LANGUAGES,
  LANGUAGE_REGION_LABELS,
  getLanguageByCode,
  MULTILINGUAL_RHYME_PACKS
} from './data/languagesData';
import {
  applyWholePageLanguage,
  isPageTranslatorBusy,
  getLocalizedSuiteSamples,
  BASE_SPANISH_SAMPLES,
  LocalizedSuiteSamples,
  translateSingleDynamicString
} from './utils/pageTranslator';
import {
  runAutopilotPipeline,
  compareTextsDetailed,
  generateAcademicCitations,
  EXECUTIVE_TEMPLATES,
  ExecutiveTemplateId,
  generateSongBlueprint,
  DrumBeatStyle,
  playSynthesizedDrumStep,
  buildSerpPreview,
  encodeWorkspaceShareHash,
  decodeWorkspaceShareHash,
  exportToPdfDocument,
  exportToWordDoc,
  exportToMarkdown,
  exportToJson
} from './utils/enterpriseTools';
import { LEGAL_TABS, LEGAL_CONTENT, LegalTabId } from './data/legalData';
import { LIMITS } from './config/limits';
import { CATALOG } from './config/catalog';
import { SUITE_PRESETS } from './utils/suitePresets';
import { usePWAInstall } from './hooks/usePWAInstall';
import { PWADiscoverySection } from './components/PWADiscoverySection';
import {
  Type,
  Languages,
  AlignLeft,
  Sparkles,
  Eraser,
  BarChart3,
  CaseSensitive,
  Music,
  History,
  Search,
  Sun,
  Moon,
  Command,
  Copy,
  Download,
  Bookmark,
  Trash2,
  ArrowRight,
  ArrowLeftRight,
  Volume2,
  VolumeX,
  Check,
  X,
  Play,
  Square,
  Menu,
  Smartphone,
  Dices,
  Timer,
  Mail,
  Briefcase,
  Gift,
  ClipboardPaste,
  Wand2,
  Mic,
  Share2,
  Printer,
  Maximize2,
  Minimize2,
  FileText,
  Camera,
  UploadCloud,
  FileImage,
  WifiOff,
  Zap,
  QrCode,
  Pin,
  PinOff,
  Image as ImageIcon,
  Wifi,
  LayoutGrid
} from 'lucide-react';
import { FontSuite } from './components/suites/fonts';
import { TranslatorSuite } from './components/suites/translator';
import { ResumidorSuite } from './components/suites/resumidor';
import { MejoradorSuite } from './components/suites/mejorador';
import { SuiteSkeleton } from './components/suites/remaining';
import { ConvertidorSuite } from './components/suites/convertidor';
import { AutopilotSuite } from './components/suites/autopilot';
import { LimpiadorSuite } from './components/suites/limpiador';
import { AnalizadorSuite } from './components/suites/analizador';
import { LaboratorioSuite } from './components/suites/laboratorio';
import { RimarSuite } from './components/suites/rimar';

import QRCode from 'qrcode';
import { generateSocialCardBlob, SocialCardTheme, SocialCardRatio } from './utils/socialCardGenerator';

interface HistoryItem {
  id: string;
  type: string;
  input: string;
  output: string;
  date: string;
  pinned?: boolean;
}

interface ToastMsg {
  id: number;
  text: string;
  kind: 'ok' | 'error';
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform?: string }>;
}

interface SpeechRecognitionResultItemLike {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultLike {
  readonly [index: number]: SpeechRecognitionResultItemLike;
  readonly length: number;
}

interface SpeechRecognitionEventLike extends Event {
  readonly results: {
    readonly [index: number]: SpeechRecognitionResultLike;
    readonly length: number;
  };
}

interface SpeechRecognitionInstanceLike {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop?: () => void;
  abort?: () => void;
}

type SpeechRecognitionCtor = new () => SpeechRecognitionInstanceLike;

export default function App() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('./workers/processor.worker.ts', import.meta.url), { type: 'module' });
    workerRef.current.onmessage = (event) => {
      console.log('Main received:', event.data);
    };
    workerRef.current.postMessage({ type: 'PING' });
    
    return () => {
      workerRef.current?.terminate();
    };
  }, []);
  // Theme management
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const attr = document.documentElement.dataset.theme;
    return attr === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('930text-theme', theme);
    } catch {
      // ignore
    }
    const meta = document.getElementById('dynamic-theme-color');
    if (meta) {
      meta.setAttribute('content', theme === 'dark' ? '#05070E' : '#F6F8FC');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  // Global Website Language State (Translates the entire page into 105 languages)
  const [siteLang, setSiteLang] = useState<string>(() => {
    try {
      return localStorage.getItem('930text-site-lang') || 'es';
    } catch {
      return 'es';
    }
  });
  const [isSiteLangModalOpen, setIsSiteLangModalOpen] = useState(false);
  const [siteLangSearch, setSiteLangSearch] = useState('');
  const [isSiteTranslating, setIsSiteTranslating] = useState(false);

  const currentSiteLangMeta = useMemo(() => getLanguageByCode(siteLang), [siteLang]);

  const filteredSiteLanguages = useMemo(() => {
    const q = siteLangSearch.toLowerCase().trim();
    if (!q) return WORLD_LANGUAGES;
    return WORLD_LANGUAGES.filter(l =>
      `${l.name} ${l.nativeName} ${l.code}`.toLowerCase().includes(q)
    );
  }, [siteLangSearch]);

  const [localizedSamples, setLocalizedSamples] = useState<LocalizedSuiteSamples>(BASE_SPANISH_SAMPLES);

  useEffect(() => {
    try {
      localStorage.setItem('930text-site-lang', siteLang);
    } catch {
      // ignore
    }
    let cancelled = false;
    const run = async () => {
      applyWholePageLanguage(siteLang);
      getLocalizedSuiteSamples(siteLang).then(samples => {
        if (cancelled) return;
        setLocalizedSamples(samples);
        setHeroDemoText(samples.heroDemo);
        setFontInput(samples.fontSample);
        setAutoInput(samples.autoSample);
      });
      if (siteLang === 'es') {
        setIsSiteTranslating(false);
      } else {
        setIsSiteTranslating(true);
        applyWholePageLanguage(siteLang).finally(() => {
          if (!cancelled) setIsSiteTranslating(false);
        });
      }
    };
    run();

    // Re-apply translation automatically whenever React mounts dynamic elements (modals, new views)
    const root = document.getElementById('root');
    if (!root || siteLang === 'es') return () => { cancelled = true; };

    let debounceTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver(mutations => {
      if (isPageTranslatorBusy()) return;
      // Filter out user typing inside text inputs, textareas or metronome ticks to keep UI at 60 FPS
      const hasMeaningfulMutation = mutations.some(m => {
        const targetEl = (m.target instanceof Element ? m.target : m.target.parentElement) as Element | null;
        if (!targetEl) return false;
        if (targetEl.tagName === 'TEXTAREA' || targetEl.tagName === 'INPUT' || targetEl.closest('[data-no-i18n="true"]')) {
          return false;
        }
        return true;
      });
      if (!hasMeaningfulMutation) return;

      if (debounceTimer) clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (!isPageTranslatorBusy()) {
          applyWholePageLanguage(siteLang);
        }
      }, 350);
    });
    // Omit characterData to ensure typing is 100% fluid without jank
    observer.observe(root, { childList: true, subtree: true });

    return () => {
      cancelled = true;
      if (debounceTimer) clearTimeout(debounceTimer);
      observer.disconnect();
    };
  }, [siteLang]);

  // PWA Install hook
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Splash Screen como página de bienvenida independiente:
  // Se muestra al cargar la aplicación inicialmente (o al abrir #splash)
  // Fondo negro (#000000) en modo oscuro y blanco (#ffffff) en modo claro
  const [showSplash, setShowSplash] = useState<boolean>(() => true);
  const [userCountry, setUserCountry] = useState<string>('España');
  const [countrySearchQuery, setCountrySearchQuery] = useState<string>('');

  // Atajos de teclado para entrar tras seleccionar país
  useEffect(() => {
    if (!showSplash) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowSplash(false);
        if (window.location.hash === '#splash') {
          window.location.hash = '#centro';
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSplash]);

  // Soporte para abrir el Splash en cualquier momento con #splash
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#splash') {
        setShowSplash(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Fondo puro (#000000 / #ffffff) sincronizado con el viewport completo en splash
  useEffect(() => {
    if (showSplash) {
      document.documentElement.style.backgroundColor = theme === 'dark' ? '#000000' : '#ffffff';
      document.body.style.backgroundColor = theme === 'dark' ? '#000000' : '#ffffff';
    } else {
      document.documentElement.style.backgroundColor = theme === 'dark' ? '#05070e' : '#f6f8fc';
      document.body.style.backgroundColor = '';
    }
  }, [showSplash, theme]);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const addToast = useCallback((text: string, kind: 'ok' | 'error' = 'ok') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, text, kind }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3400);
  }, []);

  // Haptic feedback helper
  const triggerHaptic = useCallback((ms = 14) => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        navigator.vibrate(ms);
      }
    } catch {
      // ignore
    }
  }, []);

  // Clipboard & Download helpers
  const copyText = useCallback(
    async (text: string, label = 'Copiado al portapapeles') => {
      if (!text) {
        addToast('No hay contenido para copiar', 'error');
        return;
      }
      triggerHaptic(12);
      try {
        await navigator.clipboard.writeText(text);
        addToast(label, 'ok');
      } catch {
        const area = document.createElement('textarea');
        area.value = text;
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        try {
          document.execCommand('copy');
          addToast(label, 'ok');
        } catch {
          addToast('No se pudo copiar el texto', 'error');
        }
        area.remove();
      }
    },
    [addToast, triggerHaptic]
  );

  const downloadTxt = useCallback(
    (filename: string, content: string) => {
      if (!content) {
        addToast('No hay contenido para descargar', 'error');
        return;
      }
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      addToast(`Descargado: ${filename}`);
    },
    [addToast]
  );

  // 1-Click Paste from Clipboard & Native Share / WhatsApp helpers
  const pasteFromClipboard = useCallback(
    async (setter: (val: string) => void, label = 'Texto pegado desde tu portapapeles') => {
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const clipText = await navigator.clipboard.readText();
          if (clipText) {
            setter(clipText);
            addToast(label, 'ok');
            return;
          }
        }
        addToast('Mantén pulsado dentro del cuadro y elige Pegar (o Ctrl+V)', 'error');
      } catch {
        addToast('Mantén pulsado dentro del cuadro y elige Pegar (o Ctrl+V)', 'error');
      }
    },
    [addToast]
  );

  // Native Web Speech API Voice Dictation (Speech-to-Text)
  const [dictatingTarget, setDictatingTarget] = useState<string | null>(null);
  const startVoiceDictation = useCallback(
    (targetKey: string, setter: (val: any) => void, lang = 'es-ES') => {
      const SpeechRec =
        (window as unknown as { SpeechRecognition?: SpeechRecognitionCtor; webkitSpeechRecognition?: SpeechRecognitionCtor })
          .SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionCtor }).webkitSpeechRecognition;
      if (!SpeechRec) {
        addToast('Tu navegador no soporta dictado por voz directo (usa Chrome, Edge o Safari)', 'error');
        return;
      }
      if (dictatingTarget === targetKey) {
        setDictatingTarget(null);
        return;
      }
      try {
        const rec = new SpeechRec();
        rec.lang = lang;
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        setDictatingTarget(targetKey);
        addToast('🎙️ Escuchando… Habla ahora para dictar tu texto', 'ok');
        rec.onresult = (event: SpeechRecognitionEventLike) => {
          const transcript = event?.results?.[0]?.[0]?.transcript || '';
          if (transcript.trim()) {
            setter((prev: any) => (prev && typeof prev === 'string' && prev.trim() ? `${prev.trim()} ${transcript.trim()}` : transcript.trim()));
            addToast('Texto dictado añadido con éxito', 'ok');
          }
        };
        rec.onerror = () => {
          setDictatingTarget(null);
          addToast('No se detectó voz o permiso de micrófono', 'error');
        };
        rec.onend = () => {
          setDictatingTarget(null);
        };
        rec.start();
      } catch {
        setDictatingTarget(null);
        addToast('No se pudo iniciar el micrófono', 'error');
      }
    },
    [addToast, dictatingTarget]
  );

  const shareResultText = useCallback(
    async (title: string, text: string) => {
      if (!text.trim()) {
        addToast('Genera o escribe un resultado antes de compartir', 'error');
        return;
      }
      if (navigator.share) {
        try {
          await navigator.share({ title, text });
          return;
        } catch {
          // user cancelled or fallback
        }
      }
      await copyText(text, 'Copiado listo para compartir en WhatsApp o redes');
    },
    [addToast, copyText]
  );

  // 1-Click Document File Loader (.txt, .md, .csv, .json, .srt, .html) & Printable PDF Report
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void, maxLen = 20000) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = ev => {
        const raw = typeof ev.target?.result === 'string' ? ev.target.result : '';
        if (raw.trim()) {
          setter(raw.slice(0, maxLen));
          addToast(`Archivo cargado: ${file.name}`, 'ok');
        }
      };
      reader.readAsText(file, 'utf-8');
      e.target.value = '';
    },
    [addToast]
  );

  const printFormattedReport = useCallback(
    (title: string, content: string, subtitle = 'Documento Oficial 930Text') => {
      if (!content || !content.trim()) {
        addToast('No hay contenido disponible para exportar a PDF', 'error');
        return;
      }
      try {
        const slug = (title || 'documento')
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .slice(0, 35) || '930text-documento';

        exportToPdfDocument(`${slug}.pdf`, title, content, subtitle);
        addToast(`PDF editorial maquetado descargado: ${slug}.pdf`, 'ok');
      } catch (err) {
        console.error('Error al generar PDF con jsPDF:', err);
        addToast('Error al generar el PDF editorial', 'error');
      }
    },
    [addToast]
  );

  // Local History & Recents
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('930text-history') || '[]');
    } catch {
      return [];
    }
  });
  const [historyFilter, setHistoryFilter] = useState('');

  const [recentTools, setRecentTools] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('930text-recents') || '[]');
    } catch {
      return [];
    }
  });

  const recordRecentTool = useCallback((toolId: string) => {
    setRecentTools(prev => {
      const next = [toolId, ...prev.filter(x => x !== toolId)].slice(0, 5);
      try {
        localStorage.setItem('930text-recents', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const saveToHistory = useCallback(
    (type: string, input: string, output: string, silent = false) => {
      if (!output.trim()) {
        if (!silent) addToast('Genera un resultado antes de guardar', 'error');
        return;
      }
      const entry: HistoryItem = {
        id: String(Date.now() + Math.random()),
        type,
        input: input.slice(0, 5000),
        output: output.slice(0, 10000),
        date: new Date().toISOString(),
        pinned: false
      };
      setHistory(prev => {
        if (prev[0] && prev[0].output === entry.output) return prev;
        const next = [entry, ...prev].slice(0, 50);
        try {
          localStorage.setItem('930text-history', JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
      if (!silent) addToast('Guardado en tu historial local');
    },
    [addToast]
  );

  const togglePinHistory = useCallback(
    (id: string) => {
      triggerHaptic(12);
      setHistory(prev => {
        const next = prev.map(item => (item.id === id ? { ...item, pinned: !item.pinned } : item));
        try {
          localStorage.setItem('930text-history', JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    [triggerHaptic]
  );

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory(prev => {
      const next = prev.filter(item => item.id !== id);
      try {
        localStorage.setItem('930text-history', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const clearAllHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('930text-history');
    } catch {
      // ignore
    }
  }, []);

  // Modals & Drawers state
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historyCategory, setHistoryCategory] = useState('Todos');
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabId | null>(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [commandQuery, setCommandQuery] = useState('');
  const [commandIdx, setCommandIdx] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#centro');
  const [toolSearch, setToolSearch] = useState('');

  // Dynamic SEO Page Title & Section Meta Handler
  useEffect(() => {
    const titlesMap: Record<string, string> = {
      '#centro': '930Text — 10 Suites de Texto Online Gratis (Fuentes, Rimas, Resúmenes, Citas APA)',
      '#fuente': 'Fuentes Unicode y Letras para Redes — 930Text',
      '#traductor': 'Traductor Multilingüe con Lectura por Voz — 930Text',
      '#resumidor': 'Resumidor de Textos y Apuntes (6 Modos) — 930Text',
      '#mejorador': 'Corrector Ortográfico y Mejorador de Redacción — 930Text',
      '#limpiador': 'Limpiador de Texto, Espacios y Saltos de PDF — 930Text',
      '#analizador': 'Contador de Palabras y Simulador SERP Google — 930Text',
      '#convertidor': 'Convertidor 20 en 1 (Mayúsculas, Slugs, Tablas) — 930Text',
      '#rimar': 'Diccionario de Rimas, Sílabas Poéticas y Ritmos BPM — 930Text',
      '#autopilot': 'Autopilot 5 en 1 (Flujo Inteligente 1-Clic) — 930Text',
      '#laboratorio': 'Comparador Diff A/B, Citas APA 7 y Plantillas — 930Text'
    };
    if (titlesMap[activeSection]) {
      document.title = titlesMap[activeSection];
    }
  }, [activeSection]);

  // Modal QR Transfer
  const [qrModal, setQrModal] = useState<{
    isOpen: boolean;
    title: string;
    text: string;
    qrDataUrl: string;
    generating: boolean;
  }>({
    isOpen: false,
    title: '',
    text: '',
    qrDataUrl: '',
    generating: false
  });

  // PWA Install Prompt State & Handler
  const [installPromptEvent, setInstallPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallApp = async () => {
    triggerHaptic(14);
    if (installPromptEvent) {
      installPromptEvent.prompt();
      const choice = await installPromptEvent.userChoice;
      if (choice.outcome === 'accepted') {
        setInstallPromptEvent(null);
        addToast('¡930Text instalado con éxito en tu dispositivo!', 'ok');
      }
    } else {
      setIsInstallModalOpen(true);
    }
  };

  const openQrTransfer = useCallback(
    async (title: string, text: string) => {
      if (!text || !text.trim()) {
        addToast('No hay texto para transferir por QR', 'error');
        return;
      }
      triggerHaptic(14);
      setQrModal({
        isOpen: true,
        title: title || 'Texto 930Text',
        text: text.trim(),
        qrDataUrl: '',
        generating: true
      });
      try {
        const url = await QRCode.toDataURL(text.trim(), {
          width: 320,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff'
          }
        });
        setQrModal(prev => ({ ...prev, qrDataUrl: url, generating: false }));
      } catch (err) {
        console.error('QR generation error:', err);
        setQrModal(prev => ({ ...prev, generating: false }));
        addToast('Error al generar el QR. El texto es demasiado extenso.', 'error');
      }
    },
    [addToast, triggerHaptic]
  );

  // Modal Social Card Generator (PNG)
  const [socialCardModal, setSocialCardModal] = useState<{
    isOpen: boolean;
    text: string;
    author: string;
    theme: SocialCardTheme;
    ratio: SocialCardRatio;
    previewUrl: string;
    loading: boolean;
  }>({
    isOpen: false,
    text: '',
    author: '930Text',
    theme: 'obsidian',
    ratio: '1:1',
    previewUrl: '',
    loading: false
  });

  const openSocialCardModal = useCallback(
    (text: string, defaultAuthor = '930Text') => {
      if (!text || !text.trim()) {
        addToast('No hay texto para crear la tarjeta', 'error');
        return;
      }
      triggerHaptic(14);
      setSocialCardModal({
        isOpen: true,
        text: text.trim().slice(0, 800),
        author: defaultAuthor,
        theme: 'obsidian',
        ratio: '1:1',
        previewUrl: '',
        loading: true
      });
    },
    [addToast, triggerHaptic]
  );

  useEffect(() => {
    if (!socialCardModal.isOpen || !socialCardModal.text) return;
    let cancelled = false;
    setSocialCardModal(prev => ({ ...prev, loading: true }));
    generateSocialCardBlob({
      text: socialCardModal.text,
      author: socialCardModal.author,
      theme: socialCardModal.theme,
      ratio: socialCardModal.ratio
    })
      .then(blob => {
        if (cancelled) return;
        const url = URL.createObjectURL(blob);
        setSocialCardModal(prev => {
          if (prev.previewUrl) URL.revokeObjectURL(prev.previewUrl);
          return { ...prev, previewUrl: url, loading: false };
        });
      })
      .catch(() => {
        if (!cancelled) setSocialCardModal(prev => ({ ...prev, loading: false }));
      });
    return () => {
      cancelled = true;
    };
  }, [
    socialCardModal.isOpen,
    socialCardModal.text,
    socialCardModal.author,
    socialCardModal.theme,
    socialCardModal.ratio
  ]);

  // Modo Enfoque Zen (Canvas de concentración sin distracciones)
  const [isZenOpen, setIsZenOpen] = useState(false);
  const [zenText, setZenText] = useState(
    'Escribe o pega aquí tu texto libre de distracciones. Este espacio cuenta tus palabras en vivo, calcula el tiempo de lectura y te permite transferir tu texto a cualquiera de las 10 suites en un solo clic.'
  );
  const [zenFontSize, setZenFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('lg');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const zenStats = useMemo(() => {
    const trimmed = zenText.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = zenText.length;
    const charsNoSpaces = zenText.replace(/\s+/g, '').length;
    const readTimeSec = Math.ceil((words / 200) * 60);
    const speakTimeSec = Math.ceil((words / 130) * 60);
    return { words, chars, charsNoSpaces, readTimeSec, speakTimeSec };
  }, [zenText]);

  // Exportador Multi-formato (Word, Markdown, JSON, PDF, TXT)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [exportDocTitle, setExportDocTitle] = useState('Documento 930Text');
  const [exportDocContent, setExportDocContent] = useState('');

  const openExportModal = useCallback((title: string, content: string) => {
    setExportDocTitle(title || 'Documento 930Text');
    setExportDocContent(content || '');
    setIsExportModalOpen(true);
  }, []);

  // 100% Free Mode — All tools and batch downloads execute directly; donations are optional
  const openSupportModal = useCallback((defaultAmount = '5') => {
    setDonationAmount(defaultAmount);
    setIsSupportOpen(true);
  }, []);

  // Interactive Hero Live Preview State (Universal for everyone)
  const [heroDemoText, setHeroDemoText] = useState('Escribe mejor, ahorra tiempo y destaca en cualquier lugar');
  const [heroDemoTab, setHeroDemoTab] = useState<'fuentes' | 'correccion' | 'metricas' | 'rimas'>('fuentes');

  const heroLiveFonts = useMemo(() => {
    return FONT_STYLES.slice(0, 4).map(f => ({
      name: f.name,
      output: f.transform(heroDemoText || '930Text')
    }));
  }, [heroDemoText]);

  const heroLiveAnalysis = useMemo(() => analyzeText(heroDemoText), [heroDemoText]);
  const heroLiveMeter = useMemo(() => analyzeVerseMeter(heroDemoText), [heroDemoText]);
  const heroLiveRhymes = useMemo(
    () => findRhymes(heroLiveMeter.endingWord !== '—' ? heroLiveMeter.endingWord : 'lugar', 'consonante', 6),
    [heroLiveMeter.endingWord]
  );

  // ---------------------------------------------------------------------------
  // 1. FUENTES UNICODE PRO STATE (36 Styles + 9 Frames)
  // ---------------------------------------------------------------------------
  const [fontInput, setFontInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-font') || 'Transforma tus textos, títulos y perfiles profesionales ✨';
    } catch {
      return 'Transforma tus textos, títulos y perfiles profesionales ✨';
    }
  });
  const [activeFrameId, setActiveFrameId] = useState<string>('none');
  const [favoriteFonts, setFavoriteFonts] = useState<string[]>(() => {
    try {
      return JSON.parse(
        localStorage.getItem('930text-fav-fonts') ||
        '["bold","sansBold","script","smallCaps"]'
      );
    } catch {
      return ['bold', 'sansBold', 'script', 'smallCaps'];
    }
  });

  const activeFrame = useMemo(
    () => FONT_FRAMES.find(f => f.id === activeFrameId) || FONT_FRAMES[0],
    [activeFrameId]
  );

  const toggleFavFont = (id: string) => {
    setFavoriteFonts(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('930text-fav-fonts', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };



  const speakText = (text: string, langCode: string) => {
    if (!text.trim()) {
      addToast('No hay texto para escuchar', 'error');
      return;
    }
    if (!('speechSynthesis' in window)) {
      addToast('Tu navegador no soporta lectura por voz', 'error');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      addToast('Voz detenida');
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const langInfo = getLanguageByCode(langCode);
    utter.lang = langInfo?.ttsLang || langCode || 'es-ES';
    utter.rate = 1.0;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  };



  // ---------------------------------------------------------------------------
  // 2. TRADUCTOR MULTILINGÜE STATE
  // ---------------------------------------------------------------------------
  const [transInput, setTransInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-trans') || 'Hola equipo, aquí adjunto el borrador del informe estratégico para su revisión antes de la reunión de mañana.';
    } catch {
      return 'Hola equipo, aquí adjunto el borrador del informe estratégico para su revisión antes de la reunión de mañana.';
    }
  });

  // ---------------------------------------------------------------------------
  // 3. RESUMIDOR PRO STATE
  // ---------------------------------------------------------------------------
  const [sumInput, setSumInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-sum') || 'Las herramientas lingüísticas de procesamiento de texto y maquetación digital están transformando radicalmente la productividad profesional. Al eliminar la dependencia de servidores externos, los usuarios disfrutan de privacidad absoluta, ejecución instantánea sin latencia de red y cero costes recurrentes.';
    } catch {
      return 'Las herramientas lingüísticas de procesamiento de texto y maquetación digital están transformando radicalmente la productividad profesional. Al eliminar la dependencia de servidores externos, los usuarios disfrutan de privacidad absoluta, ejecución instantánea sin latencia de red y cero costes recurrentes.';
    }
  });

  // ---------------------------------------------------------------------------
  // 4. MEJORADOR PRO STATE (REACTIVE + ORTHOGRAPHIC & STYLE ENGINE)
  // ---------------------------------------------------------------------------
  const [impInput, setImpInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-imp') || UNIVERSAL_PRESETS[1].sampleText;
    } catch {
      return UNIVERSAL_PRESETS[1].sampleText;
    }
  });
  const [impOutput, setImpOutput] = useState('');
  const [impLevel, setImpLevel] = useState<ImproveLevel>('editorial');
  const [impNotes, setImpNotes] = useState<string[]>([]);
  const [impStatus, setImpStatus] = useState<{ msg: string; type: '' | 'ok' | 'error' }>({ msg: '', type: '' });

  useEffect(() => {
    if (!impInput.trim()) {
      setImpOutput('');
      setImpNotes([]);
      return;
    }
    try {
      const { result, appliedNotes } = improveText(impInput, impLevel);
      setImpOutput(result);
      setImpNotes(appliedNotes);
    } catch {
      // ignore
    }
  }, [impInput, impLevel]);

  const handleImprove = (customText?: string) => {
    const sourceText = customText !== undefined ? customText : impInput;
    try {
      recordRecentTool('mejorador');
      const { result, changesCount, appliedNotes } = improveText(sourceText, impLevel);
      setImpOutput(result);
      setImpNotes(appliedNotes);
      setImpStatus({
        msg: `Texto perfeccionado al detalle (${changesCount} mejoras aplicadas).`,
        type: 'ok'
      });
    } catch (e: unknown) {
      setImpStatus({ msg: e instanceof Error ? e.message : 'Error al mejorar', type: 'error' });
    }
  };

  // ---------------------------------------------------------------------------
  // 5. LIMPIADOR PRO STATE (REACTIVE + PDF HYPHEN REPAIR)
  // ---------------------------------------------------------------------------
  const [cleanInput, setCleanInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-clean') || UNIVERSAL_PRESETS[2].sampleText;
    } catch {
      return UNIVERSAL_PRESETS[2].sampleText;
    }
  });

  // ---------------------------------------------------------------------------
  // 6. ANALIZADOR PRO STATE + SERP & SOCIAL PREVIEW
  // ---------------------------------------------------------------------------
  const [anInput, setAnInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-an') || UNIVERSAL_PRESETS[0].sampleText;
    } catch {
      return UNIVERSAL_PRESETS[0].sampleText;
    }
  });
  const [serpCustomTitle, setSerpCustomTitle] = useState('');
  const [serpCustomDesc, setSerpCustomDesc] = useState('');
  const [serpDomain, setSerpDomain] = useState('930text.es');
  
  const serpPreview = useMemo(
    () => buildSerpPreview(anInput, serpCustomTitle, serpCustomDesc, serpDomain),
    [anInput, serpCustomTitle, serpCustomDesc, serpDomain]
  );

  // ---------------------------------------------------------------------------
  // 7. CONVERTIDOR PRO STATE
  // ---------------------------------------------------------------------------
  const [convInput, setConvInput] = useState<string>(() => {
    try {
      return localStorage.getItem('tt-draft-conv') || 'Guía definitiva de productividad, diseño web y marketing digital 2026';
    } catch {
      return 'Guía definitiva de productividad, diseño web y marketing digital 2026';
    }
  });

  // Auto-save active drafts so the customer never loses work on refresh
  useEffect(() => {
    try {
      localStorage.setItem('tt-draft-font', fontInput);
      localStorage.setItem('tt-draft-trans', transInput);
      localStorage.setItem('tt-draft-sum', sumInput);
      localStorage.setItem('tt-draft-imp', impInput);
      localStorage.setItem('tt-draft-clean', cleanInput);
      localStorage.setItem('tt-draft-an', anInput);
      localStorage.setItem('tt-draft-conv', convInput);
    } catch {
      // ignore storage quota
    }
  }, [fontInput, transInput, sumInput, impInput, cleanInput, anInput, convInput]);

  useEffect(() => {
    const loadFromHash = () => {
      const decoded = decodeWorkspaceShareHash(window.location.hash);
      if (!decoded) return;
      const { tool, text } = decoded;
      if (tool === 'fuente') setFontInput(text);
      else if (tool === 'traductor') setTransInput(text);
      else if (tool === 'resumidor') setSumInput(text);
      else if (tool === 'mejorador') setImpInput(text);
      else if (tool === 'limpiador') setCleanInput(text);
      else if (tool === 'analizador') setAnInput(text);
      else if (tool === 'convertidor') setConvInput(text);
      else if (tool === 'autopilot') setAutoInput(text);

      setTimeout(() => {
        const el = document.getElementById(tool);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 350);
      addToast(`Sesión compartida cargada en ${tool.toUpperCase()}`);
    };
    loadFromHash();
    window.addEventListener('hashchange', loadFromHash);
    return () => window.removeEventListener('hashchange', loadFromHash);
  }, [addToast]);

  // ---------------------------------------------------------------------------
  // 9. AUTOPILOT 1-CLICK PIPELINE & ENTERPRISE LAB STATE (SUITES 09 & 10)
  // ---------------------------------------------------------------------------
  const [autoInput, setAutoInput] = useState<string>(
    'Ayer abi en la tarde yo fui al supermercao porq abia ke comprar barias kosas que me faltavan en la kasa. Ademas, la optimizacion de flujos de trabajo y el formateo digital avanzado estan transformando la productividad de estudiantes, empresas y creadores digitales en un 42% anual. Sin embargo, el 68% de los equipos pierde mas de 4 horas semanales limpiando documentos PDF mal formateados, redactando correos repetitivos y preparando informes ejecutivos.'
  );

  // Song Blueprint Generator State inside Rimar Studio
  const [songStyle, setSongStyle] = useState<'urbano' | 'pop' | 'balada' | 'epico'>('urbano');

  // Online / Offline Connectivity Detection
  // Online / Offline Connectivity Detection
  const [isOnline, setIsOnline] = useState<boolean>(() => (typeof navigator !== 'undefined' ? navigator.onLine : true));
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      addToast('Conexión a internet restablecida');
    };
    const handleOffline = () => {
      setIsOnline(false);
      addToast('Modo sin conexión activo — usando caché local', 'error');
    };
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [addToast]);

  // ---------------------------------------------------------------------------
  // ZERO-CONFIG FEEDBACK TO RAFA.930MUSIC@GMAIL.COM (FormSubmit AJAX + Mailto)
  // ---------------------------------------------------------------------------
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackCategory, setFeedbackCategory] = useState('Sugerencia de mejora');
  const [feedbackSending, setFeedbackSending] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState<{ msg: string; type: '' | 'ok' | 'error' }>({ msg: '', type: '' });
  const [donationAmount, setDonationAmount] = useState('5');

  const handleFeedbackSubmit = async () => {
    if (!rating) {
      setFeedbackStatus({ msg: 'Por favor, selecciona primero una valoración de 1 a 5 estrellas.', type: 'error' });
      return;
    }

    setFeedbackSending(true);
    setFeedbackStatus({ msg: 'Enviando tu valoración a rafa.930music@gmail.com…', type: '' });

    const starsVisual = '★'.repeat(rating) + '☆'.repeat(5 - rating);
    const cleanMsg = feedbackText.trim() || 'Valoración enviada sin comentario adicional.';

    try {
      // 1. Send directly to rafa.930music@gmail.com via FormSubmit AJAX (works on GitHub Pages without backend)
      let sentViaFormSubmit = false;
      try {
        const fsRes = await fetch('https://formsubmit.co/ajax/rafa.930music@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            _subject: `930Text Valoración: ${starsVisual} (${rating}/5) - ${feedbackCategory}`,
            Valoracion: `${rating} de 5 estrellas (${starsVisual})`,
            Tipo: feedbackCategory,
            Comentario: cleanMsg,
            Fecha: new Date().toLocaleString('es-ES'),
            Origen: window.location.href
          })
        });
        if (fsRes.ok) {
          sentViaFormSubmit = true;
        }
      } catch {
        // Fallback below
      }

      // 2. Also send to local backend if running Express
      try {
        await fetch('./api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating, message: `[${feedbackCategory}] ${cleanMsg}` })
        });
      } catch {
        // ignore on static hosting
      }

      // 3. Save locally in browser record
      try {
        const prev = JSON.parse(
          localStorage.getItem('930text-feedback') ||
          '[]'
        );
        prev.unshift({
          rating,
          category: feedbackCategory,
          message: cleanMsg,
          created_at: new Date().toISOString()
        });
        localStorage.setItem('930text-feedback', JSON.stringify(prev.slice(0, 50)));
      } catch {
        // ignore
      }

      setFeedbackStatus({
        msg: sentViaFormSubmit
          ? '¡Muchas gracias! Tu valoración se ha enviado correctamente al equipo de 930Text.'
          : '¡Muchas gracias! Tu opinión ha quedado registrada. Puedes remitir cualquier sugerencia adicional a rafa.930music@gmail.com.',
        type: 'ok'
      });
      setFeedbackText('');
      setRating(0);
    } finally {
      setFeedbackSending(false);
    }
  };

  // Send output of any tool to another tool
  const sendToTool = (targetId: string, textToPass: string) => {
    if (!textToPass.trim()) {
      addToast('No hay texto de salida para enviar', 'error');
      return;
    }
    recordRecentTool(targetId);
    if (targetId === 'fuente') setFontInput(textToPass.slice(0, 500));
    else if (targetId === 'traductor') setTransInput(textToPass.slice(0, 5000));
    else if (targetId === 'resumidor') setSumInput(textToPass.slice(0, 20000));
    else if (targetId === 'mejorador') setImpInput(textToPass.slice(0, 8000));
    else if (targetId === 'limpiador') setCleanInput(textToPass.slice(0, 15000));
    else if (targetId === 'analizador') setAnInput(textToPass.slice(0, 20000));
    else if (targetId === 'convertidor') setConvInput(textToPass.slice(0, 10000));
    else if (targetId === 'autopilot') setAutoInput(textToPass.slice(0, 15000));
    else {
      navigator.clipboard?.writeText(textToPass);
      addToast('Texto copiado al portapapeles para pegar en la herramienta');
    }
    const el = document.getElementById(targetId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    addToast(`Texto enviado a ${targetId.charAt(0).toUpperCase() + targetId.slice(1)}`);
  };

  // Command palette filtering & keyboard shortcuts
  const filteredCommands = useMemo(() => {
    const q = commandQuery.toLowerCase().trim();
    if (!q) return COMMAND_ITEMS;
    return COMMAND_ITEMS.filter(item => `${item.title} ${item.desc}`.toLowerCase().includes(q));
  }, [commandQuery]);

  const executeCommandTarget = useCallback((target: string) => {
    setIsCommandOpen(false);
    if (target === 'history') {
      setIsHistoryOpen(true);
      return;
    }
    if (target === 'support') {
      setIsSupportOpen(true);
      return;
    }
    if (target === 'legal') {
      setLegalModalTab('privacy');
      return;
    }
    if (target === 'zen') {
      setIsZenOpen(true);
      return;
    }
    if (target === 'export') {
      openExportModal(
        'Documento 930Text',
        zenText || autoInput || '930Text'
      );
      return;
    }
    if (target === '#splash') {
      window.location.hash = '#splash';
      setShowSplash(true);
      return;
    }
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [openExportModal, zenText, autoInput]);

  const executeCommand = useCallback((cmd: { id?: string; href?: string; target?: string }) => {
    executeCommandTarget(cmd.href || cmd.target || cmd.id || '');
  }, [executeCommandTarget]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
        setCommandQuery('');
        setCommandIdx(0);
        return;
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
        setIsSupportOpen(false);
        setIsSiteLangModalOpen(false);
        setLegalModalTab(null);
        setIsHistoryOpen(false);
        setIsMobileMenuOpen(false);
        setIsZenOpen(false);
        setIsExportModalOpen(false);
        setQrModal(prev => ({ ...prev, isOpen: false }));
        setSocialCardModal(prev => ({ ...prev, isOpen: false }));
      }
      if (isCommandOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setCommandIdx(prev => (filteredCommands.length ? (prev + 1) % filteredCommands.length : 0));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setCommandIdx(prev =>
            filteredCommands.length ? (prev - 1 + filteredCommands.length) % filteredCommands.length : 0
          );
        } else if (e.key === 'Enter' && filteredCommands[commandIdx]) {
          e.preventDefault();
          executeCommandTarget(filteredCommands[commandIdx].target);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isCommandOpen, filteredCommands, commandIdx, executeCommandTarget]);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100)));
      }
    };
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  // Global Escape & Cmd/Ctrl + K shortcuts
  useEffect(() => {
    const handleGlobalEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsHistoryOpen(false);
        setIsCommandOpen(false);
        setIsSupportOpen(false);
        setIsSiteLangModalOpen(false);
        setIsExportModalOpen(false);
        setLegalModalTab(null);
        setShowIOSGuide(false);
        setIsZenOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalEsc);
    return () => window.removeEventListener('keydown', handleGlobalEsc);
  }, []);

  useEffect(() => {
    const sectionIds = ['autopilot', 'centro', 'fuente', 'traductor', 'resumidor', 'mejorador', 'limpiador', 'analizador', 'convertidor', 'rimar', 'laboratorio', 'faq'];
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.2, rootMargin: '-10% 0px -55% 0px' }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const filteredTools = useMemo(() => {
    const q = toolSearch.toLowerCase().trim();
    if (!q) return TOOL_CATALOG;
    return TOOL_CATALOG.filter(t => `${t.title} ${t.subtitle} ${t.search}`.toLowerCase().includes(q));
  }, [toolSearch]);

  const parsedDonation = Number(donationAmount.replace(',', '.'));
  const validDonation = Number.isFinite(parsedDonation) && parsedDonation >= 1 && parsedDonation <= 10000;
  const paypalHref = validDonation
    ? `https://www.paypal.com/paypalme/Rafa930paypal/${encodeURIComponent(String(Math.round(parsedDonation * 100) / 100))}`
    : 'https://www.paypal.com/paypalme/Rafa930paypal/5';

  const mailtoFeedbackHref = useMemo(() => {
    const stars = rating ? `${rating}/5 estrellas` : '5/5 estrellas';
    const subject = encodeURIComponent(`Valoración 930Text (${stars}) - ${feedbackCategory}`);
    const body = encodeURIComponent(
      `Hola equipo de 930Text,\n\nMi valoración para 930Text: ${stars}\nCategoría: ${feedbackCategory}\n\nComentario:\n${feedbackText.trim() || '¡Me ha resultado muy útil la web!'}\n`
    );
    return `mailto:rafa.930music@gmail.com?subject=${subject}&body=${body}`;
  }, [rating, feedbackCategory, feedbackText]);

  // =========================================================================
  // 1. PÁGINA INDEPENDIENTE DE SPLASH SCREEN
  // Fondo negro puro (#000000) en modo oscuro y blanco puro (#ffffff) en modo claro
  // =========================================================================
  if (showSplash) {
    return (
      <main
        role="main"
        data-no-i18n="true"
        aria-label="930Text Pantalla de Configuración Inicial con Galaxia"
        style={
          theme === 'dark'
            ? {
                background: `
                  radial-gradient(1200px 900px at 15% 15%, rgba(139, 92, 246, 0.28), transparent 70%),
                  radial-gradient(1000px 800px at 85% 85%, rgba(2, 132, 199, 0.22), transparent 70%),
                  radial-gradient(900px 700px at 50% 30%, rgba(217, 119, 6, 0.18), transparent 75%),
                  radial-gradient(1.5px 1.5px at 10% 20%, rgba(255, 255, 255, 0.7) 1.5px, transparent 0),
                  radial-gradient(1px 1px at 30% 70%, rgba(56, 232, 255, 0.6) 1px, transparent 0),
                  radial-gradient(1.5px 1.5px at 70% 30%, rgba(240, 201, 107, 0.7) 1.5px, transparent 0),
                  radial-gradient(1px 1px at 85% 75%, rgba(255, 255, 255, 0.5) 1px, transparent 0),
                  #000000
                `
              }
            : undefined
        }
        className={`min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 select-none transition-colors duration-200 relative ${
          theme === 'dark' ? 'text-white' : 'bg-[#ffffff] text-black'
        }`}
      >
        <div className="absolute top-5 right-5 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label="Cambiar tema"
            className={`p-2.5 rounded-xl border text-xs font-bold transition ${
              theme === 'dark'
                ? 'border-neutral-800 bg-neutral-900/90 text-white hover:bg-neutral-800'
                : 'border-neutral-300 bg-neutral-100 text-black hover:bg-neutral-200'
            }`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-800" />}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center text-center max-w-lg w-full mx-auto py-8">
          <div className="flex items-center gap-3 font-display font-extrabold tracking-tight mb-2">
            <span className="w-12 h-12 rounded-2xl grid place-items-center bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#D97706] shadow-xl shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 6.5h14M5 11.5h10M5 16.5h7" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-3xl sm:text-4xl font-black text-[var(--text)] tracking-tight">
              930<span className="bg-gradient-to-r from-[#38E8FF] via-[#9D8CFF] to-[#F0C96B] bg-clip-text text-transparent">Text</span>
            </span>
          </div>
          <p className="text-[11px] font-extrabold tracking-[0.25em] uppercase text-[var(--brand2)] mb-1">
            UN TEXTO, MÚLTIPLES POSIBILIDADES
          </p>
          <p className="text-xs text-[var(--muted)] mb-4">
            Creado con pasión por <strong className="text-[var(--brand2)]">Rafa 930</strong> · Busca y selecciona tu país para calibrar el análisis:
          </p>

          {/* Search box for countries */}
          <div className="w-full mb-3 relative" data-no-i18n="true">
            <input
              type="text"
              value={countrySearchQuery}
              onChange={e => setCountrySearchQuery(e.target.value)}
              placeholder="🔍 Buscar país (ej. España, México, Argentina…)"
              className={`w-full p-3 pl-4 rounded-2xl border text-xs sm:text-sm font-bold shadow-md transition outline-none ${
                theme === 'dark'
                  ? 'border-neutral-700 bg-neutral-900/90 text-white placeholder-neutral-400 focus:border-[var(--brand2)]'
                  : 'border-neutral-300 bg-white text-black placeholder-neutral-500 focus:border-[var(--brand2)]'
              }`}
            />
          </div>

          {/* Scrollable country results grid from WORLD_LANGUAGES */}
          <div
            className={`w-full max-h-56 overflow-y-auto p-2 rounded-2xl border mb-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-left ${
              theme === 'dark' ? 'border-neutral-800 bg-neutral-950/80' : 'border-neutral-200 bg-neutral-50'
            }`}
            data-no-i18n="true"
          >
            {WORLD_LANGUAGES
              .filter(l => `${l.name} ${l.nativeName}`.toLowerCase().includes(countrySearchQuery.toLowerCase()))
              .map(l => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => {
                    setUserCountry(l.name);
                    setSiteLang(l.code);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition flex items-center justify-between gap-2 text-left cursor-pointer ${
                    userCountry === l.name
                      ? 'border-[var(--brand2)] bg-[var(--brand2)]/25 text-[var(--brand2)] shadow-sm scale-[1.01]'
                      : theme === 'dark'
                      ? 'border-neutral-800 bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                      : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-base shrink-0">{l.flag}</span>
                    <span className="truncate">{l.name}</span>
                  </div>
                  <span className="text-[10px] text-[var(--muted)] font-normal shrink-0">({l.nativeName})</span>
                </button>
              ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setShowSplash(false);
              if (window.location.hash === '#splash') {
                window.location.hash = '#centro';
              }
              addToast(`Región seleccionada: ${userCountry}. ¡Bienvenido a 930Text!`);
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-white text-sm font-extrabold shadow-xl hover:brightness-110 active:scale-95 transition cursor-pointer"
          >
            Entrar a 930Text ({userCountry}) ➔
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-indigo-500/25">
      {/* TOPBAR — STRICT 3-ZONE LUXURY CONTRACT & CLEAN MOBILE HEADER */}
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        isOnline={isOnline}
        historyLength={history.length}
        setIsHistoryOpen={setIsHistoryOpen}
        setIsCommandOpen={setIsCommandOpen}
        setIsSiteLangModalOpen={setIsSiteLangModalOpen}
        setSiteLangSearch={setSiteLangSearch}
        setCommandQuery={setCommandQuery}
        setCommandIdx={setCommandIdx}
        triggerHaptic={triggerHaptic}
        activeSection={activeSection}
        navLinks={[
          ["#centro", "Suites (10)"],
          ["#fuente", "Fuentes"],
          ["#resumidor", "Resumir"],
          ["#mejorador", "Corrector"],
          ["#rimar", "Rimas & Diccionario"]
        ].map(([href, label]) => ({ href, label }))}
        currentSiteLangMeta={currentSiteLangMeta}
        isSiteTranslating={isSiteTranslating}
      />

      <main id="contenido" className="flex-1 pb-24 lg:pb-0">
        {/* =====================================================================
            HERO SECTION — CLEAN VALUE PROPOSITION + LIVE INTERACTIVE DEMO
            ===================================================================== */}
        <Hero
          zenText={zenText}
          autoInput={autoInput}
          impInput={impInput}
          fontInput={fontInput}
          openExportModal={openExportModal}
          heroDemoTab={heroDemoTab}
          setHeroDemoTab={setHeroDemoTab}
          heroDemoText={heroDemoText}
          setHeroDemoText={setHeroDemoText}
          heroLiveFonts={heroLiveFonts}
          heroLiveAnalysis={heroLiveAnalysis}
          heroLiveMeter={heroLiveMeter}
          heroLiveRhymes={heroLiveRhymes}
          copyText={copyText}
          setFontInput={setFontInput}
          setImpInput={setImpInput}
          setAnInput={setAnInput}
        />

        <BentoCenter
          toolSearch={toolSearch}
          setToolSearch={setToolSearch}
          recentTools={recentTools}
          setRecentTools={setRecentTools}
          recordRecentTool={recordRecentTool}
          filteredTools={filteredTools}
        />

        <FontSuite 
          input={fontInput}
          onInputChange={setFontInput}
          fontStyles={FONT_STYLES}
          activeFrame={activeFrame}
          onFrameChange={setActiveFrameId}
          onCopy={copyText}
          onOpenQr={openQrTransfer}
          onOpenSocialCard={openSocialCardModal}
          favoriteFonts={favoriteFonts}
          toggleFavFont={toggleFavFont}
          copyText={copyText}
        />
        <TranslatorSuite
          input={transInput}
          onInputChange={setTransInput}
          copyText={copyText}
          downloadTxt={downloadTxt}
          saveToHistory={saveToHistory}
          openQrTransfer={openQrTransfer}
          openSocialCardModal={openSocialCardModal}
          printFormattedReport={printFormattedReport}
          sendToTool={sendToTool}
          addToast={addToast}
          pasteFromClipboard={pasteFromClipboard}
          sampleText={localizedSamples.transSample}
        />

        <ResumidorSuite
          input={sumInput}
          onInputChange={setSumInput}
          copyText={copyText}
          downloadTxt={downloadTxt}
          printFormattedReport={printFormattedReport}
          encodeWorkspaceShareHash={encodeWorkspaceShareHash}
          saveToHistory={saveToHistory}
          startVoiceDictation={startVoiceDictation}
          dictatingTarget={dictatingTarget}
          pasteFromClipboard={pasteFromClipboard}
          sampleText={localizedSamples.sumSample}
          openQrTransfer={openQrTransfer}
          openSocialCardModal={openSocialCardModal}
          speakText={speakText}
          sendToTool={sendToTool}
          addToast={addToast}
          handleFileUpload={handleFileUpload}
        />

        {/* 4. MEJORADOR PRO WORKSPACE (EXTRACTED SUITE) */}
        <MejoradorSuite
          input={impInput}
          onInputChange={setImpInput}
          copyText={copyText}
          downloadTxt={downloadTxt}
          openQrTransfer={openQrTransfer}
          openSocialCardModal={openSocialCardModal}
          saveToHistory={saveToHistory}
          sendToTool={sendToTool}
          sampleText={siteLang === 'es' ? undefined : localizedSamples.impSample}
          encodeWorkspaceShareHash={encodeWorkspaceShareHash}
          startVoiceDictation={startVoiceDictation}
          dictatingTarget={dictatingTarget}
          onRecordRecent={recordRecentTool}
        />

        {/* 5. LIMPIADOR PRO WORKSPACE (EXTRACTED SUITE) */}
        <LimpiadorSuite
          input={cleanInput}
          onInputChange={setCleanInput}
          copyText={copyText}
          downloadTxt={downloadTxt}
          saveToHistory={saveToHistory}
          sendToTool={sendToTool}
          sampleText={siteLang === 'es' ? undefined : localizedSamples.cleanSample}
          onRecordRecent={recordRecentTool}
        />

        {/* 6. ANALIZADOR PRO WORKSPACE (EXTRACTED SUITE) */}
        <AnalizadorSuite
          input={anInput}
          onInputChange={setAnInput}
          copyText={copyText}
          downloadTxt={downloadTxt}
          sampleText={localizedSamples.anSample}
        />

        {/* 7. CONVERTIDOR PRO WORKSPACE (EXTRACTED SUITE) */}
        <ConvertidorSuite
          input={convInput}
          onInputChange={setConvInput}
          copyText={copyText}
          downloadTxt={downloadTxt}
          saveToHistory={saveToHistory}
          sampleText={localizedSamples.convSample}
          onRecordRecent={recordRecentTool}
          openSocialCardModal={openSocialCardModal}
          openQrTransfer={openQrTransfer}
          printFormattedReport={printFormattedReport}
          sendToTool={sendToTool}
          addToast={addToast}
        />

        {/* 8. RIMAR · MÚSICA ESTUDIO PRO WORKSPACE (EXTRACTED SUITE) */}
        <RimarSuite
          copyText={copyText}
          downloadTxt={downloadTxt}
          addToast={addToast}
          speakText={speakText}
          sendToTool={sendToTool}
          onRecordRecent={recordRecentTool}
        />

        {/* =====================================================================
            SUITE 09 · AUTOPILOT 1-CLIC (EXTRACTED SUITE)
            ===================================================================== */}
        <AutopilotSuite
          input={autoInput}
          onInputChange={setAutoInput}
          copyText={copyText}
          downloadTxt={downloadTxt}
          printFormattedReport={printFormattedReport}
          encodeWorkspaceShareHash={encodeWorkspaceShareHash}
          startVoiceDictation={startVoiceDictation}
          dictatingTarget={dictatingTarget}
          sampleText={localizedSamples.autoSample}
        />

        {/* =====================================================================
            SUITE 10 · LABORATORIO DOCUMENTAL, CITAS APA 7 & PLANTILLAS B2B
            ===================================================================== */}
        <LaboratorioSuite
          copyText={copyText}
          downloadTxt={downloadTxt}
          addToast={addToast}
        />

        {/* =====================================================================
            SUITE 11 · RECONOCIMIENTO ÓPTICO DE CARACTERES (OCR)
            ===================================================================== */}


        {/* =====================================================================
            VOLUNTARY DONATION SECTION — 100% FREE PLATFORM
            ===================================================================== */}
        <DonationSection
          openSupportModal={openSupportModal}
          setLegalModalTab={setLegalModalTab}
        />

        <section id="faq" className="py-10 sm:py-14 border-t border-[var(--line)]">
          <div className="max-w-[1260px] mx-auto px-4 sm:px-5 grid lg:grid-cols-12 gap-8 items-start">
            {/* Left 6 cols: Concise FAQ */}
            <div className="lg:col-span-6">
              <span className="section-number">GUÍA RÁPIDA & DUDAS FRECUENTES</span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Preguntas frecuentes
              </h2>
              <div className="mt-4 divide-y divide-[var(--line)] border-y border-[var(--line)]">
                {[
                  [
                    '¿Cómo cambiar el tipo de letra para Instagram, TikTok, WhatsApp o LinkedIn?',
                    'Escribe tu frase en Fuentes Unicode Pro (#fuente), elige entre los 44 estilos tipográficos y ${CATALOG.FRAMES_LABEL} decorativos y pulsa Copiar. Al usar estándares Unicode oficiales, el formato se mantiene en biografías, comentarios y publicaciones.'
                  ],
                  [
                    '¿Cómo funciona el Resumidor de Textos y Apuntes?',
                    'Analiza la densidad léxica y posición de cada frase para sintetizar textos largos en 6 formatos: ficha ejecutiva, viñetas de estudio, párrafo fluido, preguntas tipo test, plan de acción o hilo para redes.'
                  ],
                  [
                    '¿Cómo mide las sílabas poéticas y encuentra rimas en más de 15.000 palabras?',
                    'El estudio Rimar (#rimar) indexa el diccionario español completo con definiciones y sinónimos, y divide cada verso aplicando sinalefas y la ley del acento final (+1 aguda, -1 esdrújula).'
                  ],
                  [
                    '¿Hay suscripción, registro o costes ocultos?',
                    'No. Todas las herramientas funcionan gratis y al instante sin crear cuenta. Si te ahorra tiempo, puedes apoyar el proyecto voluntariamente por PayPal.'
                  ]
                ].map(([q, a]) => (
                  <details key={q} className="py-3.5 group">
                    <summary className="cursor-pointer font-extrabold text-sm text-[var(--text)] leading-snug">
                      {q}
                    </summary>
                    <p className="mt-2 text-xs sm:text-sm text-[var(--muted)] leading-relaxed">{a}</p>
                  </details>
                ))}
              </div>
            </div>

            {/* Right 6 cols: Direct Feedback + Optional Coffee Support */}
            <div id="valoracion" className="lg:col-span-6 space-y-4">
              <div className="p-5 sm:p-6 rounded-[24px] studio-console">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="section-number">VALORACIONES 930TEXT</span>
                    <h3 className="font-display text-lg sm:text-xl font-extrabold mt-0.5 text-[var(--text)]">
                      Valora y opina sobre 930Text
                    </h3>
                  </div>
                  <div className="flex gap-1" role="group" aria-label="Valoración de 1 a 5 estrellas">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        aria-label={`${star} de 5 estrellas`}
                        className={`w-9 h-9 rounded-xl border text-base transition ${
                          star <= rating
                            ? 'border-[var(--gold)] bg-[var(--gold-soft)] text-[var(--gold)] font-bold'
                            : 'border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)]'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                  {['Sugerencia de mejora', 'Me ha ahorrado tiempo', 'Nueva herramienta', 'Reporte de fallo'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFeedbackCategory(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition whitespace-nowrap shrink-0 ${
                        feedbackCategory === cat
                          ? 'border-[var(--brand2)] bg-[var(--brand2)]/15 text-[var(--brand2)]'
                          : 'border-[var(--line)] bg-[var(--surface2)] text-[var(--muted)] hover:text-[var(--text)]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <textarea
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  maxLength={LIMITS.GLOBAL_MAX}
                  rows={2}
                  placeholder="Escribe tu comentario o sugerencia sobre 930Text…"
                  className="mt-2.5 w-full p-3 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs sm:text-sm text-[var(--text)]"
                />

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <button
                    type="button"
                    disabled={feedbackSending}
                    onClick={handleFeedbackSubmit}
                    className="min-h-[38px] px-4 py-1.5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] disabled:opacity-50 inline-flex items-center justify-center shadow-md"
                  >
                    {feedbackSending ? 'Enviando…' : 'Enviar valoración'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsSupportOpen(true)}
                    className="min-h-[38px] px-3.5 py-1.5 rounded-xl border border-[#c92573]/50 bg-[#c92573]/10 text-[#ee4f98] text-xs font-extrabold inline-flex items-center justify-center gap-1.5 hover:bg-[#c92573]/20 transition"
                  >
                    <Gift className="w-3.5 h-3.5 shrink-0" />
                    <span>Donar en PayPal</span>
                  </button>
                </div>

                {feedbackStatus.msg && (
                  <p
                    role="status"
                    className={`mt-2.5 text-xs font-bold ${
                      feedbackStatus.type === 'ok' ? 'text-[var(--green)]' : 'text-[var(--danger)]'
                    }`}
                  >
                    {feedbackStatus.msg}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER WITH INTERNAL SEO ANCHOR DIRECTORY */}
      {/* FOOTER WELL-STRUCTURED AND SCHEMATIZED */}
      <Footer
        theme={theme}
        setShowSplash={setShowSplash}
        setLegalModalTab={setLegalModalTab}
        openSupportModal={openSupportModal}
      />

      {/* PWA / APP DISCOVERY SECTION — FRICTIONLESS END-OF-PAGE INSTALL CTA */}
      <PWADiscoverySection
        onSeeFeatures={() => {
          const el = document.getElementById('centro');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.location.hash = '#centro';
          }
        }}
      />

      {/* PERMANENT MOBILE & TABLET BOTTOM NAVIGATION BAR + UPWARD SHEET */}
      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/55 backdrop-blur-xs"
        />
      )}

      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú completo de herramientas"
          className="lg:hidden fixed left-2.5 right-2.5 bottom-[74px] z-50 rounded-3xl studio-console p-4 space-y-3 shadow-2xl max-h-[72dvh] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
            <strong className="font-display text-sm font-extrabold text-[var(--text)]">
              Las 10 Suites de 930Text
            </strong>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Cerrar menú"
              className="w-7 h-7 rounded-lg grid place-items-center border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {TOOL_CATALOG.map(tool => {
              const ToolIcon = tool.icon;
              const active = activeSection === tool.href;
              return (
                <a
                  key={tool.id}
                  href={tool.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition ${
                    active
                      ? 'border-[var(--brand2)] bg-[var(--brand-soft)] text-[var(--brand2)]'
                      : 'border-[var(--line)] bg-[var(--surface2)] text-[var(--text)]'
                  }`}
                >
                  <ToolIcon className="w-4 h-4 shrink-0 text-[var(--brand2)]" />
                  <span className="leading-snug">{tool.title}</span>
                </a>
              );
            })}
          </div>

          {/* Accesos rápidos organizados en cuadrícula simétrica sin desbordamiento */}
          <div className="pt-2 border-t border-[var(--line)] space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setSiteLangSearch('');
                  setIsSiteLangModalOpen(true);
                }}
                data-no-i18n="true"
                className="h-10 px-2.5 rounded-xl border border-[var(--brand2)]/45 bg-[var(--brand-soft)] text-xs font-bold inline-flex items-center justify-center gap-1.5 truncate"
              >
                <span className="text-base">{currentSiteLangMeta.flag}</span>
                <span className="truncate">{currentSiteLangMeta.name}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCommandOpen(true);
                }}
                className="h-10 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold text-[var(--text)] inline-flex items-center justify-center gap-1.5 truncate"
              >
                <Search className="w-3.5 h-3.5 text-[var(--brand2)] shrink-0" />
                <span className="truncate">Buscar ⌘K</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsHistoryOpen(true);
                }}
                className="h-10 px-2.5 rounded-xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold text-[var(--text)] inline-flex items-center justify-center gap-1.5 truncate"
              >
                <History className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
                <span className="truncate">Historial ({history.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openExportModal(
                    'Documento 930Text',
                    zenText || autoInput || '930Text'
                  );
                }}
                className="h-10 px-2.5 rounded-xl border border-[var(--gold)]/40 bg-[var(--gold-soft)] text-xs font-bold text-[var(--gold)] inline-flex items-center justify-center gap-1.5 truncate"
              >
                <Download className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Exportar</span>
              </button>
            </div>

            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSupportOpen(true);
                }}
                className="w-full h-10 px-3 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-[#c92573] to-[#ee4f98] inline-flex items-center justify-center gap-1.5 shadow-xs truncate"
              >
                <Gift className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Apoyar proyecto</span>
              </button>
            </div>

            <div className="pt-1 flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setLegalModalTab('privacy');
                }}
                className="text-[11px] font-bold text-[var(--muted)] hover:text-[var(--text)] underline py-1"
              >
                Aviso Legal y Privacidad
              </button>
            </div>
          </div>
        </div>
      )}

      <nav
        aria-label="Menú inferior fijo en móvil"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--line)] bg-[var(--surface)]/95 backdrop-blur-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.35)] px-1.5 pt-1 pb-[max(0.45rem,env(safe-area-inset-bottom))]"
      >
        <div className="max-w-lg mx-auto grid grid-cols-5 gap-0.5 sm:gap-1">
          {[
            { href: '#fuente', label: 'Fuentes', icon: Type },
            { href: '#traductor', label: 'Traducir', icon: Languages },
            { href: '#resumidor', label: 'Resumir', icon: AlignLeft },
            { href: '#rimar', label: 'Rimar', icon: Music }
          ].map(item => {
            const IconComp = item.icon;
            const isActive = activeSection === item.href && !isMobileMenuOpen;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-extrabold transition truncate ${
                  isActive
                    ? 'bg-[var(--brand-soft)] text-[var(--brand2)]'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
                }`}
              >
                <IconComp className="w-4 h-4 mb-0.5 shrink-0" />
                <span className="truncate max-w-full text-center leading-tight">{item.label}</span>
              </a>
            );
          })}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            aria-expanded={isMobileMenuOpen}
            className={`flex flex-col items-center justify-center py-1.5 px-0.5 rounded-xl text-[10px] font-extrabold transition truncate ${
              isMobileMenuOpen
                ? 'bg-[var(--brand)] text-white'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4 mb-0.5 shrink-0" />
            ) : (
              <Menu className="w-4 h-4 mb-0.5 shrink-0" />
            )}
            <span className="truncate max-w-full text-center leading-tight">Menú (10)</span>
          </button>
        </div>
      </nav>


      <ModalsContainer
        isCommandOpen={isCommandOpen}
        setIsCommandOpen={setIsCommandOpen}
        commandQuery={commandQuery}
        setCommandQuery={setCommandQuery}
        commandIdx={commandIdx}
        setCommandIdx={setCommandIdx}
        filteredCommands={filteredCommands}
        executeCommand={executeCommand}
        isSiteLangModalOpen={isSiteLangModalOpen}
        setIsSiteLangModalOpen={setIsSiteLangModalOpen}
        siteLangSearch={siteLangSearch}
        setSiteLangSearch={setSiteLangSearch}
        siteLang={siteLang}
        setSiteLang={setSiteLang}
        filteredSiteLanguages={filteredSiteLanguages}
        addToast={addToast}
        isSupportOpen={isSupportOpen}
        setIsSupportOpen={setIsSupportOpen}
        donationAmount={donationAmount}
        setDonationAmount={setDonationAmount}
        validDonation={validDonation}
        paypalHref={paypalHref}
        legalModalTab={legalModalTab}
        setLegalModalTab={setLegalModalTab}
        isHistoryOpen={isHistoryOpen}
        setIsHistoryOpen={setIsHistoryOpen}
        history={history}
        togglePinHistory={togglePinHistory}
        deleteHistoryItem={deleteHistoryItem}
        clearAllHistory={clearAllHistory}
        copyText={copyText}
        openSocialCardModal={openSocialCardModal}
        isExportModalOpen={isExportModalOpen}
        setIsExportModalOpen={setIsExportModalOpen}
        exportModalData={{ title: exportDocTitle, content: exportDocContent }}
        downloadTxt={downloadTxt}
        qrModal={qrModal}
        setQrModal={setQrModal}
        socialCardModal={socialCardModal}
        setSocialCardModal={setSocialCardModal}
        isInstallModalOpen={isInstallModalOpen}
        setIsInstallModalOpen={setIsInstallModalOpen}
        promptInstallPWA={handleInstallApp}
      />
    </div>
  );
}

