/**
 * Tema-typer som støttes av applikasjonen
 */
export type ThemeType = 'light' | 'dark';

/**
 * Type-definisjon for tema-kontekst
 */
export type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};
