import { NextRequest, NextResponse } from "next/server";

const isAdminRoute = (pathname: string) => {
  return pathname.startsWith('/admin');
};

const isAuthRoute = (pathname: string) => {
  return pathname.startsWith('/auth');
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const salt = req.cookies.get('salt')?.value;

  if (isAdminRoute(pathname)) {
    const response = await fetch(`${req.nextUrl.origin}/api/getUser/${salt}`);
    const user = await response.json();
    if (response.status !== 200) return NextResponse.redirect(new URL('/auth/login', req.url));

    if (user.is_admin === 1) console.log('admin');
    return NextResponse.next();
  } else if (isAuthRoute(pathname)) {
    console.log('isAuthRoute');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth/:path*', '/api/getUser/:path*']
};