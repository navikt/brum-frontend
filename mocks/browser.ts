import { setupWorker } from 'msw/browser';

/**
 * MSW Worker for nettleser
 *
 * Setter opp Mock Service Worker for å simulere API-kall i utviklingsmiljø.
 */
export const worker = setupWorker();
