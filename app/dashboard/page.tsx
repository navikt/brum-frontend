'use client';
import BrumChart from '@/common/components/BrumChart';
import BrumTable from '@/common/components/BrumTable';
import DataMenu from '@/common/components/DataMenu';
import { BrumData } from '@/common/types/brumData';
import { DataOptionsProps } from '@/common/types/propTypes';
import useFetchUkeAntall from '@/common/utils/fetchUkeAntall';
import { Heading, HGrid, HStack, VStack } from '@navikt/ds-react';
import { Page } from '@navikt/ds-react/Page';
import { useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<BrumData | null>(null);
  const [dataParams, setDataParams] = useState<DataOptionsProps>({ aar: '2025', uke: '27' });

  useFetchUkeAntall({ setData, dataParams });

  return (
    <Page>
      <Page.Block width="2xl" as="main">
        <VStack gap="8">
          <Heading level="1" size="xlarge" align="center">
            Dashboard
          </Heading>

          <HStack gap="8" align="start">
            <div style={{ flex: 1 }}>
              <BrumChart data={data} />
            </div>
          </HStack>

          <div style={{ minWidth: '220px' }}>
            <DataMenu dataParams={dataParams} setDataParams={setDataParams} />
          </div>

          <BrumTable data={data!} />
        </VStack>
      </Page.Block>
    </Page>
  );
}
