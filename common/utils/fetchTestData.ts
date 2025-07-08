import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DataOptionsProps, UpdateSeriesProps } from '../types/propTypes';
import { SeriesColumnOptions } from 'highcharts';

export function useFetchTestData(
  setData: Dispatch<SetStateAction<Object[]>>,
  dataParams: DataOptionsProps,
) {
  useEffect(() => {
    fetch(`/api/data?datasetnr=${dataParams.testDataSet}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, [setData, dataParams]);
}

export function updateGraphSeries({
  data,
  chartOptions,
  setChartOptions,
  setLoading,
  ref,
}: UpdateSeriesProps) {
  if (!data || data.length === 0) {
    return;
  }

  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    series: data.map((d: Object) => ({
      type: 'column',
      data: Object.values(d).slice(1),
      name: String(Object.values(d)[0]),
    })),
    xAxis: [{ categories: Object.keys(data[0]).slice(1) }],
  }));

  // explictly updating options of the chart, so series update correctly
  if (ref.current?.chart) {
    ref.current.chart.update(chartOptions, true, true); // (options,redraw,oneToOne). oneToOne=true ensures old series don't stay in the chart when # old series > # new series
  }

  setLoading(false);
}
