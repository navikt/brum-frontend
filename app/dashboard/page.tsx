'use client';
import BrumChart from '@/common/components/BrumChart';
import BrumTable from '@/common/components/BrumTable';
import Datameny from '@/common/components/Datameny';
import { BrumData } from '@/common/types/brumData';
import { DataOptionsProps } from '@/common/types/propTypes';
import useFetchUkeAntall from '@/common/utils/fetchUkeAntall';
import { GuidePanel, Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import { Page } from '@navikt/ds-react/Page';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<BrumData | null>(null);
  const [chartData, setChartData] = useState<BrumData | null>(null);
  const [filterApplied, setFilterApplied] = useState(false);

  const [dataParams, setDataParams] = useState<DataOptionsProps>({
    aar: 2025,
    uke: 27,
  }); // hardcoded as this is the end of our mock data

  useFetchUkeAntall({ setData, dataParams });

  useEffect(() => {
    setChartData(data);
  }, [data]);

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
              <BrumChart chartData={chartData} filterApplied={filterApplied} />
            </VStack>
            <div>
              <BrumTable
                data={data!}
                setFilterApplied={setFilterApplied}
                setChartData={setChartData}
              />
            </div>
          </HGrid>
        </VStack>
      </Page.Block>
    </Page>
  );
}