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

export function updateGraphSeries({ data, setChartOptions, setLoading }: UpdateSeriesProps) {
  // mapping to a variable so no old series are kept over (can happen if you do it within the spread)
  var newSeries: SeriesColumnOptions[] = data.map((d: Object) => ({
    type: 'column',
    data: Object.values(d),
  }));
  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    series: newSeries,
  }));
  data && data.length ? setLoading(false) : setLoading(true);
}
