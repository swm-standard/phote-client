import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  // console.log('test'); 최소 4번씩을실행되는데;;

  const hasAccess = request.cookies.has('accessToken');
  const hasRefresh = request.cookies.has('refreshToken');
  const authenticated = hasAccess || hasRefresh;
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    return authenticated
      ? NextResponse.redirect(new URL('/workbook', request.url))
      : NextResponse.next();
  }

  return authenticated
    ? NextResponse.next()
    : NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/((?!redirect|_next/static|_next/image|favicon.ico|api).*)'],
};
