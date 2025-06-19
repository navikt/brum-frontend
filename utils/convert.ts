import { parse } from 'csv-parse/sync';
import type { MonthDataItem } from '../types/MonthData';

export const convertCsvToHighchartsData = (csv: string): MonthDataItem[] => {
  const rows = parse(csv, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ';',
  });

  return rows.map((row: any) => ({
    month: row.month,
    Avdeling: row.Avdeling,
    AntallPaTiltak: Number(row.AntallPaTiltak),
    TiltaksType: row.TiltaksType,
    instasBehov: row.instasBehov === '' ? null : row.instasBehov,
  }));
};
