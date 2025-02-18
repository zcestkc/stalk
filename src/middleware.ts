import { NextResponse, type NextRequest } from 'next/server';

// Middleware to handle token refresh
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/logo.svg')
  ) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  // Allow login page to be accessed without redirection
  if (pathname === '/auth/login') {
    console.log('Login page accessed, skipping middleware.');
    return NextResponse.next();
  }

  // If refresh token is missing, redirect to login
  if (!refreshToken) {
    console.log('No refresh token found, redirecting to login.');
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If access token is missing, try to refresh it
  if (!accessToken) {
    console.log('Access token missing, attempting refresh.');

    const newToken = await refreshAccessToken();

    if (newToken) {
      console.log('Token refreshed successfully.');
      return NextResponse.next();
    } else {
      console.log('Token refresh failed, redirecting to login.');
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  console.log('Access token exists, proceeding.');
  return NextResponse.next();
}

// Refresh the access token using the refresh token
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
