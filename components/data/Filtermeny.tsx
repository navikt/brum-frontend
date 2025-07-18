import { FilterMenuProps } from '@/lib/types/filterTypes';
import { FunnelFillIcon } from '@navikt/aksel-icons';
import { ActionMenu, Button } from '@navikt/ds-react';

export default function Filtermeny({ filter, setFilter, tiltak, filterTabRef }: FilterMenuProps) {
  return (
    <ActionMenu>
      <ActionMenu.Trigger>
        <Button
          onClick={(_) => {
            filterTabRef.current?.focus();
          }}
          icon={<FunnelFillIcon />}
          variant="secondary-neutral"
        >
          Filtrer data
        </Button>
      </ActionMenu.Trigger>
      <ActionMenu.Content>
        <ActionMenu.Group label="Avdelinger">
          <ActionMenu.CheckboxItem
            checked={filter.avdelinger.length === filter.allAvdelinger.length}
            onCheckedChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                avdelinger: e ? filter.allAvdelinger : [],
              }))
            }
          >
            Velg alle
          </ActionMenu.CheckboxItem>
          {filter.allAvdelinger.map((d) => (
            <ActionMenu.CheckboxItem
              key={d}
              checked={filter.avdelinger.includes(d)}
              onCheckedChange={(checked) => {
                setFilter((prev) => ({
                  ...prev,
                  avdelinger: checked
                    ? [...prev.avdelinger, d]
                    : prev.avdelinger.filter((item) => item !== d),
                }));
              }}
            >
              {d}
            </ActionMenu.CheckboxItem>
          ))}
        </ActionMenu.Group>
        <ActionMenu.Divider />
        <ActionMenu.Group label="Innsatsgrupper">
          <ActionMenu.CheckboxItem
            checked={filter.innsatsgrupper.length === filter.allInnsatsgrupper.length}
            onCheckedChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                innsatsgrupper: e ? filter.allInnsatsgrupper : [],
              }))
            }
          >
            Velg alle
          </ActionMenu.CheckboxItem>
          {filter.allInnsatsgrupper.map((d) => (
            <ActionMenu.CheckboxItem
              key={d}
              checked={filter.innsatsgrupper.includes(d)}
              onCheckedChange={(checked) => {
                setFilter((prev) => ({
                  ...prev,
                  innsatsgrupper: checked
                    ? [...prev.innsatsgrupper, d]
                    : prev.innsatsgrupper.filter((item) => item !== d),
                }));
              }}
            >
              {d}
            </ActionMenu.CheckboxItem>
          ))}
        </ActionMenu.Group>
        <ActionMenu.Divider />

        <ActionMenu.Group label="Tiltak">
          <ActionMenu.CheckboxItem
            checked={filter.selectedTiltak.every(Boolean)}
            onCheckedChange={(e) =>
              setFilter((prev) => ({
                ...prev,
                selectedTiltak: prev.selectedTiltak.map(() => (e ? true : false)),
              }))
            }
          >
            Velg alle
          </ActionMenu.CheckboxItem>
          {tiltak.map((h, i) => (
            <div key={h}>
              <ActionMenu.CheckboxItem
                checked={filter.selectedTiltak[i]}
                onCheckedChange={(checked) => {
                  setFilter((prev) => ({
                    ...prev,
                    selectedTiltak: prev.selectedTiltak.with(i, checked),
                  }));
                }}
              >
                {h}
              </ActionMenu.CheckboxItem>
            </div>
          ))}
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
}
