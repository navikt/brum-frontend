import { HighchartsOptionsType } from '@highcharts/react';
import { UpdateSeriesProps } from '../types/propTypes';

/**
 * Oppdaterer chart-serier med ny data/grafinstillinger
 *
 * @param data - Data som skal vises i chart
 * @param setChartOptions - Setter for chart-opsjoner
 * @param setLoading - Setter for loading-state
 */
export function updateChartSeries({
  data,
  setChartOptions,
  setLoading,
  filterApplied,
}: UpdateSeriesProps) {
  if (!data) {
    return;
  }

  // denne kalles kun fra en useeffect i chartoptions

  /* litt corny løsninger her, men det å bruke datamodulen for å innputte data til grafen gjør at vi kan gjøre valg for hele grafen enkelt via chartoptions, som f.eks. type 
  i chartoptions.chart, heller enn å måtte individuelt sette det for hver serie. dette gjør at vi ikke trenger å legge til masse ny state for at sånt skal kunne styres av bruker */

  const categories = ['', ...data.headers]; // "" først for å aligne navna på kategoriene med resten av verdiene

  const newOptions = filterApplied
    ? {
        data: {
          columns: [
            categories, // denne må først for å gi navn til alle kategoriene
            ...data.data.map((d) => [`${d.avdeling} (${d.innsatsgruppe})`, ...d.verdier]), // første verdi i arrayet blir navnet på serien
          ],
        },
      }
    : {
        data: {
          columns: [
            categories,
            ...data.dataAvdeling.map((d) => [
              d.avdeling,
              ...d.verdier.map((v) => (v === 0 ? null : v)),
            ]),
          ],
        },
      };

  setChartOptions((prev: HighchartsOptionsType) => ({
    ...prev,
    ...newOptions,
  }));
  setLoading(false);
}
