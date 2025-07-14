'use client';
import BrumChart from '@/common/components/BrumChart';
import BrumTable from '@/common/components/BrumTable';
import DataMenu from '@/common/components/DataMenu';
import { BrumData } from '@/common/types/brumData';
import { DataOptionsProps } from '@/common/types/propTypes';
import { useFetchTestData } from '@/common/utils/fetchTestData';
import fetchUkeAntall from '@/common/utils/fetchUkeAntall';
import { Heading, VStack } from '@navikt/ds-react';
import { Page } from '@navikt/ds-react/Page';
import { useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<BrumData | null>(null);
  const [dataParams, setDataParams] = useState<DataOptionsProps>({ dataSet: 'Mini' });

  useFetchTestData(setData, dataParams);

  fetchUkeAntall('2025', '27');

  return (
    <Page>
      <Page.Block width="2xl" as="main">
        <VStack gap="3" margin="2" align="center">
          <Heading level="1" size="xlarge">
            Dashboard
          </Heading>
        </VStack>
        <BrumChart data={data} />
        <DataMenu dataParams={dataParams} setDataParams={setDataParams} />
        <BrumTable data={data!} />
      </Page.Block>
    </Page>
  );
}
