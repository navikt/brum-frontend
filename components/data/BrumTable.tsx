'use client';

import { BrumData } from '@/lib/types/brumData';
import { FilterType } from '@/lib/types/filterTypes';
import { FunnelIcon, TableIcon } from '@navikt/aksel-icons';
import { Chips, HStack, Page, Skeleton, Spacer, Switch, Table, Tabs, ToggleGroup, VStack } from '@navikt/ds-react';
import { useMemo, useRef, useState } from 'react';
import { FilterMenu } from './DataFilter';

/**
 * Komponent som viser Brum-data i tabellformat
 * 
 * Viser data i en tabell med mulighet for filtrering og sortering.
 * Støtter både full og filtrert visning av data.
 * 
 * @param data - Brum-data som skal vises
 */
const BrumTable = ({ data }: { data: BrumData | null }) => {
  const [filters, setFilters] = useState<FilterType[]>([]);
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
    </Page.Block>
  );
};

export default BrumTable;