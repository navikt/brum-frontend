import { HighchartsOptionsType } from '@highcharts/react';
import { UpdateSeriesProps } from '../types/propTypes';

export function updateGraphSeries({ data, setChartOptions, setLoading }: UpdateSeriesProps) {
  if (!data) {
    return;
  }

  const newOptions: HighchartsOptionsType = {
    xAxis: { categories: data.headers },
    series: data.dataAvdeling.map((data) => {
      return {
        type: 'column',
        data: data.verdier,
        name: data.avdeling,
      };
    }),
  };

  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    ...newOptions,
  }));
  setLoading(false);
}
