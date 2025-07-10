import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DataOptionsProps, UpdateSeriesProps } from '../types/propTypes';

export function useFetchTestData(
  setData: Dispatch<SetStateAction<string>>,
  dataParams: DataOptionsProps,
) {
  useEffect(() => {
    fetch(`/api/data?dataset=${dataParams.dataSet}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.text();
      })
      .then((data) => {
        setData(data);
        console.log('data in datafetch', data);
      })
      .catch(console.error);
  }, [setData, dataParams]);
}

export function updateGraphSeries({ data, setChartOptions, setLoading, ref }: UpdateSeriesProps) {
  if (!data || data.length === 0) {
    return;
  }

  const newOptions: HighchartsOptionsType = {
    data: {
      csv: data,
      switchRowsAndColumns: true, //rows are series
      itemDelimiter: ';',
      beforeParse: (d) => {
        console.log('unparsed data', d);
        return d;
      },
      complete: (d) => {
        console.log('parsed data', d);
        return d;
      },
    },
  };

  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    ...newOptions,
  }));

  /*

  // explicitly updating the chart, because otherwise old series are left over when # old series > # new series
  if (ref.current?.chart) {
    ref.current.chart.update(
      { ...ref.current.chart.options, ...newOptions },
      true,
      true, // oneToOne: ensures old series are removed from the graph
    );
  }

  */

  setLoading(false);
}
