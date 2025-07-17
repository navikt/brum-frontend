'use client';

import { Chart, HighchartsOptionsType, setHighcharts } from '@highcharts/react';
import Highcharts from 'highcharts/highcharts.src';
import('highcharts/modules/exporting');
import('highcharts/modules/accessibility');
import('highcharts/modules/drilldown');
import('highcharts/themes/adaptive');
setHighcharts(Highcharts);

import { Loader, VStack } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import ChartMenu from './ChartMenu';
import { ChartProps } from '@/lib/types/propTypes';
import { useTheme } from '@/providers';
import { updateGraphSeries } from '@/lib/utils/chart';

const BrumChart = ({ data, filterApplied, filteredData }: ChartProps) => {
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
    // in order to properly update the chart for new series. w/o it, old series would stay if # old series > # new series
    updateGraphSeries({
      data: filterApplied ? data : filteredData,
      setChartOptions,
      setLoading,
      filterApplied,
    });
    if (ref.current?.chart) {
      ref.current.chart.update(chartOptions, true, true); // (options, redraw, OneToOne)
    }
  }, [data, filterApplied, chartOptions, filteredData]);

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
