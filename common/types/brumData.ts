export interface BrumData {
  aar: number;
  uke: number;
  headers: string[];
  data: {
    avdeling: string;
    innsatsgruppe: string;
    verdier: number[];
  }[];
}
export interface BrumTestData {
  column_types: ('string' | 'number')[];

  rows: (string | number)[][];
}
