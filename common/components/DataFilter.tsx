'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { FilterState } from '../types/filterTypes';
import { ActionMenu, Button, TextField, UNSAFE_Combobox, VStack } from '@navikt/ds-react';
import { BrumData } from '../types/brumData';

export function DataFilter({ data }: { data: BrumData }) {
  const [filters, setFilters] = useState<FilterState>({});
}
/*
  const filteredData = useMemo(() => {
      if (!filters || !data || !data.rows || data.rows.length === 0) return null;
      
      const [headers, ...rows] = data.rows;
}}
*/

// konsept: filters burde være et object, hvor hver kolonneindex peker på filtertyper som peker på sine verdier. så {1 -> contains -> "alder"}
// filtere skal kunne oppdateres og fjernes via filtermenyen + kunne cleane ut
// man skal kunne velge filtertyper ettersom om man har strenger eller tall
// man må kunne se filterne man har lagt til, og legge til flere per kolonne, typ nytt filter!

// så legg til nytt filter knapp-> så velger man kolonne, så type filter, så verdi
// så kan man legge til nytt, ikke endre, blir lagt som en tag!!!!

export function FilterMenu({
  data,
  setFilters,
}: {
  data: BrumData;
  setFilters: Dispatch<SetStateAction<string[]>>;
}) {
  const [selectedColumn, setSelectedColumn] = useState<number>(-1);
  const [selectedFilterType, setSelectedFilterType] = useState<string>('');

  const columns = data.column_types.map((t, i) => ({
    header: data.rows[0][i],
    index: i,
    type: t as 'string' | 'number',
  }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const columnHeader = columns[selectedColumn].header.toString();
    const filterTypeLabel = selectedFilterType;
    const filterValue = formData.get('filterValue');

    setFilters((prev) => [...prev, `${columnHeader} ${filterTypeLabel} ${filterValue}`]);
    event.currentTarget.reset();
    setSelectedColumn(-1);
    setSelectedFilterType('');
  };

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button>Filtre</Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <form onSubmit={handleSubmit}>
          <VStack gap="3">
            <UNSAFE_Combobox
              label="Kolonne"
              options={columns.map((c) => ({
                label: c.header.toString(),
                value: c.index.toString(),
              }))}
              onToggleSelected={(i) => {
                setSelectedColumn(+i);
                setSelectedFilterType('');
              }}
            />

            {selectedColumn >= 0 && (
              <UNSAFE_Combobox
                label="Filtrer for"
                options={
                  columns[selectedColumn].type === 'number'
                    ? [
                        { label: 'Større enn', value: '>' },
                        { label: 'Mindre enn', value: '<' },
                      ]
                    : [
                        { label: 'Inneholder', value: 'inneholder' },
                        { label: 'Er lik', value: '=' },
                      ]
                }
                onToggleSelected={setSelectedFilterType}
              />
            )}

            {selectedFilterType && (
              <TextField
                name="filterValue"
                label="Verdi"
                inputMode={columns[selectedColumn].type === 'number' ? 'numeric' : 'text'}
                placeholder="Skriv inn verdi..."
                required
              />
            )}

            {selectedFilterType && (
              <Button type="submit" size="small">
                Legg til filter
              </Button>
            )}
          </VStack>
        </form>
      </ActionMenu.Content>
    </ActionMenu>
  );
}
