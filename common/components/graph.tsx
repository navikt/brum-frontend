'use client';

import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { useEffect, useState } from 'react';
import ChartMenu from './chartmenu';
import TableX from './tablex';
import { Chart, HighchartsOptionsType } from '@highcharts/react';
import { updateGraphSeries, useFetchTestData } from '@/common/utils/fetchTestData';
import { HStack, Skeleton } from '@navikt/ds-react';

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
        <HStack gap="2">
          <Skeleton variant="rectangle" width="8%" height="30%" />
          <Skeleton variant="rectangle" width="5%" height="20%" />
          <Skeleton variant="rectangle" width="9%" height="40%" />
          <Skeleton variant="rectangle" width="6%" height="10%" />
          <Skeleton variant="rectangle" width="8%" height="50%" />
          <Skeleton variant="rectangle" width="7%" height="60%" />
        </HStack>
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
