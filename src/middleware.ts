import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
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
    // console.log('Login page accessed, skipping middleware.');
    return NextResponse.next();
  }

  if (!refreshToken) {
    // console.log('No refresh token found, redirecting to login.');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (!accessToken) {
    const newToken = await refreshAccessToken(refreshToken);

    if (newToken) {
      //   console.log('Token refreshed successfully!');
      return NextResponse.next();
    } else {
      //   console.log('Token refresh failed, redirecting to login.');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

async function refreshAccessToken(refreshToken: RequestCookie) {
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
      const cookies = response.headers.get('set-cookie');
      if (cookies) {
        const nextResponse = NextResponse.next();
        nextResponse.headers.set('Set-Cookie', cookies);
        return nextResponse;
      }
      return NextResponse.next();
    }

    return null;
  } catch (error) {
    return null;
  }
}
