import { NextResponse, type NextRequest } from 'next/server';

// Middleware to handle token refresh
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  if (pathname === '/auth/login' || pathname === '/') {
    return NextResponse.next(); // Login page or landing page accessed, skipping middleware.
  }

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url)); //No refresh token found, redirecting to login.
  }

  if (!accessToken) {
    const headers = new Headers({
      Cookie: `${refreshToken.name}=${refreshToken.value}; `,
    });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          method: 'POST',
          headers,
        },
      );

      if (response.ok) {
        console.log('refreshed');
        const cookies = response.headers.get('set-cookie');

        if (cookies) {
          const nextResponse = NextResponse.next();
          nextResponse.headers.set('Set-Cookie', cookies);
          return nextResponse;
        }
      }
    } catch (e) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo.svg,  sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|sitemap.xml|robots.txt).*)',
  ],
};
