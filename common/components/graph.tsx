'use client';

import { Chart, PlotOptions } from '@highcharts/react';
import { Data } from '@highcharts/react/options/Data';
import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { useRef, useState, useEffect } from 'react';
import ChartMenu from './chartmenu';
import { GraphProps } from '@/common/types/chartTypes';

const Graph = ({ filnavn }: GraphProps) => {
  const ref = useRef<any>(null);
  const [tulleData, setTulledata] = useState('');

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL!! + '/getTestData')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.text();
      })
      .then(setTulledata)
      .catch(console.error);
  }, []);

  const [chartOptions, setChartOptions] = useState({
    title: { text: '' },
    chart: { type: 'column', inverted: false },
    plotOptions: { series: { stacking: undefined } },
  });

  return (
    <div>
      <Chart options={chartOptions} ref={ref}>
        <Exporting />
        <Data csv={tulleData} />
      </Chart>

      <ChartMenu chartOptions={chartOptions} setChartOptions={setChartOptions} ref={ref} />
    </div>
  );
};

export default Graph;
