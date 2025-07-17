'use client';
import BrumChart from '@/components/chart/BrumChart';
import BrumTable from '@/components/data/BrumTable';
import Datameny from '@/components/data/Datameny';
import { useUkeData } from '@/hooks/useUkedata';
import { BrumData } from '@/lib/types/brumData';
import { DataOptionsProps } from '@/lib/types/propTypes';
import { GuidePanel, Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import { Page } from '@navikt/ds-react/Page';
import { useEffect, useState } from 'react';


export default function Dashboard() {
  const [data, setData] = useState<BrumData | null>(null);
  const [dataParams, setDataParams] = useState<DataOptionsProps>({
    aar: 2025,
    uke: 27,
  }); // hardcoded as this is the end of our mock data

  useUkeData({ setData, dataParams });

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

          <HGrid
            gap="8"
            align="start"
            columns={{
              md: '1fr', // Medium: stacked
              lg: '2fr 1fr', // Large: side by side
            }}
          >
            <VStack>
              <Datameny dataParams={dataParams} setDataParams={setDataParams} />

              <BrumChart data={data} />
            </VStack>
            <div>
              <BrumTable data={data!} />
            </div>
          </HGrid>
        </VStack>
      </Page.Block>
    </Page>
  );
}