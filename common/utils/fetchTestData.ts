import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DataOptionsProps, UpdateSeriesProps } from '../types/propTypes';
import { BrumData } from '../types/brumData';

export function useFetchTestData(
  setData: Dispatch<SetStateAction<BrumData | null>>,
  dataParams: DataOptionsProps,
) {
  useEffect(() => {
    fetch(`/api/data?dataset=${dataParams.dataSet}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then(setData)
      .catch(console.error);
  }, [setData, dataParams]);
}

export function updateGraphSeries({ data, setChartOptions, setLoading, ref }: UpdateSeriesProps) {
  if (!data || data.rows.length === 0) {
    return;
  }

  const newOptions: HighchartsOptionsType = {
    data: {
      rows: data.rows,
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
