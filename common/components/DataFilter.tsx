'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { ActionMenu, Button, HStack, TextField, UNSAFE_Combobox } from '@navikt/ds-react';
import { BrumData } from '../types/brumData';
import { FilterMenuProps } from '../types/filterTypes';

enum FilterKind {
  NUM_GT,
  NUM_LT,
  NUM_EQUALS,
  NUM_BETWEEN,
  STR_CONTAINS,
  STR_EQUALS,
  STR_STARTS_WITH,
}

function makeFilter(type: FilterKind, column: string, x?: number, y?: number, text?: string) {
  switch (type) {
    case FilterKind.NUM_GT: {
      return { label: `${column} > ${x}`, comp_function: (z: number) => z > x! };
    }
    case FilterKind.NUM_LT: {
      return { label: `${column} < ${x}`, comp_function: (z: number) => z < x! };
    }
    case FilterKind.NUM_EQUALS: {
      return { label: `${column} > ${x}`, comp_function: (z: number) => z == x! };
    }
    case FilterKind.NUM_BETWEEN: {
      return { label: `${y} > ${column} > ${x}`, comp_function: (z: number) => y! > z && z > x! };
    }
    case FilterKind.STR_CONTAINS: {
      return {
        label: `${column} inneholder "${text}"`,
        comp_function: (z: string) => z.includes(text!),
      };
    }
    case FilterKind.STR_EQUALS: {
      return { label: `${column} er lik "${text}"`, comp_function: (z: string) => z === text! };
    }
    case FilterKind.STR_STARTS_WITH: {
      return {
        label: `${column} begynner med "${text}"`,
        comp_function: (z: string) => z.startsWith(text!),
      };
    }
  }
}

// konsept: filters burde være et object, hvor hver kolonneindex peker på filtertyper som peker på sine verdier. så {1 -> contains -> "alder"}
// filtere skal kunne oppdateres og fjernes via filtermenyen + kunne cleane ut
// man skal kunne velge filtertyper ettersom om man har strenger eller tall
// man må kunne se filterne man har lagt til, og legge til flere per kolonne, typ nytt filter!

// så legg til nytt filter knapp-> så velger man kolonne, så type filter, så verdi
// så kan man legge til nytt, ikke endre, blir lagt som en tag!!!!

export function FilterMenu({ data, setFilters }: FilterMenuProps) {
  return <div>filtering missing</div>; /*
  const [selectedColumn, setSelectedColumn] = useState({ header: '', type: '' });
  const [selectedFilterType, setSelectedFilterType] = useState<FilterKind | null>(null);

  const columns = data.column_types.map((t, i) => ({
    header: data.rows[0][i],
    index: i,
    type: t as 'string' | 'number',
  }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setFilters((prev) => [
      ...prev,
      makeFilter(
        selectedFilterType!,
        selectedColumn.header,
        // For number filters, pass x and y
        selectedFilterType! <= FilterKind.NUM_BETWEEN ? +formData.get('filterVal')! : undefined,
        selectedFilterType! === FilterKind.NUM_BETWEEN ? +formData.get('extraVal')! : undefined,
        // For string filters, pass text
        selectedFilterType! > FilterKind.NUM_BETWEEN
          ? formData.get('filterVal')?.toString()!
          : undefined,
      ),
    ]);
    event.currentTarget.reset();
    setSelectedColumn({ header: '', type: '' });
    setSelectedFilterType(null);
  };

  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button>Filtre</Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <form onSubmit={handleSubmit}>
          <HStack gap="3">
            <UNSAFE_Combobox
              label="Kolonne"
              options={columns.map((c) => ({
                label: c.header.toString(),
                value: c.index.toString(),
              }))}
              onToggleSelected={(i) => {
                setSelectedColumn({
                  header: columns[+i].header.toString(),
                  type: columns[+i].type,
                });
              }}
            />

            {selectedColumn.header && (
              <UNSAFE_Combobox
                label="Filtrer for"
                options={
                  selectedColumn.type === 'number'
                    ? [
                        { label: 'Større enn', value: FilterKind.NUM_GT.toString() },
                        { label: 'Mindre enn', value: FilterKind.NUM_LT.toString() },
                        { label: 'Er lik', value: FilterKind.NUM_EQUALS.toString() },
                        { label: 'Mellom', value: FilterKind.NUM_BETWEEN.toString() },
                      ]
                    : [
                        { label: 'Inneholder', value: FilterKind.STR_CONTAINS.toString() },
                        { label: 'Er lik', value: FilterKind.STR_EQUALS.toString() },
                        { label: 'Begynnner med', value: FilterKind.STR_STARTS_WITH.toString() },
                      ]
                }
                onToggleSelected={(e) => setSelectedFilterType(+e as FilterKind)}
              />
            )}

            {selectedFilterType && (
              <>
                <TextField
                  name="filterVal"
                  label="Verdi"
                  inputMode={selectedColumn.type === 'number' ? 'numeric' : 'text'}
                  placeholder="Skriv inn verdi..."
                  required
                />
                (selectedFilterType == FilterKind.NUM_BETWEEN) &&{' '}
                <TextField
                  name="extraVal"
                  label="Verdi"
                  inputMode={'numeric'}
                  placeholder="Skriv inn verdi..."
                  required
                />
                <Button type="submit" size="small">
                  Legg til filter
                </Button>
              </>
            )}
          </HStack>
        </form>
      </ActionMenu.Content>
    </ActionMenu>
  ); */
}
