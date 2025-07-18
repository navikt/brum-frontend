'use client';
import BrumChart from '@/components/chart/BrumChart';
import ChartMenu from '@/components/chart/ChartMenu';
import BrumTable from '@/components/data/BrumTable';
import Datameny from '@/components/data/Datameny';
import Filtermeny from '@/components/data/Filtermeny';
import useUkeData from '@/hooks/useUkedata';
import { defaultChartOptions } from '@/lib/constants/chartOptions';
import BrumData from '@/lib/types/brumData';
import FilterType from '@/lib/types/filterTypes';
import { DataOptionsProps } from '@/lib/types/propTypes';
import filtrerData from '@/lib/utils/filtrerData';
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
        selectedTiltak: new Array(data.headers.length).fill(true),
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
  const [chartOptions, setChartOptions] = useState<HighchartsOptionsType>(defaultChartOptions);

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
