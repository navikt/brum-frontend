'use client';

import { Chart, PlotOptions } from '@highcharts/react';
import { Data } from '@highcharts/react/options/Data';
import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { useRef, useState } from 'react';
import ChartMenu from './chartmenu';

interface GraphProps {
  filnavn: string;
}

const Graph = ({ filnavn }: GraphProps) => {
  const ref = useRef<any>(null);

  const [chartOptions, setChartOptions] = useState({
    title: { text: '' },
    chart: { type: 'column', inverted: false },
  });

  return (
    <div>
      <Chart options={chartOptions} ref={ref}>
        <Exporting />
        <Data csvURL={'/data/' + filnavn} />
        <PlotOptions series={{ stacking: 'normal' }} />
      </Chart>

      <ChartMenu chartOptions={chartOptions} setChartOptions={setChartOptions} ref={ref} />
    </div>
  );
};

export default Graph;
