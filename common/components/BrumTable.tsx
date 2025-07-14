'use client';

import { FunnelIcon, TableIcon } from '@navikt/aksel-icons';
import { Chips, Skeleton, Table, Tag, ToggleGroup, VStack } from '@navikt/ds-react';
import { BrumData } from '../types/brumData';
import { useState } from 'react';
import { FilterMenu } from './DataFilter';

const BrumTable = ({ data }: { data: BrumData | null }) => {
  return <div>table missing</div>
  /* const [filters, setFilters] = useState<string[]>([]);
  if (!data || !data.rows || data.rows.length === 0) {
    return (
      <section aria-label="Laster datatabell">
        <VStack width="100%" align="center">
          <Skeleton />
        </VStack>
      </section>
    );
  }

  const [headers, ...dataRows] = data.rows;
  return (
    <section aria-label="Datatabell">
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

      <Chips>
        {filters.map((c) => (
          <Chips.Removable key={c} onClick={() => setFilters((x) => x.filter((y) => y !== c))}>
            {c}
          </Chips.Removable>
        ))}
      </Chips>

      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            {headers.map((ch, i) => (
              <Table.ColumnHeader
                align={data.column_types[i] === 'string' ? 'left' : 'right'}
                key={i}
              >
                {ch}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataRows.map((row, i) => (
            <Table.Row key={i}>
              {row.map((c, j) => (
                <Table.DataCell
                  key={j}
                  align={data.column_types[j] === 'string' ? 'left' : 'right'}
                >
                  {c}
                </Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  );*/
}; 

export default BrumTable;
