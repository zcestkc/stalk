import { NextResponse, type NextRequest } from 'next/server';

// Middleware to handle token refresh
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith('/app') && !pathname.startsWith('/auth')) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  if (pathname === '/auth/login') {
    return NextResponse.next(); // Login page accessed, skipping middleware.
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
