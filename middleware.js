import { NextResponse } from 'next/server';

export function middleware(request) {
    const authToken = request.cookies.get('auth_token');
    const { pathname } = request.nextUrl;

    if (authToken && pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!authToken && pathname === '/') {
        return NextResponse.redirect(new URL('/auth/signup', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/auth/:path*',
    ],
};