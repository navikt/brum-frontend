import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, SetStateAction } from 'react';
import { BrumData } from './brumData';

export interface ChartOptionsProps {
  chartOptions: HighchartsOptionsType;
  setChartOptions: Dispatch<SetStateAction<HighchartsOptionsType>>;
}

export interface UpdateSeriesProps {
  chartData: BrumData | null;
  setChartOptions: Dispatch<SetStateAction<HighchartsOptionsType>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  filterApplied: boolean;
}

export interface DataOptionsProps {
  aar: number;
  uke: number;
}

export interface UpdateDataOptionsProps {
  dataParams: DataOptionsProps;
  setDataParams: Dispatch<SetStateAction<DataOptionsProps>>;
}

export interface ChartProps {
  data: BrumData | null;
  filterApplied: boolean;
  filteredData: BrumData;
}

export interface BrumTableProps {
  data: BrumData;
  filteredData: BrumData;
}
export interface useFetchDataProps {
  setData: Dispatch<SetStateAction<BrumData | null>>;
  dataParams: DataOptionsProps;
}
