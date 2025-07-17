import { BrumData } from '../types/brumData';
import { FilterType } from '../types/filterTypes';

export function filtrerData(filter: FilterType, data: BrumData): BrumData {
  return {
    ...data,
    data: data.data.filter(
      (d) =>
        filter.avdelinger.includes(d.avdeling) &&
        filter.innsatsgrupper.includes(d.innsatsgruppe) &&
        d.verdier.every((v, i) => v >= filter.tiltakMin[i] && v <= filter.tiltakMaks[i]),
    ),
  };
}
