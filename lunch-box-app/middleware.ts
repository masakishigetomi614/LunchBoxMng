import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    const publicPaths = ['/', '/login', '/favicon.ico', '/_next', '/api'];

    if (publicPaths.some(path => req.nextUrl.pathname.startsWith(path))) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        await jwtVerify(token, secret);
        return NextResponse.next();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
