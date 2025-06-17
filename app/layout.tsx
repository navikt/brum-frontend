import type { Metadata } from "next";
import Script from "next/script";
import "@navikt/ds-css";
import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import { Page } from "@navikt/ds-react";

export const metadata: Metadata = {
  title: "Brum",
  description: "Frontend for Brum",
};

const RootLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const Decorator = await fetchDecoratorReact({
    env: "prod",
  });

  return (
    <html lang="no">
      <head>
        <Decorator.HeadAssets />
      </head>
      <body>
        <Page>
          <Decorator.Header />
          {children}
          <Decorator.Scripts loader={Script} />
        </Page>
      </body>
    </html>
  );
};

export default RootLayout;