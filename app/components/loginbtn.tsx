'use client'

import { InternalHeaderButton } from '@navikt/ds-react/InternalHeader';


export default function LoginButton() {
  const handleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL!! + '/auth';
  }

  return (
    <InternalHeaderButton onClick={handleLogin}>
      Login
    </InternalHeaderButton>
  )
}

