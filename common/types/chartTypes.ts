import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, SetStateAction } from 'react';

export interface chartOptionType {
  title: { text: string };
  chart: { type: string; inverted: boolean };
  series: any;
  plotOptions: { series: { stacking: 'normal' | 'percent' | undefined } };
}

export interface MenuProps {
  chartOptions: HighchartsOptionsType;
  setChartOptions: Dispatch<SetStateAction<HighchartsOptionsType>>;
}

export interface GraphProps {
  filnavn: string;
}
