import { Dispatch, RefObject, SetStateAction } from 'react';

export interface chartOptionType {
  title: { text: string };
  chart: { type: string; inverted: boolean };
  plotOptions: { series: { stacking: 'normal' | 'percent' | undefined } };
}

export interface MenuProps {
  chartOptions: chartOptionType;
  setChartOptions: Dispatch<SetStateAction<any>>;
  ref: RefObject<null>;
}

export interface GraphProps {
  filnavn: string;
}
