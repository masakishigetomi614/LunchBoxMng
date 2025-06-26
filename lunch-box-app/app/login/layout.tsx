// app/login/layout.tsx
export const runtime = 'nodejs';

import '../../styles/globals.css'; // ✅ 相対パスを修正
import { ReactNode } from 'react';

export default function LoginLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ja">
            <body>
                <main style={{ minHeight: '80vh', padding: '2rem' }}>{children}</main>
            </body>
        </html>
    );
}
