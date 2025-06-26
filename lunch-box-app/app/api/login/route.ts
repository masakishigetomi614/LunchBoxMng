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

    // users テーブルからデータ取得
    const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user_id)
        .limit(1);

    if (error || !users || users.length === 0) {
        return NextResponse.json({ error: 'ユーザーが存在しません' }, { status: 401 });
    }

    const user = users[0];

    // ハッシュ化を使わず直接比較
    if (user.password !== password) {
        return NextResponse.json({ error: 'パスワードが正しくありません' }, { status: 401 });
    }

    const token = jwt.sign({ user_id }, JWT_SECRET, { expiresIn: '1h' });

    const res = NextResponse.json({ message: 'ログイン成功' });
    res.cookies.set('token', token, { httpOnly: true, path: '/', maxAge: 3600 });
    return res;
}
