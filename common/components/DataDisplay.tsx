'use client';

import { Chart, HighchartsOptionsType, setHighcharts } from '@highcharts/react';
import Highcharts from 'highcharts/highcharts.src';
import('highcharts/modules/exporting');
import('highcharts/modules/accessibility');
import('highcharts/modules/data');
setHighcharts(Highcharts);
import { updateGraphSeries, useFetchTestData } from '@/common/utils/fetchTestData';
import { Loader, VStack } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';
import { DataOptionsProps } from '../types/propTypes';
import { useTheme } from '../UI/ThemeContext';
import ChartMenu from './ChartMenu';
import DataMenu from './DataMenu';
import DataTable from './DataTable';

const DataDisplay = () => {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [dataParams, setDataParams] = useState<DataOptionsProps>({ dataSet: 'Mini.csv' });
  const { theme } = useTheme();
  const ref = useRef<any>(null);

  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>({
    title: { text: '' },
    chart: { inverted: false },
    plotOptions: { series: { stacking: undefined } },
    exporting: { enabled: true },
    accessibility: { enabled: true },
  });

  useEffect(() => {
    // Only run on client
    import('highcharts/themes/adaptive');
  }, []);

  useFetchTestData(setData, dataParams);

  useEffect(() => {
    updateGraphSeries({ data, chartOptions, setChartOptions, setLoading, ref });
  }, [data, setData]);

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
          <DataMenu dataParams={dataParams} setDataParams={setDataParams} />
          <ChartMenu chartOptions={chartOptions} setChartOptions={setChartOptions} />
          <DataTable data={data} />
        </>
      )}
    </div>
  );
};

export default DataDisplay;
