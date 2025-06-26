// app/layout.tsx
import '../styles/globals.css';  // 相対パスを修正
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}
