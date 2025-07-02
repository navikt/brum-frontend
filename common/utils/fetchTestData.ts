import { Dispatch, SetStateAction, useEffect } from 'react';
import { HighchartsOptionsType } from '@highcharts/react';
import { UpdateSeriesProps } from '../types/propTypes';

export function useFetchTestData(setData: Dispatch<SetStateAction<Object[]>>) {
  useEffect(() => {
    fetch(`${process.env.BRUM_API_URL}/testData`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch(console.error);
  }, [setData]);
}

export function updateGraphSeries({ data, setChartOptions, setLoading }: UpdateSeriesProps) {
  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    series: data.map((d: Object) => ({
      type: 'column',
      data: Object.values(d),
    })),
  }));
  data && data.length ? setLoading(false) : setLoading(true);
}
