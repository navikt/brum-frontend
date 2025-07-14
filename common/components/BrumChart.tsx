'use client';

import { Chart, HighchartsOptionsType, setHighcharts } from '@highcharts/react';
import Highcharts from 'highcharts/highcharts.src';
import('highcharts/modules/exporting');
import('highcharts/modules/accessibility');
import('highcharts/modules/data');
setHighcharts(Highcharts);

import { updateGraphSeries } from '@/common/utils/updateGraphData';
import { Loader, VStack } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { ChartProps } from '../types/propTypes';
import { useTheme } from '../UI/ThemeContext';
import ChartMenu from './ChartMenu';

const BrumChart = ({ data }: ChartProps) => {
  const { theme } = useTheme();
  const ref = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>({
    title: { text: '' },
    chart: { inverted: false, type: 'column' },
    plotOptions: { series: { stacking: undefined } },
    exporting: { enabled: true },
    accessibility: { enabled: true },
  });

  useEffect(() => {
    // Only run on client
    import('highcharts/themes/adaptive');
  }, []);

  useEffect(() => {
    updateGraphSeries({ data, chartOptions, setChartOptions, setLoading, ref });
  }, [data]);

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
