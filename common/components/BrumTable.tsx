'use client';

import { FunnelIcon, TableIcon } from '@navikt/aksel-icons';
import { Skeleton, Table, ToggleGroup, VStack } from '@navikt/ds-react';
import { BrumData } from '../types/brumData';
import { useMemo, useState } from 'react';

/*
interface ScopedSortState extends SortState {
  orderBy: keyof (typeof data)[0];
} */

const BrumTable = ({ data }: { data: BrumData | null }) => {
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

      <Table zebraStripes>
        <Table.Header>
          <Table.Row>
            {headers.map((col, index) => (
              <Table.ColumnHeader key={index}>{col}</Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {dataRows.map((row, i) => (
            <Table.Row key={i}>
              {row.map((c, j) => (
                <Table.DataCell key={j} align={data.types[j] === 'string' ? 'left' : 'right'}>
                  {c}
                </Table.DataCell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  );
};

/*
  const columns = Object.keys(data[0]);

  return (
    <Table zebraStripes>
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeader key={col}>{col}</Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((row, i) => (
          <Table.Row key={i}>
            {columns.map((col) => (
              <Table.DataCell key={col}>{row[col]}</Table.DataCell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
*/
export default BrumTable;
