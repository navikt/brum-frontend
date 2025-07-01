'use client';

import { Exporting } from '@highcharts/react/options/Exporting'; // tillater eksportering av grafen
import { useRef, useState } from 'react';
import ChartMenu from './chartmenu';
import TableX from './tablex';
import { Chart, HighchartsOptionsType } from '@highcharts/react';
import { useFetchTestData } from '@/common/utils/fetchTestData';
import { Skeleton } from '@navikt/ds-react';

const Graph = () => {
  const ref = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>({
    title: { text: '' },
    chart: { inverted: false },
    plotOptions: { series: { stacking: undefined } },
  });

  useFetchTestData(setChartOptions, setLoading);

  return (
    <div>
      {loading ? (
        <>
          <Skeleton width="100%" height={500} style={{ marginBottom: '1rem' }} />
        </>
      ) : (
        <>
          <Chart options={chartOptions} ref={ref}>
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
