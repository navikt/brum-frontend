'use client';
import BrumChart from '@/common/components/BrumChart';
import BrumTable from '@/common/components/BrumTable';
import DataMenu from '@/common/components/DataMenu';
import { BrumData } from '@/common/types/brumData';
import { DataOptionsProps } from '@/common/types/propTypes';
import useFetchUkeAntall from '@/common/utils/fetchUkeAntall';
import { GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { Page } from '@navikt/ds-react/Page';
import { useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<BrumData | null>(null);
  const [dataParams, setDataParams] = useState<DataOptionsProps>({ aar: '2025', uke: '27' });

  useFetchUkeAntall({ setData, dataParams });

  return (
    <Page>
      <Page.Block width="2xl" as="main" aria-label="Dashboard hovedinnhold">
        <VStack gap="8" align="center">
          <Heading level="1" size="xlarge" align="center" aria-label="Dashboard overskrift">
            Dashboard
          </Heading>
          <GuidePanel aria-label="Bruksanvisning for dashboard">
            Her ser du statistikk og nøkkeltall for tiltak. Bruk menyen til venstre for å velge
            datasett og filtrere informasjonen som vises i grafen.
          </GuidePanel>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '2rem',
              width: '100%',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
            }}
            aria-label="Dashboard innhold"
            role="region"
          >
            <div style={{ minWidth: 220, maxWidth: 300, flex: '1 1 220px' }} aria-label="Datameny">
              <DataMenu dataParams={dataParams} setDataParams={setDataParams} />
            </div>
            <div style={{ flex: 3, minWidth: 0 }} aria-label="Statistikk graf">
              <BrumChart data={data} />
            </div>
          </div>
          <div style={{ width: '100%' }} aria-label="Tabell med nøkkeltall">
            <BrumTable data={data!} />
          </div>
        </VStack>
      </Page.Block>
    </Page>
  );
}
