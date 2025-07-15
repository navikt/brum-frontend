'use client';

import { VStack, Select, Button } from '@navikt/ds-react';
import { getISOWeek } from 'date-fns';
import { useState } from 'react';
import { getWeeksForYear } from '../utils/dateUtils';

const Datameny = () => {
  const [dataParams, setDataParams] = useState<{ aar: number | null; uke: number | null }>({
    aar: new Date().getFullYear(),
    uke: getISOWeek(new Date()),
  });

  return (
    <div>
      <DataSetSelect
        valgtÅr={dataParams.aar}
        valgtUke={dataParams.uke}
        setValgtÅr={(year) => setDataParams((prev) => ({ ...prev, aar: year }))}
        setValgtUke={(week) => setDataParams((prev) => ({ ...prev, uke: week }))}
      />
    </div>
  );
};

const MinYear = 2022;
const currentYear = new Date().getFullYear();

type DataSetSelectProps = {
  valgtÅr: number | null;
  valgtUke: number | null;
  setValgtÅr: (year: number | null) => void;
  setValgtUke: (week: number | null) => void;
};

const DataSetSelect = ({ valgtÅr, valgtUke, setValgtÅr, setValgtUke }: DataSetSelectProps) => {
  const weeksForSelectedYear = getWeeksForYear(valgtÅr ?? currentYear);

  const handleÅrChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValgtÅr(Number(e.target.value));
    setValgtUke(null);
  };

  const handleUkeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValgtUke(Number(e.target.value));
  };

  return (
    <form>
      <VStack gap="4">
        <Select label="Velg år" value={valgtÅr ?? ''} onChange={handleÅrChange}>
          <option value="" disabled>
            Velg år
          </option>
          {Array.from({ length: currentYear - MinYear + 1 }, (_, i) => MinYear + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        {valgtÅr && (
          <Select label="Velg uke" value={valgtUke ?? ''} onChange={handleUkeChange}>
            <option value="" disabled>
              Velg uke
            </option>
            {weeksForSelectedYear.map((uke) => (
              <option key={uke} value={uke}>
                Uke {uke}
              </option>
            ))}
          </Select>
        )}
        <Button type="submit" size="small">
          Legg til filter
        </Button>
      </VStack>
    </form>
  );
};

export default Datameny;
