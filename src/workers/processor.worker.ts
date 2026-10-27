// src/workers/processor.worker.ts

import { 
  convertTextFormat, 
  summarizeTextDetailed, 
  improveText, 
  cleanTextAdvanced, 
  analyzeText 
} from '../utils/textTools';

self.onmessage = async (event: MessageEvent) => {
  const { type, payload, id } = event.data;

  try {
    let result;
    switch (type) {
      case 'CONVERT':
        result = convertTextFormat(payload.text, payload.mode);
        break;
      case 'SUMMARIZE':
        result = summarizeTextDetailed(payload.text, payload.format);
        break;
      case 'IMPROVE':
        result = improveText(payload.text, payload.level);
        break;
      case 'CLEAN':
        result = cleanTextAdvanced(payload.text, payload.options || { mode: 'balanced' });
        break;
      case 'ANALYZE':
        result = analyzeText(payload.text);
        break;
      case 'PING':
        self.postMessage({ type: 'PONG', id, payload: 'Worker is ready' });
        return;
      default:
        throw new Error(`Unknown task type: ${type}`);
    }
    self.postMessage({ type: 'RESULT', id, payload: result });
  } catch (error) {
    self.postMessage({ type: 'ERROR', id, payload: (error as Error).message });
  }
};
