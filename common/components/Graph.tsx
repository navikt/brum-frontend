'use client';

import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { useEffect, useState } from 'react';
import ChartMenu from './ChartMenu';
import TableX from './TableX';
import { Chart, HighchartsOptionsType } from '@highcharts/react';
import { updateGraphSeries, useFetchTestData } from '@/common/utils/fetchTestData';
import { Loader } from '@navikt/ds-react';
import Highcharts from 'highcharts';

const Graph = () => {
  const [data, setData] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);

  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>({
    title: { text: '' },
    chart: { inverted: false },
    plotOptions: { series: { stacking: undefined } },
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const sunsetTheme = require('highcharts/themes/sunset');
      sunsetTheme(Highcharts);
    }
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
          <div className="highcharts-dark">
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
