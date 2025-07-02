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
  data: Object[];
  setChartOptions: Dispatch<SetStateAction<HighchartsOptionsType>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
