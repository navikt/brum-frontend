'use client';
import BrumChart from '@/common/components/BrumChart';
import BrumTable from '@/common/components/BrumTable';
import Datameny from '@/common/components/Datameny';
import DataMenu from '@/common/components/Datameny';
import { BrumData } from '@/common/types/brumData';
import { DataOptionsProps } from '@/common/types/propTypes';
import useFetchUkeAntall from '@/common/utils/fetchUkeAntall';
import { GuidePanel, Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import { Page } from '@navikt/ds-react/Page';
import { useState } from 'react';

const currentYear = new Date().getFullYear();
const currentWeekNumber = Math.ceil(
  (new Date().getTime() - new Date(new Date().getFullYear(), 0, 1).getTime()) / 604800000,
);

export default function Dashboard() {
  const [data, setData] = useState<BrumData | null>(null);
  const [dataParams, setDataParams] = useState<DataOptionsProps>({
    aar: String(2025),
    uke: String(27),
  });

  useFetchUkeAntall({ setData, dataParams });

  const handleDataMenuChange = (aar: number, uke: number) => {
    setDataParams({ aar: String(aar), uke: String(uke) });
  };

  return (
    <Page>
      <Page.Block width="2xl" as="main">
        <VStack gap="8">
          <Heading level="1" size="xlarge" align="center">
            Dashboard
          </Heading>
          <GuidePanel>
            Her ser du statistikk og nøkkeltall for tiltak. Bruk menyen til venstre for å velge
            datasett og filtrere informasjonen som vises i grafen.
          </GuidePanel>

          <HStack gap="8" align="start">
            <div style={{ minWidth: '220px' }}>
              <Datameny />
            </div>
            <div style={{ flex: 1 }}>
              <BrumChart data={data} />
            </div>
          </HStack>

          <BrumTable data={data!} />
        </VStack>
      </Page.Block>
    </Page>
  );
}
