import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, SetStateAction } from 'react';
import { BrumData } from './brumData';

/**
 * Props for komponenter som håndterer chart-opsjoner
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
  chartOptions: HighchartsOptionsType;
  setChartOptions: Dispatch<SetStateAction<HighchartsOptionsType>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  ref: any;
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
export interface ChartProps {
  data: BrumData | null;
}

/**
 * Props for useFetchData hook
 */
export interface useFetchDataProps {
  setData: Dispatch<SetStateAction<BrumData | null>>;
  dataParams: DataOptionsProps;
}