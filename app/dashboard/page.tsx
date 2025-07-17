'use client';
import BrumChart from '@/components/chart/BrumChart';
import ChartMenu from '@/components/chart/ChartMenu';
import BrumTable from '@/components/data/BrumTable';
import { Filtermeny } from '@/components/data/Filtermeny';
import Datameny from '@/components/data/Datameny';
import { useUkeData } from '@/hooks/useUkedata';
import { BrumData } from '@/lib/types/brumData';
import { FilterType } from '@/lib/types/filterTypes';
import { DataOptionsProps } from '@/lib/types/propTypes';
import { filtrerData } from '@/lib/utils/filtrerData';
import { HighchartsOptionsType } from '@highcharts/react';
import { HStack, Spacer, Switch } from '@navikt/ds-react';
import { Page } from '@navikt/ds-react/Page';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<BrumData | null>(null);
  const [filterChart, setFilterChart] = useState(false);

  const [dataParams, setDataParams] = useState<DataOptionsProps>({
    aar: 2025,
    uke: 27,
  }); // hardcoded as this is the end of our mock data

  const [filter, setFilter] = useState<FilterType | null>(null);

  useEffect(() => {
    if (data) {
      const allAvdelinger = data.dataAvdeling.map((d) => d.avdeling);
      const allInnsatsgrupper = Array.from(new Set(data.data.map((d) => d.innsatsgruppe)));

      setFilter({
        avdelinger: allAvdelinger,
        innsatsgrupper: allInnsatsgrupper,
        tiltakMin: data.headers.map((_) => 0),
        tiltakMaks: data.headers.map((_) => Infinity),
        allAvdelinger,
        allInnsatsgrupper,
      });
    }
  }, [data]);

  const filteredData = useMemo(() => {
    if (!data || !filter) return null;
    return filtrerData(filter, data);
  }, [filter, data]);

  useUkeData({ setData, dataParams });
  const ref = useRef<any>(null);

  // alle instillinger for charten ligger her, inkl. dataen som vises
  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>({
    title: { text: '' },
    chart: {
      inverted: false,
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

  return (
    <Page>
      <Page.Block width="2xl" as="main">
        <HStack margin="4" align="end" gap="10">
          <Datameny dataParams={dataParams} setDataParams={setDataParams} />

          {data && filter && (
            <Filtermeny
              filter={filter}
              setFilter={
                setFilter as (filter: FilterType | ((prev: FilterType) => FilterType)) => void
              }
              tiltak={data.headers}
              filterTabRef={ref}
            />
          )}
          <Spacer />
          <Switch
            onChange={(e) => {
              setFilterChart(e.target.checked);
            }}
          >
            Bruk filtrert data i graf
          </Switch>
          <ChartMenu chartOptions={chartOptions} setChartOptions={setChartOptions} />
        </HStack>

        <BrumChart
          data={data}
          filteredData={filteredData!}
          filterApplied={filterChart}
          chartOptions={chartOptions}
          setChartOptions={setChartOptions}
        />
        {data && filteredData && (
          <BrumTable data={data} filteredData={filteredData} filterTabRef={ref} />
        )}
      </Page.Block>
    </Page>
  );
}
