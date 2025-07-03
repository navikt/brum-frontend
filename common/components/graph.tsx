'use client';

import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { useEffect, useState } from 'react';
import ChartMenu from './chartmenu';
import TableX from './tablex';
import { Chart, HighchartsOptionsType } from '@highcharts/react';
import { updateGraphSeries, useFetchTestData } from '@/common/utils/fetchTestData';
import { HStack, Loader, Skeleton } from '@navikt/ds-react';

const Graph = () => {
  const [data, setData] = useState<Object[]>([]);
  const [loading, setLoading] = useState(true);

  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>({
    title: { text: '' },
    chart: { inverted: false },
    plotOptions: { series: { stacking: undefined } },
  });

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
          <Chart options={chartOptions}>
            <Exporting />
          </Chart>
          <ChartMenu chartOptions={chartOptions} setChartOptions={setChartOptions} />
          <TableX />
        </>
      )}
    </div>
  );
};

export default Graph;
