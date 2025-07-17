import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, RefObject, SetStateAction } from 'react';
import { BrumData } from './brumData';

/**
 * Props for komponenter som håndterer innstillinger for grafen
 */
export interface ChartOptionsProps {
  chartOptions: HighchartsOptionsType;
  setChartOptions: Dispatch<SetStateAction<HighchartsOptionsType>>;
}

/**
 * Props for oppdatering av chart-serier
 */
export interface UpdateSeriesProps {
  data: BrumData | null;
  setChartOptions: Dispatch<SetStateAction<HighchartsOptionsType>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  filterApplied: boolean;
}

/**
 * Parametere for datahenting
 */
export interface DataOptionsProps {
  aar: number;
  uke: number;
}

/**
 * Props for oppdatering av data-parametere
 */
export interface UpdateDataOptionsProps {
  dataParams: DataOptionsProps;
  setDataParams: Dispatch<SetStateAction<DataOptionsProps>>;
}

/**
 * Props for Chart-komponent
 */
export interface ChartProps extends ChartOptionsProps {
  data: BrumData | null;
  filterApplied: boolean;
  filteredData: BrumData;
}

export interface BrumTableProps {
  data: BrumData;
  filteredData: BrumData;
  filterTabRef: RefObject<any>;
}

/**
 * Props for useFetchData hook
 */
export interface useFetchDataProps {
  setData: Dispatch<SetStateAction<BrumData | null>>;
  dataParams: DataOptionsProps;
}
