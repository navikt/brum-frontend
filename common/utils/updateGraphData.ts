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
        drilldown: data.avdeling,
        centerInCategory: true,
      };
    }),
    drilldown: {
      series: data.data.map((d) => {
        return { type: 'column', id: d.avdeling, data: d.verdier, name: d.innsatsgruppe };
      }),
    },
  };

  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    ...newOptions,
  }));
  setLoading(false);
}
