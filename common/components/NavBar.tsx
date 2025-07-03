'use client'
import { InternalHeader, InternalHeaderTitle, InternalHeaderUser, InternalHeaderUserButton } from "@navikt/ds-react/InternalHeader";
import { useUser } from "../hooks/getUser";
import { UserMenu } from "./UserMenu";
import { PersonIcon } from "@navikt/aksel-icons";
import { ThemeButton } from "./themeButton";


export default function NavBar() {
  const user = useUser();

  return (
    <InternalHeader className="px-4">
      <InternalHeaderTitle as="a" href="/">
        Brum
      </InternalHeaderTitle>

      <InternalHeaderUser name={""} />

      {user && (
        <InternalHeaderUser name={user.username} description={user.oid}>
          <InternalHeaderUserButton name={user.username} aria-label="Åpne brukermeny">
            <PersonIcon aria-hidden />
          </InternalHeaderUserButton>
          <UserMenu user={user} />
        </InternalHeaderUser>
      )}
      
    </InternalHeader>
  );
}
