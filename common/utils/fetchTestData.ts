import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DataOptionsProps, UpdateSeriesProps } from '../types/propTypes';
import { SeriesColumnOptions } from 'highcharts';

export function useFetchTestData(
  setData: Dispatch<SetStateAction<Object[]>>,
  dataParams: DataOptionsProps,
) {
  useEffect(() => {
    fetch(`/api/data?datasetnr=${dataParams.dataSet}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, [setData, dataParams]);
}

export function updateGraphSeries({ data, setChartOptions, setLoading, ref }: UpdateSeriesProps) {
  if (!data || data.length === 0) {
    return;
  }

  const newOptions: HighchartsOptionsType = {
    series: data.map((d: Object) => ({
      type: 'column',
      data: Object.values(d).slice(1),
      name: String(Object.values(d)[0]),
    })),
    xAxis: [{ categories: Object.keys(data[0]).slice(1) }],
  };

  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    ...newOptions,
  }));

  // explicitly updating the chart, because otherwise old series are left over when # old series > # new series
  if (ref.current?.chart) {
    ref.current.chart.update(
      { ...ref.current.chart.options, ...newOptions },
      true,
      true, // oneToOne: ensures old series are removed from the graph
    );
  }

  setLoading(false);
}
