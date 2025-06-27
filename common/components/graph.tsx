'use client';

import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { useRef, useState, useEffect } from 'react';
import ChartMenu from './chartmenu';
import { GraphProps } from '@/common/types/chartTypes';
import TableX from './tablex';
import { Chart, HighchartsOptionsType } from '@highcharts/react';

const Graph = ({ filnavn }: GraphProps) => {
  const ref = useRef<any>(null);

  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>({
    title: { text: '' },
    chart: { type: 'column', inverted: false },
    series: [{ type: 'column', data: [1, 2, 3, 4] }],
    plotOptions: { series: { stacking: undefined } },
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/testData/test-data.json`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch data');
        return res.json();
      })
      .then((data) => {
        setChartOptions((prev) => ({
          ...prev,
          series: [{ type: 'column', data: data }],
        }));
      })
      .catch(console.error);
  }, []);

  // TODO: Få dataen til å displaye ordentlig i grafen ++ få tabellen til å vise samme data

  return (
    <div>
      <Chart options={chartOptions} ref={ref}>
        <Exporting />
      </Chart>
      <ChartMenu chartOptions={chartOptions} setChartOptions={setChartOptions} />
      <TableX />
    </div>
  );
};

export default Graph;
