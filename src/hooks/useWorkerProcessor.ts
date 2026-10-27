// src/hooks/useWorkerProcessor.ts
import { useEffect, useRef, useState, useCallback } from 'react';

export function useWorkerProcessor() {
  const workerRef = useRef<Worker | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/processor.worker.ts', import.meta.url));
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const processTask = useCallback((type: string, payload: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        reject('Worker not initialized');
        return;
      }

      setLoading(true);
      const id = Math.random().toString(36).substring(7);

      const handler = (event: MessageEvent) => {
        if (event.data.id === id) {
          workerRef.current?.removeEventListener('message', handler);
          setLoading(false);
          if (event.data.type === 'RESULT') {
            resolve(event.data.payload);
          } else {
            reject(event.data.payload);
          }
        }
      };

      workerRef.current.addEventListener('message', handler);
      workerRef.current.postMessage({ type, payload, id });
    });
  }, []);

  return { processTask, loading };
}
