import { NextResponse, type NextRequest } from 'next/server';

// Middleware to handle token refresh
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    // TODO better this
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/logo.svg')
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  if (pathname === '/auth/login') {
    console.log('Login page accessed, skipping middleware.');
    return NextResponse.next();
  }

  if (!refreshToken) {
    console.log('No refresh token found, redirecting to login.');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (!accessToken) {
    const newToken = await refreshAccessToken();

    if (newToken) {
      console.log('Token refreshed successfully.');
      return NextResponse.next();
    } else {
      console.log('Token refresh failed, redirecting to login.');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  return NextResponse.next();
}

async function refreshAccessToken() {
  try {
    const response = await fetch(
      'http://localhost:5030/api/auth/refresh-token',
      {
        method: 'POST',
        credentials: 'include', // Ensures refresh token is included automatically
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      return { accessToken: data.accessToken };
    }

    console.error('Failed to refresh token, ', response.status);
    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}
