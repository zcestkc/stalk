import {
  RequestCookies,
  ResponseCookies,
} from 'next/dist/compiled/@edge-runtime/cookies';
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

        if (cookies) {
          const nextResponse = NextResponse.next();
          nextResponse.headers.set('Set-Cookie', cookies);
          applySetCookie(request, nextResponse);
          return nextResponse;
        }
      }
    } catch (e) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

/**
 * Copy cookies from the Set-Cookie header of the response to the Cookie header of the request,
 * so that it will appear to SSR/RSC as if the user already has the new cookies.
 */
function applySetCookie(req: NextRequest, res: NextResponse) {
  // 1. Parse Set-Cookie header from the response
  const setCookies = new ResponseCookies(res.headers);

  // 2. Construct updated Cookie header for the request
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);
  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  // 3. Set up the “request header overrides” (see https://github.com/vercel/next.js/pull/41380)
  //    on a dummy response
  // NextResponse.next will set x-middleware-override-headers / x-middleware-request-* headers
  const dummyRes = NextResponse.next({ request: { headers: newReqHeaders } });

  // 4. Copy the “request header overrides” headers from our dummy response to the real response
  dummyRes.headers.forEach((value, key) => {
    if (
      key === 'x-middleware-override-headers' ||
      key.startsWith('x-middleware-request-')
    ) {
      res.headers.set(key, value);
    }
  });
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg|sitemap.xml|robots.txt).*)',
  ],
};
