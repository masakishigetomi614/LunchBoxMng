import '../styles/globals.css';
import Header from '../components/common/Header';
// import Footer from '@/components/common/Footer';
import Footer from '../components/common/Footer';
import { ReactNode } from 'react';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export default async function RootLayout({ children }: { children: ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'my-secret');

    let username = '';

    if (token) {
        try {
            const { payload } = await jwtVerify(token, secret);
            username = payload.username as string;
        } catch (e) {
            console.error('JWT Decode Error', e);
        }
    }

    return (
        <html lang="ja">
            <body>
                <Header username={username} />
                <main style={{ minHeight: '80vh', padding: '2rem' }}>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
