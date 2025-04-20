import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createSessionClient } from './app/lib/appwrite';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  try {
    const { account } = await createSessionClient();
    const user = await account.get();
    if (user) {
      if (pathname === '/' || pathname === '/register') {
        return NextResponse.redirect(new URL('/messenger', request.url));
      }

      return NextResponse.next();
    }
    if (pathname !== '/' && pathname !== '/register') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
    if (pathname !== '/' && pathname !== '/register') {
      return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
};
