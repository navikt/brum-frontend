'use client';

import { FunnelIcon, TableIcon } from '@navikt/aksel-icons';
import { HStack, Page, Skeleton, Spacer, Switch, Table, Tabs, VStack } from '@navikt/ds-react';
import { BrumData } from '../types/brumData';
import { useRef } from 'react';
import { BrumTableProps } from '../types/propTypes';

const BrumTable = ({ data, filteredData }: BrumTableProps) => {
  if (!data) {
    return (
      <section aria-label="Laster datatabell">
        <VStack width="100%" align="center">
          <Skeleton />
        </VStack>
      </section>
    );
  }

  // for å autofokusere i filtertabben når filtere blir satt
  const filterTabRef = useRef<any>(null);

  return (
    <Page.Block width="md" aria-label="Datatabell">
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
