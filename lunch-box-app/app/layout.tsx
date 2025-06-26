export const runtime = 'nodejs';

import '../styles/globals.css';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import jwt from 'jsonwebtoken';
import { ReactNode } from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || '';

export default async function RootLayout({ children }: { children: ReactNode }) {
    const supabase = createServerComponentClient({ cookies });

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    let username = '';

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { user_id: string };

            const { data: userRecord, error } = await supabase
                .from('users')
                .select('display_name')
                .eq('user_id', decoded.user_id)
                .single();

            if (userRecord && !error) {
                username = userRecord.display_name;
            }
        } catch (err) {
            console.error('JWT検証失敗:', err);
        }
    }

    return (
        <html lang="ja">
            <body>
                <Header username={username || undefined} />
                <main style={{ minHeight: '80vh', padding: '2rem' }}>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
