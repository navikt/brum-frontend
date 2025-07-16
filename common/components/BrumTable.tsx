'use client';

import { FunnelIcon, TableIcon } from '@navikt/aksel-icons';
import { HStack, Page, Skeleton, Spacer, Switch, Table, Tabs, VStack } from '@navikt/ds-react';
import { BrumData } from '../types/brumData';
import { useMemo, useRef, useState } from 'react';
import { FilterMenu } from './DataFilter';
import { FilterType } from '../types/filterTypes';

const BrumTable = ({
  data,
  setChartData,
  setFilterApplied,
}: {
  data: BrumData | null;
  setChartData: (data: BrumData | null) => void;
  setFilterApplied: (a: boolean) => void;
}) => {
  if (!data) {
    return (
      <section aria-label="Laster datatabell">
        <VStack width="100%" align="center">
          <Skeleton />
        </VStack>
      </section>
    );
  }

  const [filter, setFilter] = useState<FilterType>(() => {
    const allAvdelinger = data.dataAvdeling.map((d) => d.avdeling);
    const allInnsatsgrupper = Array.from(new Set(data.data.map((d) => d.innsatsgruppe)));

    return {
      avdelinger: allAvdelinger,
      innsatsgrupper: allInnsatsgrupper,
      tiltakMin: data.headers.map((_) => 0),
      tiltakMaks: data.headers.map((_) => Infinity),
      allAvdelinger,
      allInnsatsgrupper,
    };
  });

  const filteredData = useMemo(() => filtrerData(filter, data), [filter]);

  // for å autofokusere i filtertabben når filtere blir satt
  const filterTabRef = useRef<any>(null);

  return (
    <Page.Block width="md" aria-label="Datatabell">
      <HStack>
        <Switch
          onChange={(e) => {
            setFilterApplied(e.target.checked);
            setChartData(e.target.checked ? filteredData : data);
          }}
        >
          Bruk filtrert data i graf
        </Switch>

        <Spacer />

        <FilterMenu
          filter={filter}
          setFilter={setFilter}
          tiltak={data.headers}
          filterTabRef={filterTabRef}
        />
      </HStack>

      <Tabs defaultValue="full" selectionFollowsFocus>
        <Tabs.Tab
          value="filter"
          ref={filterTabRef}
          label="Filtrert data"
          icon={<FunnelIcon aria-hidden />}
        />
        <Tabs.Tab value="full" label="All data" icon={<TableIcon aria-hidden />} />

        <Tabs.Panel value="filter">
          <DataTable data={filteredData} />
        </Tabs.Panel>
        <Tabs.Panel value="full">
          <DataTable data={data} />
        </Tabs.Panel>
      </Tabs>
    </Page.Block>
  );
};

export default BrumTable;

function filtrerData(filter: FilterType, data: BrumData): BrumData {
  return {
    ...data,
    data: data.data.filter(
      (d) =>
        filter.avdelinger.includes(d.avdeling) &&
        filter.innsatsgrupper.includes(d.innsatsgruppe) &&
        d.verdier.every((v, i) => v >= filter.tiltakMin[i] && v <= filter.tiltakMaks[i]),
    ),
  };
}

function DataTable({ data }: { data: BrumData }) {
  return (
    <Table size="small" zebraStripes>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader key={0} textSize="small">
            Avdeling
          </Table.ColumnHeader>
          <Table.ColumnHeader key={1} textSize="small">
            Innsattsgruppe
          </Table.ColumnHeader>
          {data.headers.map((h, i) => (
            <Table.ColumnHeader align={'right'} key={i + 2} textSize="small">
              {h}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.data.map((row, i) => (
          <Table.Row key={i}>
            <Table.DataCell key={0}>{row.avdeling}</Table.DataCell>
            <Table.DataCell key={1}>{row.innsatsgruppe}</Table.DataCell>
            {row.verdier.map((c, j) => (
              <Table.DataCell key={j} align={'right'}>
                {c}
              </Table.DataCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
