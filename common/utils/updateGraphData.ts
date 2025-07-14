import { HighchartsOptionsType } from '@highcharts/react';
import { UpdateSeriesProps } from '../types/propTypes';

export function updateGraphSeries({ data, setChartOptions, setLoading }: UpdateSeriesProps) {
  if (!data) {
    return;
  }

  const newOptions: HighchartsOptionsType = {
    xAxis: { categories: data.headers },
    series: data.data.map((avdelingsData) => {
      return {
        type: 'column',
        data: avdelingsData.verdier,
        name: `${avdelingsData.avdeling} - ${avdelingsData.innsatsgruppe}`,
      };
    }),
  };

  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    ...newOptions,
  }));
  setLoading(false);
}
