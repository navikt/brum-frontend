import { getWeek, getISOWeeksInYear, getISOWeek } from 'date-fns';

// Henter uker for et gitt år
// Returnerer en liste med uker fra 1 til antall uker i åre
export function getWeeksForYear(year: number): number[] {
  const today = new Date();
  const currentYear = today.getFullYear();

  // const maxWeek =
  //   year === currentYear ? getISOWeek(today) : getISOWeeksInYear(new Date(year, 0, 1));
    const maxWeek =
    year === currentYear ? 27 : getISOWeeksInYear(new Date(year, 0, 1));

  return Array.from({ length: maxWeek }, (_, i) => i + 1);
}
