import {NextResponse} from 'next/server';

const loggedIn = async (token) => {
    if (!token) return false;

    const authResponse = await fetch(`${process.env.API_URL}/auth/logincheck`, {
        method: "GET", headers: {"Content-Type": "application/json", "Authorization": `Bearer ${token.value}`}
    })

    return authResponse.ok
}

export async function middleware(request) {
    const {pathname} = request.nextUrl;
    const authToken = request.cookies.get('auth_token');

    if (pathname === '/' && !await loggedIn(authToken))
        return NextResponse.redirect(new URL('/auth/login', request.url));

    if (pathname.startsWith('/auth') && await loggedIn(authToken))
        return NextResponse.redirect(new URL('/', request.url));

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/',
        '/auth/:path*',
    ],
};