import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'my-secret';

export async function POST(req: Request) {
    const { username, password } = await req.json();

    if (username === 'admin' && password === 'pass') {
        const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });

        const response = NextResponse.json({ success: true });

        response.cookies.set('token', token, {
            httpOnly: true,
            secure: false, // ← localhost では false にする
            path: '/',
            maxAge: 60 * 60,
        });

        return response;
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
