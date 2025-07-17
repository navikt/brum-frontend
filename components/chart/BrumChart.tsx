'use client';

import { ChartProps } from '@/lib/types/propTypes';
import { updateGraphSeries } from '@/lib/utils/chart';
import { useTheme } from '@/providers';
import { Chart, HighchartsOptionsType, setHighcharts } from '@highcharts/react';
import { VStack, Loader } from '@navikt/ds-react';
import Highcharts from 'highcharts/highcharts.src';
import('highcharts/modules/exporting');
import('highcharts/modules/accessibility');
import('highcharts/modules/drilldown');
import('highcharts/themes/adaptive');
setHighcharts(Highcharts);
import { useEffect, useRef, useState } from 'react';
import ChartMenu from './ChartMenu';

const BrumChart = ({ data }: ChartProps) => {
  const { theme } = useTheme();
  const ref = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>({
    title: { text: '' },
    chart: {
      inverted: false,
      type: 'column',
      height: '50%',
    },
    plotOptions: {
      series: { stacking: undefined },
      column: {
        pointPadding: 0.05,
        groupPadding: 0.05,
        centerInCategory: true,
      },
    },
    yAxis: {
      maxPadding: 0.05,
      title: { text: 'Antall deltakere' },
      labels: { format: '{value:,0f}' },
    },
    xAxis: {
      labels: {
        style: { fontSize: '14px' },
      },
    },
    exporting: { enabled: true },
    accessibility: { enabled: true },
  });

useEffect(() => {
  updateGraphSeries({ data, chartOptions, setChartOptions, setLoading, ref });
}, [data, chartOptions]);

  return (
    <div>
      {loading ? (
        <VStack width="100%" align="center">
          <Loader size="3xlarge" />
        </VStack>
      ) : (
        <>
          <div className={theme === 'light' ? 'highcharts-light' : 'highcharts-dark'}>
            {/* The name of the container class controls the theme of the chart */}
            <Chart highcharts={Highcharts} ref={ref} options={chartOptions} />
          </div>
          <ChartMenu chartOptions={chartOptions} setChartOptions={setChartOptions} />
        </>
      )}
    </div>
  );
};

export default BrumChart;