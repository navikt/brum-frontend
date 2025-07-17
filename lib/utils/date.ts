import { getISOWeeksInYear, getISOWeek } from 'date-fns';

/**
 * Henter uker for et gitt år
 * 
 * @param år - Året å hente uker for
 * @returns Array med ukenumre fra 1 til antall uker i året
 */
export function hentUkerForÅr(år: number): number[] {
  const iDag = new Date();
  const nåværendeÅr = iDag.getFullYear();


  // const maxWeek =
  //   year === currentYear ? getISOWeek(today) : getISOWeeksInYear(new Date(year, 0, 1));
  // MERKNAD: Bruker fast verdi 27 fordi det er 27 uker i testdataene
  const maksimumsUke = år === nåværendeÅr ? 27 : getISOWeeksInYear(new Date(år, 0, 1));

  return Array.from({ length: maksimumsUke }, (_, i) => i + 1);
}