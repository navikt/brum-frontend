import { HighchartsOptionsType } from '@highcharts/react';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { DataOptionsProps, UpdateSeriesProps } from '../types/propTypes';
import { BrumData } from '../types/brumData';

export function updateGraphSeries({ data, setChartOptions, setLoading, ref }: UpdateSeriesProps) {
  if (!data) {
    return;
  }

  const newOptions: HighchartsOptionsType = {
    data: {
      rows: data.data.map((avdelingData) => 
        avdelingData.verdier),
      
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
    }));}