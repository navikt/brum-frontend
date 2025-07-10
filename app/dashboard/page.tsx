'use client';
import BrumChart from '@/common/components/BrumChart';
import BrumTable from '@/common/components/BrumTable';
import DataMenu from '@/common/components/DataMenu';
import { DataOptionsProps } from '@/common/types/propTypes';
import { useFetchTestData } from '@/common/utils/fetchTestData';
import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { Page } from '@navikt/ds-react/Page';
import { useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState<string>('');
  const [dataParams, setDataParams] = useState<DataOptionsProps>({ dataSet: 'Mini.csv' });

  useFetchTestData(setData, dataParams);

  return (
    <Page>
      <Page.Block width="2xl" as="main">
        <VStack gap="3" margin="2" align="center">
          <Heading level="1" size="xlarge">
            Dashboard
          </Heading>
          <BodyShort>Velkommen til Brum Dashboard!</BodyShort>
          <BodyShort>Her kan du se statistikk og annen informasjon.</BodyShort>
        </VStack>
        <BrumChart data={data} />
        <DataMenu dataParams={dataParams} setDataParams={setDataParams} />
        <BrumTable data={data} />
      </Page.Block>
    </Page>
  );
}
