import { BrumData } from '../types/brumData';
import { FilterType } from '../types/filterTypes';

export function filtrerData(filter: FilterType, data: BrumData): BrumData {
  const selectedIndices = filter.selectedTiltak
    .map((selected, index) => (selected ? index : -1))
    .filter((index) => index !== -1);

  const filteredHeaders = selectedIndices.map((index) => data.headers[index]);

  const filteredData = data.data
    .filter(
      (d) =>
        filter.avdelinger.includes(d.avdeling) &&
        filter.innsatsgrupper.includes(d.innsatsgruppe) &&
        selectedIndices.every((i) => {
          const value = d.verdier[i];
          return value >= filter.tiltakMin[i] && value <= filter.tiltakMaks[i];
        }),
    )
    .map((row) => ({
      ...row,
      verdier: selectedIndices.map((index) => row.verdier[index]),
    }));

  return {
    ...data,
    headers: filteredHeaders,
    data: filteredData,
  };
}
