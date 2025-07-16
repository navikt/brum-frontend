import { HighchartsOptionsType } from '@highcharts/react';
import { UpdateSeriesProps } from '../types/propTypes';

export function updateGraphSeries({
  chartData,
  setChartOptions,
  setLoading,
  filterApplied,
}: UpdateSeriesProps) {
  if (!chartData) {
    return;
  }
  const newOptions = filterApplied
    ? {
        xAxis: { categories: chartData.headers },
        series: chartData.data.map((avdelingsData) => {
          return {
            type: 'column' as const,
            data: avdelingsData.verdier,
            name: `${avdelingsData.avdeling} - ${avdelingsData.innsatsgruppe}`,
          };
        }),
      }
    : {
        xAxis: { categories: chartData.headers },
        series: chartData.dataAvdeling.map((d) => {
          return {
            type: 'column' as const,
            data: d.verdier.map((v) => (v === 0 ? null : v)),
            name: d.avdeling,
            drilldown: d.avdeling,
            centerInCategory: true,
          };
        }),
        drilldown: {
          series: chartData.data.map((d) => {
            return {
              type: 'column' as const,
              id: d.avdeling,
              data: d.verdier,
              name: d.innsatsgruppe,
            };
          }),
        },
      };

  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    ...newOptions,
  }));
  setLoading(false);
}
