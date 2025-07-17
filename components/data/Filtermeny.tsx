import { ActionMenu, BodyShort, Button, HStack, Spacer, TextField } from '@navikt/ds-react';
import { FunnelFillIcon } from '@navikt/aksel-icons';
import { FilterMenuProps } from '@/lib/types/filterTypes';

export function Filtermeny({ filter, setFilter, tiltak, filterTabRef }: FilterMenuProps) {
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
            disabled={filter.avdelinger.length === filter.allAvdelinger.length}
            checked={filter.avdelinger.length === filter.allAvdelinger.length}
            onCheckedChange={(_) =>
              setFilter((prev) => ({
                ...prev,
                avdelinger: filter.allAvdelinger,
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
            disabled={filter.innsatsgrupper.length === filter.allInnsatsgrupper.length}
            checked={filter.innsatsgrupper.length === filter.allInnsatsgrupper.length}
            onCheckedChange={(_) =>
              setFilter((prev) => ({
                ...prev,
                innsatsgrupper: filter.allInnsatsgrupper,
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
            disabled={filter.selectedTiltak.every(Boolean)}
            checked={filter.selectedTiltak.every(Boolean)}
            onCheckedChange={(_) =>
              setFilter((prev) => ({
                ...prev,
                selectedTiltak: prev.selectedTiltak.map(() => true),
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
              {filter.selectedTiltak[i] && (
                <HStack style={{ paddingLeft: '1rem', paddingTop: '0.5rem' }}>
                  <TextField
                    defaultValue={filter.tiltakMin[i] === 0 ? '' : filter.tiltakMin[i]}
                    placeholder="min"
                    inputMode="numeric"
                    htmlSize={3}
                    size="small"
                    label="Min"
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      if (value >= 0) {
                        setFilter((prev) => ({
                          ...prev,
                          tiltakMin: prev.tiltakMin.with(i, value),
                        }));
                      }
                    }}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                    }}
                    hideLabel
                  />
                  <TextField
                    defaultValue={filter.tiltakMaks[i] === Infinity ? '' : filter.tiltakMaks[i]}
                    placeholder="maks"
                    inputMode="numeric"
                    htmlSize={3}
                    size="small"
                    label="Maks"
                    onChange={(e) => {
                      const value = e.target.value === '' ? Infinity : parseInt(e.target.value);
                      if (value >= 0) {
                        setFilter((prev) => ({
                          ...prev,
                          tiltakMaks: prev.tiltakMaks.with(i, value),
                        }));
                      }
                    }}
                    onInput={(e) => {
                      e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
                    }}
                    hideLabel
                  />
                </HStack>
              )}
            </div>
          ))}
        </ActionMenu.Group>
      </ActionMenu.Content>
    </ActionMenu>
  );
}
