import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, SetStateAction } from 'react';

export interface ChartOptionsProps {
  chartOptions: HighchartsOptionsType;
  setChartOptions: Dispatch<SetStateAction<HighchartsOptionsType>>;
}
export interface StackingRadioProps extends ChartOptionsProps {
  percentMode: boolean;
}

export interface PercentModeProps extends ChartOptionsProps {
  percentMode: boolean;
  setPercentMode: Dispatch<SetStateAction<boolean>>;
}

export interface UpdateSeriesProps {
  data: string;
  chartOptions: HighchartsOptionsType;
  setChartOptions: Dispatch<SetStateAction<HighchartsOptionsType>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  ref: any;
}

export interface DataOptionsProps {
  dataSet: string;
}

export interface UpdateDataOptionsProps {
  dataParams: DataOptionsProps;
  setDataParams: Dispatch<SetStateAction<DataOptionsProps>>;
}

export interface ChartProps {
  data: string;
}
