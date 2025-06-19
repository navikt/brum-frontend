import { Button } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import styles from './page.module.css';
import { ThumbUpIcon } from '@navikt/aksel-icons';

export default function Home() {
  return (
    <main>
      <PageBlock width="md" gutters>
        <Button icon={<ThumbUpIcon title="a11y tittel" />} className={styles.limeButton}>
          Charts
        </Button>
      </PageBlock>
    </main>
  );
}
