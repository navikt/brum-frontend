/**
 * Hoved-datastruktur for Brum-data
 */
export default interface BrumData {
  aar: number;
  uke: number;
  headers: string[];
  data: {
    avdeling: string;
    innsatsgruppe: string;
    verdier: number[];
  }[];
  dataAvdeling: {
    avdeling: string;
    verdier: number[];
  }[];
}
