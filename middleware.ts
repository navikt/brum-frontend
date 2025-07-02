import { NextResponse, NextRequest } from 'next/server';
import { logger } from '@navikt/next-logger';
import { getOboToken } from '@/common/utils/getOboToken';
import { string } from 'zod';

// oauth2 login path
const NAIS_LOGIN_PATH = '/oauth2/login';

export async function middleware(request: NextRequest) {
  console.log(`Middleware: Request received for ${request.nextUrl.pathname}`);
  logger.warn(`Middleware: Request received for ${request.nextUrl.pathname}`);
  const { pathname, origin, href } = request.nextUrl;
  const userToken = request.headers.get('authorization')?.replace('Bearer ', '');

  // Sjekk om path er offentlig eller login path
  const isPublicPath = pathname === '/';
  const isNaisLoginPath = pathname.startsWith(NAIS_LOGIN_PATH);

  if (isPublicPath || isNaisLoginPath) {
    console.log(`Middleware: Public/Login path '${pathname}'. Proceeding.`);
    logger.warn(`Middleware: Public/Login path '${pathname}'. Proceeding.`);
    return NextResponse.next();
  }

  try {
    logger.warn(`Middleware: Checking session for protected path '${pathname}'.`);
    console.log(`Middleware: Checking session for protected path '${pathname}'.`);

    // Hent session data from the OAuth2 session endpoint
    //const sessionUrl = `${request.nextUrl.origin}/oauth2/session`;
    //logger.warn(`session url ${sessionUrl}`);

    const introspectionUrl = process.env.NAIS_TOKEN_INTROSPECTION_ENDPOINT;
    if (!introspectionUrl) {
      throw new Error("NAIS_TOKEN_INTROSPECTION_ENDPOINT is not defined in environment variables");
    }
    const checkIntrospectionEndpoint = await fetch(introspectionUrl,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'identity_provider': "azuread",
        'token': userToken
      })
    });

    const checkIntrospectionEndpointBody = await checkIntrospectionEndpoint.json()

    logger.warn(checkIntrospectionEndpoint)
    if(!checkIntrospectionEndpointBody.active){
      console.log(`Middleware: User not authenticated for ${pathname}. Redirecting to login.`);
      logger.warn(`Middleware: User not authenticated for ${pathname}. Redirecting to login.`);
      // Hvis ikke sesion ikke er aktiv, omdiriger til login
      const loginUrl = new URL(NAIS_LOGIN_PATH, origin);

      loginUrl.searchParams.set('redirect_uri', href);
      return NextResponse.redirect(loginUrl);
    }
    // Hvis session er aktiv, fortsett til den beskyttede siden
    console.log(`Middleware: User authenticated for ${pathname}. Proceeding.`);
    logger.warn(`Middleware: User authenticated for ${pathname}. Proceeding.`);
    return NextResponse.next();
  } catch (error) {
    // Hvis det oppstår en feil under sjekk av session, logg feilen og omdiriger til login
    console.error(`Middleware: Error checking session for ${pathname}:`, error);
    logger.warn(`Middleware: Error checking session for ${pathname}:`, error);
    const loginUrl = new URL(NAIS_LOGIN_PATH, origin);
    loginUrl.searchParams.set('redirect_uri', href);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|oauth2/login|oauth2/session|api/auth|api/metrics|api/logger|api/userInfo).*)',
  ],
};
