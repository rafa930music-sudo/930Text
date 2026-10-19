import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] text-stone-900 p-6 font-sans">
          <div className="max-w-md w-full bg-white border border-stone-200 rounded-2xl p-6 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-amber-600 text-white font-extrabold text-base flex items-center justify-center mx-auto tracking-tight">
              930
            </div>
            <h1 className="text-lg font-bold">Actualización de caché detectada</h1>
            <p className="text-sm text-stone-600">
              Se ha publicado una nueva versión de 930Text. Pulsa el botón para recargar los archivos más recientes.
            </p>
            <button
              onClick={() => {
                if (typeof window !== 'undefined' && 'caches' in window && window.caches) {
                  window.caches.keys().then(keys => Promise.all(keys.map(k => window.caches.delete(k)))).finally(() => window.location.reload());
                } else {
                  window.location.reload();
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-amber-600 transition-colors cursor-pointer"
            >
              Recargar 930Text
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <RootErrorBoundary>
    <App />
  </RootErrorBoundary>
);

