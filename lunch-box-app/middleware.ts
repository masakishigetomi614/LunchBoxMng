import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_PATHS = ['/', '/login', '/api/login'];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const isPublic = PUBLIC_PATHS.some(
        (path) => pathname === path || pathname.startsWith(path + '/')
    );

    const token = request.cookies.get('token')?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'my-secret');

    try {
        if (token) {
            await jwtVerify(token, secret);
            return NextResponse.next(); // ログイン済 → 通過
        }

        if (isPublic) {
            return NextResponse.next(); // 公開パス → 通過
        }

        // 未ログイン → ログインページへ
        return NextResponse.redirect(new URL('/login', request.url));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
