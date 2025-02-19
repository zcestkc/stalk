import { NextResponse, type NextRequest } from 'next/server';

// Middleware to handle token refresh NOTE: it is for routes only
export async function middleware(request: NextRequest) {
  //   return NextResponse.next();
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/auth') || pathname === '/') {
    return NextResponse.next(); // Login page or landing page accessed, skipping middleware.
  }

  const refreshToken = request.cookies.get('refreshToken');
  if (!refreshToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const accessToken = request.cookies.get('accessToken');
  if (!accessToken) {
    try {
      console.log(
        'refreshing in middleware with old cookie ',
        refreshToken.value,
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        {
          method: 'POST',
          headers: {
            Cookie: `${refreshToken.name}=${refreshToken.value}; `,
          },
        },
      );

      if (response.ok) {
        const cookies = response.headers.get('set-cookie');
        console.log(
          'refreshed in middleware, new cookie',
          cookies?.split('refreshToken=')[1].split(';')[0],
        );

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
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|sitemap.xml|robots.txt).*)',
  ],
};
