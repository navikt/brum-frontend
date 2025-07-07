import { Dispatch, SetStateAction, useEffect } from 'react';
import { HighchartsOptionsType } from '@highcharts/react';
import { DataOptionsProps, UpdateSeriesProps } from '../types/propTypes';

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
  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    series: [
      {
        type: 'column',
        data: data.map((d: Object) => Object.values(d)),
      },
    ],
  }));
  data && data.length ? setLoading(false) : setLoading(true);
}
