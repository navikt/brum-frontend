'use client';

import { useRef, useState } from 'react';
import { Button, HStack, Modal, TextField, UNSAFE_Combobox } from '@navikt/ds-react';
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

function makeFilter(type: FilterKind, column: string, x?: string, y?: number) {
  switch (type) {
    case FilterKind.NUM_GT: {
      return { label: `${column} > ${x}`, comp_function: (z: number) => z > +x! };
    }
    case FilterKind.NUM_LT: {
      return { label: `${column} < ${x}`, comp_function: (z: number) => z < +x! };
    }
    case FilterKind.NUM_EQUALS: {
      return { label: `${column} > ${x}`, comp_function: (z: number) => z == +x! };
    }
    case FilterKind.NUM_BETWEEN: {
      return {
        label: `${y} > ${column} > ${x}`,
        comp_function: (z: number) => y! > z && z > +x!,
      };
    }
    case FilterKind.STR_CONTAINS: {
      return {
        label: `${column} inneholder "${x}"`,
        comp_function: (z: string) => z.includes(x!),
      };
    }
    case FilterKind.STR_EQUALS: {
      return {
        label: `${column} er lik "${x}"`,
        comp_function: (z: string) => z === x!,
      };
    }
    case FilterKind.STR_STARTS_WITH: {
      return {
        label: `${column} begynner med "${x}"`,
        comp_function: (z: string) => z.startsWith(x!),
      };
    }
  }
}

export function FilterMenu({ data, setFilters }: FilterMenuProps) {
  const [selectedColumn, setSelectedColumn] = useState({ header: '', type: '' });
  const [selectedFilterType, setSelectedFilterType] = useState<FilterKind | null>(null);

  const columns = [
    ...data.headers.map((header) => ({ header, type: 'number' })),
    { header: 'avdeling', type: 'string' },
    { header: 'innsatstype', type: 'string' },
  ];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setFilters((prev) => [
      ...prev,
      makeFilter(
        selectedFilterType!,
        selectedColumn.header,
        // For number filters, pass x
        selectedFilterType! <= FilterKind.NUM_BETWEEN
          ? formData.get('filterVal')!.toString()
          : undefined,
        // For number filters, pass x
        selectedFilterType! === FilterKind.NUM_BETWEEN ? +formData.get('extraVal')! : undefined,
      ),
    ]);
    event.currentTarget.reset();
    setSelectedColumn({ header: '', type: '' });
    setSelectedFilterType(null);
  };
  /* idé, se: https://aksel.nav.no/komponenter/core/actionmenu?demo=actionmenudemo-filter
  liste ut kolonner og innsatsbehov som checkboks-valgbare. kanskje basert på det, om filtrering, gjøre stackegreia? optionally.
  resten må autogeneres som tall valg, men en enkel større enn x mindre enn y, med skalavelger? tja. kanskje ikke. men uansett. grupper og greier :) */
  const ref = useRef<any>(null);

  return (
    <div>
      <Button onClick={() => ref?.current?.showModal()}>Åpne modal</Button>
      <Modal aria-label="filtermeny" ref={ref}>
        <Modal.Header>Filtre</Modal.Header>
        <Modal.Body>
          <HStack gap="3" minWidth="1000px">
            <form onSubmit={handleSubmit}>
              <UNSAFE_Combobox
                label="Kolonne"
                options={columns.map((c, i) => ({
                  label: c.header.toString(),
                  value: i.toString(),
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
                  size="small"
                  width="1rm"
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
                  {selectedFilterType == FilterKind.NUM_BETWEEN && (
                    <TextField
                      name="extraVal"
                      label="Verdi"
                      inputMode={'numeric'}
                      placeholder="Skriv inn verdi..."
                      required
                    />
                  )}

                  <Button type="submit" size="small">
                    Legg til filter
                  </Button>
                </>
              )}
            </form>
          </HStack>
        </Modal.Body>
      </Modal>
    </div>
  );
}
