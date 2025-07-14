import { HighchartsOptionsType } from '@highcharts/react';
import { UpdateSeriesProps } from '../types/propTypes';

export function updateGraphSeries({ data, setChartOptions, setLoading }: UpdateSeriesProps) {
  if (!data) {
    return;
  }

  const newOptions: HighchartsOptionsType = {
    xAxis: {categories: data.headers},
    data: {
      rows: data.data.map((avdelingData) => 
        avdelingData.verdier),
      firstRowAsNames: false,
      switchRowsAndColumns: true, //rows are series
      beforeParse: (d) => {
        console.log('HIGHCHARTS - unparsed data\n', d);
        return d;
      },
      complete: (d) => {
        console.log('HIGHCHARTS - parsed data\n', d);
        return d;
      },
    },
  };

  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    ...newOptions,
  }));
  setLoading(false);
}
