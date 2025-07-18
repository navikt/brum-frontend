'use client';

import { Chart, setHighcharts } from '@highcharts/react';
import Highcharts from 'highcharts/highcharts.src';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsAccessibility from 'highcharts/modules/accessibility';
import HighchartsDrilldown from 'highcharts/modules/drilldown';

// Initialize Highcharts modules
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts);
  HighchartsAccessibility(Highcharts);
  HighchartsDrilldown(Highcharts);
}

setHighcharts(Highcharts);

import { ChartProps } from '@/lib/types/propTypes';
import { updateGraphSeries } from '@/lib/utils/chart';
import { useTheme } from '@/providers';
import { Loader, VStack } from '@navikt/ds-react';
import { useEffect, useRef, useState } from 'react';

const BrumChart = ({
  data,
  filterApplied,
  filteredData,
  chartOptions,
  setChartOptions,
}: ChartProps) => {
  const { theme } = useTheme();
  const ref = useRef<any>(null);
  const [loading, setLoading] = useState(true);

  // Update graph series whenever data changes
  useEffect(() => {
    updateGraphSeries({
      data: filterApplied ? filteredData : data,
      setChartOptions,
      setLoading,
      filterApplied,
    });
  }, [data, filterApplied, filteredData]);

  // in order to properly update the chart for new series. w/o it, old series would stay if # old series > # new series
  useEffect(() => {
    if (ref.current?.chart) {
      ref.current.chart.update(chartOptions, true, true);
    }
  }, [chartOptions]);

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
        </>
      )}
    </div>
  );
};

export default BrumChart;
