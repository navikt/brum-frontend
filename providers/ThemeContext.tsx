import { createContext, useContext } from 'react';
import { ThemeType, ThemeContextType } from '../lib/types/theme';

/**
 * React Context for tema-håndtering
 */
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Hook for å bruke tema-kontekst
 * 
 * @returns Tema-kontekst med gjeldende tema og setter-funksjon
 * @throws Error hvis brukt utenfor ThemeProvider
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme må brukes innenfor en ThemeProvider');
  return ctx;
}