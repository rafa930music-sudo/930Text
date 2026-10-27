import React, { useState, useEffect, useRef } from 'react';
import {
  Download,
  Smartphone,
  Monitor,
  Laptop,
  Check,
  ChevronDown,
  ChevronUp,
  Share2,
  ArrowRight,
  Globe,
  Sparkles,
  Info
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export type DevicePlatform = 'android' | 'ios' | 'windows' | 'mac' | 'all';

/**
 * Detailed installation instructions and metadata for each platform.
 */
export interface PlatformGuide {
  id: DevicePlatform;
  label: string;
  shortLabel: string;
  badge: string;
  iconName: 'smartphone' | 'apple' | 'monitor' | 'laptop' | 'globe';
  summary: string;
  steps: string[];
  tips?: string;
}

export const PLATFORM_GUIDES: Record<Exclude<DevicePlatform, 'all'>, PlatformGuide> = {
  android: {
    id: 'android',
    label: 'Android (Móvil y Tablet)',
    shortLabel: 'Android',
    badge: 'Chrome · Samsung · Edge · Firefox',
    iconName: 'smartphone',
    summary: 'Instálala directamente con 1 clic o desde el menú de tu navegador:',
    steps: [
      'Pulsa el botón "Instalar aplicación" (si aparece en pantalla).',
      'Si usas Samsung Internet, Firefox u otro navegador, pulsa el menú de tres puntos (⋮) o el icono de menú.',
      'Selecciona "Instalar aplicación" o "Añadir a pantalla de inicio" para tener 930Text junto a tus apps.'
    ],
    tips: 'Funciona exactamente como una app nativa, a pantalla completa y sin consumir memoria de almacenamiento adicional.'
  },
  ios: {
    id: 'ios',
    label: 'iPhone & iPad (iOS)',
    shortLabel: 'iPhone / iPad',
    badge: 'Safari · Chrome iOS',
    iconName: 'apple',
    summary: 'Añade 930Text a tu pantalla de inicio en 3 toques:',
    steps: [
      'Abre esta web en Safari (o tu navegador habitual en iPhone/iPad).',
      'Toca el botón Compartir en la barra de navegación (icono cuadrado con flecha hacia arriba).',
      'Desliza hacia abajo en la lista y selecciona "Añadir a pantalla de inicio" (Add to Home Screen).',
      'Confirma pulsando "Añadir" en la esquina superior derecha.'
    ],
    tips: 'Se abrirá en modo aplicación sin las barras de Safari, con acceso a las 10 suites sin conexión.'
  },
  windows: {
    id: 'windows',
    label: 'Windows PC & Portátil',
    shortLabel: 'Windows PC',
    badge: 'Chrome · Edge · Brave',
    iconName: 'monitor',
    summary: 'Instálala como aplicación de escritorio en tu PC:',
    steps: [
      'En Google Chrome o Microsoft Edge, pulsa el botón "Instalar aplicación" o el icono (⊕ / pantalla) en la barra de direcciones.',
      'Pulsa "Instalar" en la ventana emergente de confirmación.',
      '930Text se integrará en tu Menú Inicio, barra de tareas y escritorio como ventana de alta velocidad independiente.'
    ],
    tips: 'Se ejecuta en su propia ventana aislada con atajos de teclado rápidos (⌘K / Ctrl+K).'
  },
  mac: {
    id: 'mac',
    label: 'Mac (macOS)',
    shortLabel: 'Mac / macOS',
    badge: 'Safari Sonoma · Chrome · Edge',
    iconName: 'laptop',
    summary: 'Añádela a tu Dock de macOS o instálala con Chrome:',
    steps: [
      'En Safari (macOS Sonoma o posterior): Menú superior "Archivo" → "Añadir al Dock".',
      'En Google Chrome / Edge para Mac: Pulsa el icono de instalación en la barra de direcciones o Menú (⋮) → "Guardar y compartir" → "Instalar 930Text".',
      'Ábrela directamente desde tu Dock, Launchpad o Spotlight.'
    ],
    tips: 'Admite modo oscuro automático y procesamiento 100% privado en memoria local.'
  }
};

/**
 * Centralized copy configuration for the multi-device discovery section.
 */
export const PWA_DISCOVERY_COPY = {
  headline: '¿Te gusta 930Text? Llévalo en cualquiera de tus dispositivos',
  description:
    'Instala 930Text en tu móvil, tablet o PC. Funciona en Android, iPhone, iPad, Windows y Mac con acceso instantáneo, pantalla completa y suites operativas fuera de línea.',
  benefits: [
    'Compatible con cualquier móvil, tablet y PC',
    'Modo sin conexión a internet',
    '100% privado en tu navegador',
    'Cero coste · Sin registro ni descarga de GB'
  ],
  ctaInstall: 'Instalar aplicación',
  ctaIos: 'Añadir a pantalla de inicio',
  ctaInstalled: 'Aplicación ya instalada',
  secondaryLinkText: 'Ver funciones de la app',
  secondaryLinkHref: '#centro'
};

function detectUserDevice(): Exclude<DevicePlatform, 'all'> {
  if (typeof window === 'undefined') return 'android';
  const ua = window.navigator.userAgent.toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/macintosh|mac os x/.test(ua) && !('ontouchend' in document)) return 'mac';
  if (/windows|win32|win64/.test(ua)) return 'windows';
  return 'android';
}

/**
 * Lightweight analytics event dispatcher.
 */
export function trackPWAAnalytics(
  eventName:
    | 'pwa_section_viewed'
    | 'pwa_primary_cta_clicked'
    | 'pwa_secondary_link_clicked'
    | 'pwa_prompt_accepted'
    | 'pwa_prompt_dismissed'
    | 'pwa_device_tab_changed'
    | 'pwa_instructions_toggled',
  payload?: Record<string, unknown>
) {
  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    ...payload
  };

  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new CustomEvent('pwa_analytics', { detail: eventData }));
    } catch {
      // ignore
    }

    const win = window as unknown as { dataLayer?: Array<Record<string, unknown>>; gtag?: (...args: unknown[]) => void };
    if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push(eventData);
    }
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, payload || {});
    }
  }
}

export interface PWADiscoverySectionProps {
  onSeeFeatures?: () => void;
  className?: string;
  customCopy?: Partial<typeof PWA_DISCOVERY_COPY>;
}

export const PWADiscoverySection: React.FC<PWADiscoverySectionProps> = ({
  onSeeFeatures,
  className = '',
  customCopy
}) => {
  const copy = { ...PWA_DISCOVERY_COPY, ...customCopy };
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  const [detectedPlatform, setDetectedPlatform] = useState<Exclude<DevicePlatform, 'all'>>('android');
  const [selectedPlatform, setSelectedPlatform] = useState<Exclude<DevicePlatform, 'all'>>('android');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasTrackedViewRef = useRef(false);

  useEffect(() => {
    const detected = detectUserDevice();
    setDetectedPlatform(detected);
    setSelectedPlatform(detected);
    // Auto-open guide for iOS since iOS Safari lacks automatic prompt event
    if (detected === 'ios') {
      setIsGuideOpen(true);
    }
  }, []);

  // Track "Section viewed" analytics event once when visible in viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !hasTrackedViewRef.current) {
          hasTrackedViewRef.current = true;
          trackPWAAnalytics('pwa_section_viewed', {
            isInstallable,
            isInstalled,
            detectedPlatform
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isInstallable, isInstalled, detectedPlatform]);

  const handlePrimaryClick = async () => {
    trackPWAAnalytics('pwa_primary_cta_clicked', {
      isInstallable,
      isInstalled,
      selectedPlatform
    });

    if (isInstalled) {
      return;
    }

    if (isInstallable) {
      const outcome = await install();
      if (outcome === 'accepted') {
        trackPWAAnalytics('pwa_prompt_accepted');
      } else if (outcome === 'dismissed') {
        trackPWAAnalytics('pwa_prompt_dismissed');
      }
      return;
    }

    // Toggle device instructions
    const nextState = !isGuideOpen;
    setIsGuideOpen(nextState);
    trackPWAAnalytics('pwa_instructions_toggled', { platform: selectedPlatform, open: nextState });
  };

  const handleSecondaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackPWAAnalytics('pwa_secondary_link_clicked');
    if (onSeeFeatures) {
      e.preventDefault();
      onSeeFeatures();
    }
  };

  const currentGuide = PLATFORM_GUIDES[selectedPlatform];

  const getDeviceIcon = (platform: Exclude<DevicePlatform, 'all'>) => {
    switch (platform) {
      case 'android':
        return <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'ios':
        return <Smartphone className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'windows':
        return <Monitor className="w-4 h-4 shrink-0" aria-hidden="true" />;
      case 'mac':
        return <Laptop className="w-4 h-4 shrink-0" aria-hidden="true" />;
      default:
        return <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="app-discovery"
      aria-labelledby="pwa-discovery-heading"
      className={`w-full border-t border-[var(--line)] bg-[var(--surface2)]/60 text-[var(--text)] relative z-10 transition-colors duration-200 pb-28 lg:pb-12 pt-8 sm:pt-10 ${className}`}
    >
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 rounded-[24px] sm:rounded-[28px] border border-[var(--line)] bg-[var(--surface)] shadow-sm hover:border-[var(--brand2)]/40 transition-colors space-y-6">
          {/* Header Row: Title, Description, and Action Buttons */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left Column */}
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B5CF6] via-[#6366F1] to-[#38E8FF] grid place-items-center text-white shadow-md shrink-0">
                  <Smartphone className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h2
                    id="pwa-discovery-heading"
                    className="font-display text-lg sm:text-xl font-black text-[var(--text)] tracking-tight leading-snug"
                  >
                    {copy.headline}
                  </h2>
                  <span className="text-[11px] font-bold text-[var(--brand2)] block">
                    App Web Progresiva Universal · Móvil, Tablet y Ordenador
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
                {copy.description}
              </p>

              {/* Zero-Pill Typography Metadata per Frontend Design Constitution */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-[var(--muted)] pt-1">
                {copy.benefits.map((benefit, index) => (
                  <React.Fragment key={benefit}>
                    {index > 0 && <span aria-hidden="true" className="text-[var(--line)]">·</span>}
                    <span>{benefit}</span>
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Right Column: Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 shrink-0">
              {/* Primary CTA */}
              {isInstalled ? (
                <div
                  role="status"
                  aria-label="La aplicación ya está instalada"
                  className="min-h-[44px] px-5 py-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface2)] text-xs font-bold text-[var(--muted)] inline-flex items-center justify-center gap-2 select-none"
                >
                  <Check className="w-4 h-4 text-emerald-500" aria-hidden="true" />
                  <span>{copy.ctaInstalled}</span>
                </div>
              ) : isInstallable ? (
                <button
                  type="button"
                  onClick={handlePrimaryClick}
                  className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[var(--brand)] via-[var(--brand2)] to-[#38E8FF] text-white text-xs sm:text-sm font-extrabold shadow-md hover:brightness-110 active:scale-[0.99] transition inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
                >
                  <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>{copy.ctaInstall}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePrimaryClick}
                  aria-expanded={isGuideOpen}
                  aria-controls="pwa-platform-guide"
                  className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-white text-xs sm:text-sm font-extrabold shadow-md hover:brightness-110 active:scale-[0.99] transition inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
                >
                  {selectedPlatform === 'ios' ? (
                    <Share2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>
                    {selectedPlatform === 'ios' ? copy.ctaIos : `Instalar en ${currentGuide.shortLabel}`}
                  </span>
                  {isGuideOpen ? (
                    <ChevronUp className="w-3.5 h-3.5 ml-0.5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 ml-0.5" aria-hidden="true" />
                  )}
                </button>
              )}

              {/* Secondary Link */}
              <a
                href={copy.secondaryLinkHref}
                onClick={handleSecondaryClick}
                className="min-h-[38px] px-4 py-1.5 rounded-xl text-xs font-extrabold text-[var(--muted)] hover:text-[var(--text)] transition inline-flex items-center justify-center gap-1.5 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand2)]"
              >
                <span>{copy.secondaryLinkText}</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Interactive Multi-Device Platform Bar */}
          <div className="pt-4 border-t border-[var(--line)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <span className="text-xs font-extrabold text-[var(--muted)] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" aria-hidden="true" />
                Elige tu dispositivo para ver las instrucciones exactas:
              </span>
              {detectedPlatform && (
                <span className="text-[11px] font-bold text-[var(--brand2)]">
                  Tu dispositivo detectado: <strong>{PLATFORM_GUIDES[detectedPlatform].shortLabel}</strong>
                </span>
              )}
            </div>

            {/* Platform Selector Buttons (Accessible Segmented Controls) */}
            <div
              role="tablist"
              aria-label="Plataformas compatibles"
              className="grid grid-cols-2 sm:grid-cols-4 gap-2"
            >
              {(['android', 'ios', 'windows', 'mac'] as const).map(platform => {
                const guide = PLATFORM_GUIDES[platform];
                const isSelected = selectedPlatform === platform;
                const isDetected = detectedPlatform === platform;

                return (
                  <button
                    key={platform}
                    type="button"
                    role="tab"
                    id={`tab-${platform}`}
                    aria-selected={isSelected}
                    aria-controls={`panel-${platform}`}
                    onClick={() => {
                      setSelectedPlatform(platform);
                      setIsGuideOpen(true);
                      trackPWAAnalytics('pwa_device_tab_changed', { platform });
                    }}
                    className={`p-3 rounded-2xl border text-left transition flex items-center justify-between gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)] ${
                      isSelected
                        ? 'border-[var(--brand2)] bg-[var(--brand-soft)] text-[var(--text)] shadow-xs ring-1 ring-[var(--brand2)]/50'
                        : 'border-[var(--line)] bg-[var(--surface2)]/70 text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--line)]/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-xl grid place-items-center shrink-0 ${
                          isSelected
                            ? 'bg-[var(--brand)] text-white shadow-xs'
                            : 'bg-[var(--surface)] text-[var(--muted)]'
                        }`}
                      >
                        {getDeviceIcon(platform)}
                      </div>
                      <div className="min-w-0">
                        <strong className="block text-xs font-black truncate">{guide.shortLabel}</strong>
                        <span className="text-[10px] text-[var(--muted)] block truncate">{guide.badge}</span>
                      </div>
                    </div>

                    {isDetected && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[var(--brand2)]/15 text-[var(--brand2)] shrink-0 hidden sm:inline">
                        Actual
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Guide Details Accordion Panel for Selected Device */}
          {isGuideOpen && (
            <div
              id="pwa-platform-guide"
              role="region"
              aria-labelledby={`tab-${selectedPlatform}`}
              className="pt-5 border-t border-[var(--line)] bg-[var(--surface2)]/60 p-4 sm:p-6 rounded-2xl space-y-4 animate-in fade-in duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[var(--line)]/60">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--brand)] text-white grid place-items-center shrink-0">
                    {getDeviceIcon(selectedPlatform)}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[var(--text)]">
                      {currentGuide.label}
                    </h3>
                    <span className="text-[11px] text-[var(--muted)]">{currentGuide.summary}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsGuideOpen(false)}
                  className="text-xs text-[var(--muted)] hover:text-[var(--text)] underline font-bold self-start sm:self-center"
                >
                  Ocultar pasos
                </button>
              </div>

              {/* Numbered Step-by-Step Instructions */}
              <ol className="space-y-2.5 text-xs text-[var(--muted)] list-none pl-0">
                {currentGuide.steps.map((step, idx) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--brand2)] text-white font-black grid place-items-center text-[10px] shrink-0 mt-0.5 shadow-xs">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed text-[var(--text)] font-medium">{step}</span>
                  </li>
                ))}
              </ol>

              {/* Pro Tip */}
              {currentGuide.tips && (
                <div className="pt-2 text-[11px] text-[var(--muted)] flex items-start gap-2 border-t border-[var(--line)]/60">
                  <Info className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong className="text-[var(--text)]">Ventaja:</strong> {currentGuide.tips}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
