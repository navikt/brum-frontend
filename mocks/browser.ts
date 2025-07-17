import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * MSW Worker for nettleser
 * 
 * Setter opp Mock Service Worker for å simulere API-kall i utviklingsmiljø.
 */
export const worker = setupWorker(...handlers);