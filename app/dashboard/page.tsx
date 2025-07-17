'use client';
import BrumChart from '@/components/chart/BrumChart';
import BrumTable from '@/components/data/BrumTable';
import { FilterMenu } from '@/components/data/DataFilter';
import Datameny from '@/components/data/Datameny';
import { useUkeData } from '@/hooks/useUkedata';
import { BrumData } from '@/lib/types/brumData';
import { FilterType } from '@/lib/types/filterTypes';
import { DataOptionsProps } from '@/lib/types/propTypes';
import { filtrerData } from '@/lib/utils/filtrerData';
import { GuidePanel, Heading, HGrid, Switch, VStack } from '@navikt/ds-react';
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

  if (!data || !filter) {
    return <div>Loading...</div>; // Add proper loading state
  }

  return (
    <Page>
      <Page.Block width="2xl" as="main">
        <VStack gap="8">
          <Heading level="1" size="xlarge" align="center">
            Dashboard
          </Heading>
          <GuidePanel>
            Her ser du statistikk og nøkkeltall for tiltak. Bruk menyen til venstre for å velge
            datasett og filtrere informasjonen som vises i grafen.
          </GuidePanel>

          <HGrid
            gap="8"
            align="start"
            columns={{
              md: '1fr', // Medium: stacked
              lg: '2fr 1fr', // Large: side by side
            }}
          >
            <VStack>
              <Datameny dataParams={dataParams} setDataParams={setDataParams} />
              <BrumChart data={data} filteredData={filteredData!} filterApplied={filterChart} />
            </VStack>
            <div>
              <Switch
                onChange={(e) => {
                  setFilterChart(e.target.checked);
                }}
              >
                Bruk filtrert data i graf
              </Switch>
              <FilterMenu
                filter={filter}
                setFilter={
                  setFilter as (filter: FilterType | ((prev: FilterType) => FilterType)) => void
                }
                tiltak={data.headers}
                filterTabRef={ref}
              />
              <BrumTable data={data!} filteredData={filteredData!} filterTabRef={ref} />
            </div>
          </HGrid>
        </VStack>
      </Page.Block>
    </Page>
  );
}
