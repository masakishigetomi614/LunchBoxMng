import { NextResponse } from 'next/server';

export async function POST() {
    const res = NextResponse.json({ message: 'ログアウト完了' });

    res.cookies.set('token', '', {
        httpOnly: true,
        path: '/',
        expires: new Date(0),
    });

    return res;
}
