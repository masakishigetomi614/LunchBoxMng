import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    const { user_id, password } = await req.json();

    // users テーブルからユーザー取得
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user_id)
        .limit(1);

    if (error || !users || users.length === 0) {
        return NextResponse.json({ error: 'ユーザーが存在しません' }, { status: 401 });
    }

    const user = users[0];

    // パスワードをそのまま比較（仮のロジック）
    if (user.password !== password) {
        return NextResponse.json({ error: 'パスワードが正しくありません' }, { status: 401 });
    }

    // ✅ JWT の payload 定義
    const payload = { user_id: user.user_id };

    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '7d', // 有効期限 7日
    });

    // ✅ レスポンスと Cookie セット（7日 = 7 * 24 * 60 * 60）
    const res = NextResponse.json({ message: 'ログイン成功' });
    res.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });

    return res;
}
