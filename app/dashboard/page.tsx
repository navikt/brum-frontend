'use client';
import BrumChart from '@/common/components/BrumChart';
import BrumTable from '@/common/components/BrumTable';
import DataMenu from '@/common/components/DataMenu';
import { BrumData } from '@/common/types/brumData';
import { DataOptionsProps } from '@/common/types/propTypes';
import { useFetchTestData } from '@/common/utils/fetchTestData';
import fetchUkeAntall from '@/common/utils/fetchUkeAntall';
import { Page, VStack, Heading, BodyShort } from '@navikt/ds-react';
import { useEffect, useState } from 'react';


export default function Dashboard() {
  const [data, setData] = useState<BrumData | null>(null);
  const [dataParams, setDataParams] = useState<DataOptionsProps>({ dataSet: 'Mini' });
  const [ukeAntall, setUkeAntall] = useState<number | null>(null);

  useFetchTestData(setData, dataParams);

  useEffect(() => {
    async function getUkeAntall() {
      try {
        const result = await fetchUkeAntall(2021, 1);
        setUkeAntall(result);
      } catch (error) {
        console.error("Failed to fetch uke antall", error);
      }
    }

    getUkeAntall();
  }, []);

  return (
    <Page>
      <Page.Block width="2xl" as="main">
        <VStack gap="3" margin="2" align="center">
          <Heading level="1" size="xlarge">Dashboard</Heading>
          <BodyShort>Velkommen til Brum Dashboard!</BodyShort>
          <BodyShort>Her kan du se statistikk og annen informasjon.</BodyShort>
        </VStack>
        <BrumChart data={data} />
        <DataMenu dataParams={dataParams} setDataParams={setDataParams} />
        <BrumTable data={data!} />
        <p>Data fra ukeantall: {ukeAntall ?? "Laster..."}</p>
      </Page.Block>
    </Page>
  );
}
