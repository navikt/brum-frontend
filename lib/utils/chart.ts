import { HighchartsOptionsType } from '@highcharts/react';
import { UpdateSeriesProps } from '../types/propTypes';

/**
 * Oppdaterer chart-serier med ny data
 * 
 * @param data - Data som skal vises i chart
 * @param setChartOptions - Setter for chart-opsjoner
 * @param setLoading - Setter for loading-state
 */
export function updateGraphSeries({ data, setChartOptions, setLoading }: UpdateSeriesProps) {
  if (!data) {
    return;
  }

  const newOptions: HighchartsOptionsType = {
    xAxis: { categories: data.headers },
    series: data.dataAvdeling.map((data) => {
      return {
        type: 'column',
        data: data.verdier.map((v) => (v === 0 ? null : v)),
        name: data.avdeling,
        drilldown: data.avdeling,
        centerInCategory: true,
      };
    }),
    drilldown: {
      series: data.data.map((d) => {
        return {
          type: 'column',
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
    xAxis: {
      ...(prev.xAxis || {}),
      ...newOptions.xAxis,
    },
  }));
  setLoading(false);
}