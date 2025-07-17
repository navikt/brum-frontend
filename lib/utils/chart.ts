import { HighchartsOptionsType } from '@highcharts/react';
import { UpdateSeriesProps } from '../types/propTypes';

/**
 * Oppdaterer chart-serier med ny data
 *
 * @param data - Data som skal vises i chart
 * @param setChartOptions - Setter for chart-opsjoner
 * @param setLoading - Setter for loading-state
 */
export function updateGraphSeries({
  data,
  setChartOptions,
  setLoading,
  filterApplied,
}: UpdateSeriesProps) {
  if (!data) {
    return;
  }
  const newOptions = filterApplied
    ? {
        xAxis: { categories: data.headers },
        series: data.data.map((avdelingsData) => {
          return {
            type: 'column' as const,
            data: avdelingsData.verdier,
            name: `${avdelingsData.avdeling} - ${avdelingsData.innsatsgruppe}`,
          };
        }),
      }
    : {
        xAxis: { categories: data.headers },
        series: data.dataAvdeling.map((d) => {
          return {
            type: 'column' as const,
            data: d.verdier.map((v) => (v === 0 ? null : v)),
            name: d.avdeling,
            drilldown: d.avdeling,
            centerInCategory: true,
          };
        }),
        drilldown: {
          series: data.data.map((d) => {
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
