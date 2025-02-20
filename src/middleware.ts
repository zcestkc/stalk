var setCookie = require('set-cookie-parser');
import { NextResponse, type NextRequest } from 'next/server';

// Middleware to handle token refresh NOTE: it is for routes only
export async function middleware(request: NextRequest) {
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
        const setCookieHeader = response.headers.get('set-cookie');

        if (setCookieHeader) {
          const nextResponse = NextResponse.next();
          console.log(setCookie.parse(setCookieHeader));
          const cookies = parseSetCookieHeader(setCookieHeader);
          cookies.forEach((cookie) => {
            nextResponse.cookies.set(cookie.name, cookie.value, cookie.options);
          });
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

function parseSetCookieHeader(
  setCookieHeader: string,
): Array<{ name: string; value: string; options: any }> {
  const cookies = [];

  // Split by ", " but keep inside quotes safe (to prevent breaking on encoded values)
  const cookiePairs = setCookieHeader.split(/, (?=[^;]+=[^;])/);

  cookiePairs.forEach((cookieString) => {
    const parts = cookieString.split('; ');
    const [name, value] = parts[0].split('=');

    const options: any = {};

    parts.slice(1).forEach((option) => {
      const [key, val] = option.split('=');

      switch (key.toLowerCase()) {
        case 'expires':
          options.expires = new Date(val);
          break;
        case 'path':
          options.path = val;
          break;
        case 'samesite':
          options.sameSite = val.toLowerCase();
          break;
        case 'httponly':
          options.httpOnly = true;
          break;
      }
    });

    cookies.push({ name, value, options });
  });

  return cookies;
}
