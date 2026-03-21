import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const AUTH_ROUTES = ['/perfil', '/diario', '/meu-santo', '/comunidade'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route requires authentication
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthRoute) {
    // Check for session token cookie
    const hasSession =
      request.cookies.has('authjs.session-token') ||
      request.cookies.has('__Secure-authjs.session-token');

    if (!hasSession) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/perfil/:path*', '/diario/:path*', '/meu-santo/:path*', '/comunidade/:path*'],
};
