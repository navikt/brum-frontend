import { NextResponse, NextRequest } from 'next/server';


// oauth2 login path
const NAIS_LOGIN_PATH = '/oauth2/login';

export async function middleware(request: NextRequest) {
  console.log(`Middleware: Request received for ${request.nextUrl.pathname}`);
  const { pathname, origin, href } = request.nextUrl;


  // Sjekk om path er offentlig eller login path
  const isPublicPath = (pathname === '/')
  const isNaisLoginPath = pathname.startsWith(NAIS_LOGIN_PATH);

  if (isPublicPath || isNaisLoginPath) {
    console.log(`Middleware: Public/Login path '${pathname}'. Proceeding.`);
    return NextResponse.next();
  }

  try {
    console.log(`Middleware: Checking session for protected path '${pathname}'.`);
    
    // Hent session data from the OAuth2 session endpoint
    const sessionResponse = await fetch(`${origin}/oauth2/session`);
    const sessionData = await sessionResponse.json();

    if (!sessionData.session?.active) {
    
      console.log(`Middleware: User not authenticated for ${pathname}. Redirecting to login.`);

      // Hvis ikke sesion ikke er aktiv, omdiriger til login
      const loginUrl = new URL(NAIS_LOGIN_PATH, origin);
    
      loginUrl.searchParams.set('redirect_uri', href);

      return NextResponse.redirect(loginUrl);
    }

    // Hvis session er aktiv, fortsett til den beskyttede siden
    console.log(`Middleware: User authenticated for ${pathname}. Proceeding.`);
    return NextResponse.next();

  } catch (error) {
    // Hvis det oppstår en feil under sjekk av session, logg feilen og omdiriger til login
    console.error(`Middleware: Error checking session for ${pathname}:`, error);
    const loginUrl = new URL(NAIS_LOGIN_PATH, origin);
    loginUrl.searchParams.set('redirect_uri', href);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|oauth2/login|api/auth).*)'],
};