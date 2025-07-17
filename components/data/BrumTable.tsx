'use client';

import { FunnelIcon, TableIcon } from '@navikt/aksel-icons';
import { Page, Skeleton, SortState, Table, Tabs, VStack } from '@navikt/ds-react';
import { BrumTableProps } from '@/lib/types/propTypes';
import { BrumData } from '@/lib/types/brumData';
import { useState } from 'react';

const BrumTable = ({ data, filteredData, filterTabRef }: BrumTableProps) => {
  if (!data) {
    return (
      <section aria-label="Laster datatabell">
        <VStack width="100%" align="center">
          <Skeleton />
        </VStack>
      </section>
    );
  }
  return (
    <Page.Block width="xl" aria-label="Datatabell">
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

interface ScopedSortState extends SortState {
  orderBy: keyof BrumData['data'][number];
}

function DataTable({ data }: { data: BrumData }) {
  const [sort, setSort] = useState<ScopedSortState | undefined>();

  const handleSort = (sortKey: ScopedSortState['orderBy']) => {
    setSort(
      sort && sortKey === sort.orderBy && sort.direction === 'descending'
        ? undefined
        : {
            orderBy: sortKey,
            direction:
              sort && sortKey === sort.orderBy && sort.direction === 'ascending'
                ? 'descending'
                : 'ascending',
          },
    );
  };

  function comparator<T>(a: T, b: T, orderBy: keyof T | string): number {
    let aValue: any;
    let bValue: any;

    const orderByStr = String(orderBy);
    if (orderByStr.startsWith('verdier.')) {
      // Extract the index from "verdier.0", "verdier.1", etc.
      const index = parseInt(orderByStr.split('.')[1]);
      aValue = (a as any).verdier[index];
      bValue = (b as any).verdier[index];
    } else {
      // Direct property access for avdeling and innsatsgruppe
      aValue = a[orderBy as keyof T];
      bValue = b[orderBy as keyof T];
    }

    if (bValue == null || bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
    return 0;
  }

  const sortedData = data.data.sort((a, b) => {
    if (sort) {
      return sort.direction === 'ascending'
        ? comparator(b, a, sort.orderBy)
        : comparator(a, b, sort.orderBy);
    }
    return 1;
  });

  return (
    <Table
      sort={sort}
      onSortChange={(sortKey) => handleSort(sortKey as ScopedSortState['orderBy'])}
      size="small"
      zebraStripes
    >
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader sortKey="avdeling" key={0} textSize="small" sortable>
            Avdeling
          </Table.ColumnHeader>
          <Table.ColumnHeader sortKey="innsatsgruppe" key={1} textSize="small" sortable>
            Innsatsgruppe
          </Table.ColumnHeader>
          {data.headers.map((h, i) => (
            <Table.ColumnHeader
              align="right"
              sortKey={`verdier.${i}`}
              key={i + 2}
              textSize="small"
              sortable
            >
              {h}
            </Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {sortedData.map((row, i) => (
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
