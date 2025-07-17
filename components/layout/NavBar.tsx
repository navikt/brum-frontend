'use client'
import { BarChartIcon } from "@navikt/aksel-icons";
import { InternalHeader, Spacer, Button, Theme } from "@navikt/ds-react";
import { ThemeButton } from "./ThemeButton";
import { UserMenu } from "./UserMenu";
import { useBruker } from "@/hooks/useBrukerData";
import Image from "next/image";

export default function NavBar() {
  const user = useBruker();
  return (
    <InternalHeader className="px-4" data-color ="Blue-100">
      <InternalHeader.Title href="/">
        <Image
          src="/StatBear.svg"
          alt="Brum logo"
          width={32}
          height={32}
          style={{
            height: '2rem',
            width: 'auto',
            verticalAlign: 'middle',
            marginRight: '0.5rem',
          }}
        />
        Brum
      </InternalHeader.Title>

      <Spacer />
      {user ? (
        <UserMenu user={user} />
      ) : (
        <Button as="a" href="/oauth2/login" variant="secondary-neutral">
          Logg inn
        </Button>
      )}
      <ThemeButton />
    </InternalHeader>
  );
}

export function DummyBar() {
  return (
    <Theme>
      <InternalHeader>
        <InternalHeader.Title href="/">
          <BarChartIcon title="a11y-title" fontSize="1.5rem" />
          Brum
        </InternalHeader.Title>
      </InternalHeader>
    </Theme>
  );
}
