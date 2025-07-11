'use client';

import { FunnelIcon, TableIcon } from '@navikt/aksel-icons';
import { Table, Tabs } from '@navikt/ds-react';
import { BrumData } from '../types/brumData';

/*
interface ScopedSortState extends SortState {
  orderBy: keyof (typeof data)[0];
} */

const BrumTable = ({ data }: { data: BrumData | null }) => {
  /*
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
  

  function comparator<T>(a: T, b: T, orderBy: keyof T): number {
    if (b[orderBy] == null || b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const sortedData = data.slice().sort((a, b) => {
    if (sort) {
      return sort.direction === 'ascending'
        ? comparator(b, a, sort.orderBy)
        : comparator(a, b, sort.orderBy);
    }
    return 1;
  });
  */

  return (
    <Tabs defaultValue="filter">
      <Tabs.List>
        <Tabs.Tab value="filter" label="Filtrert data" icon={<FunnelIcon aria-hidden />} />
        <Tabs.Tab value="full" label="All data" icon={<TableIcon aria-hidden />} />
      </Tabs.List>
      <Tabs.Panel value="filter">Filtrert data</Tabs.Panel>
      <Tabs.Panel value="full">Allll dataen</Tabs.Panel>
    </Tabs>
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
