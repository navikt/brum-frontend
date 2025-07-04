'use client';

import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { useEffect, useState } from 'react';
import ChartMenu from './ChartMenu';
import TableX from './TableX';
import { Chart, HighchartsOptionsType } from '@highcharts/react';
import { updateGraphSeries, useFetchTestData } from '@/common/utils/fetchTestData';
import { Loader } from '@navikt/ds-react';
import Highcharts from 'highcharts';
import { useTheme } from '../UI/ThemeContext';

const Graph = () => {
  const [data, setData] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>({
    title: { text: '' },
    chart: { inverted: false },
    plotOptions: { series: { stacking: undefined } },
  });

  useEffect(() => {
    // Only run on client
    import('highcharts/themes/adaptive');
  }, []);

  useFetchTestData(setData);
  useEffect(() => {
    updateGraphSeries({ data, setChartOptions, setLoading });
  }, [data]);

  return (
    <div>
      {loading ? (
        <Loader size="xlarge" />
      ) : (
        <>
          <div className={theme === 'light' ? 'highcharts-light' : 'highcharts-dark'}>
            {/* The name of the container class controls the theme of the chart */}
            <Chart highcharts={Highcharts} options={chartOptions}>
              <Exporting />
            </Chart>
          </div>
          <ChartMenu chartOptions={chartOptions} setChartOptions={setChartOptions} />
          <TableX />
        </>
      )}
    </div>
  );
};

export default Graph;
