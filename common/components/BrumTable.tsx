'use client';

import { FunnelIcon, TableIcon } from '@navikt/aksel-icons';
import { Chips, Page, Skeleton, Table, ToggleGroup, VStack } from '@navikt/ds-react';
import { BrumData } from '../types/brumData';
import { useState } from 'react';
import { FilterMenu } from './DataFilter';
import { FilterType } from '../types/filterTypes';

const BrumTable = ({ data }: { data: BrumData | null }) => {
  if (!data) {
    return (
      <section aria-label="Laster datatabell">
        <VStack width="100%" align="center">
          <Skeleton />
        </VStack>
      </section>
    );
  }
  const [filters, setFilters] = useState<FilterType[]>([]);
  return (
    <Page.Block width="md" aria-label="Datatabell">
      <ToggleGroup defaultValue="full" onChange={console.info}>
        {true && (
          <ToggleGroup.Item
            value="filter"
            label="Filtrert data"
            icon={<FunnelIcon aria-hidden />}
          />
        )}
        <ToggleGroup.Item value="full" label="All data" icon={<TableIcon aria-hidden />} />
      </ToggleGroup>

      <FilterMenu data={data} setFilters={setFilters} />

      <Chips data-color="Green">
        {filters.map((c) => (
          <Chips.Removable
            key={c.label}
            onClick={() => setFilters((x) => x.filter((y) => y !== c))}
          >
            {c.label}
          </Chips.Removable>
        ))}
      </Chips>

      <Table size="small" zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader key={0}>Avdeling</Table.ColumnHeader>
            <Table.ColumnHeader key={1}>Innsattsgruppe</Table.ColumnHeader>
            {data.headers.map((h, i) => (
              <Table.ColumnHeader align={'right'} key={i + 2}>
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
    </Page.Block>
  );
};

export default BrumTable;
