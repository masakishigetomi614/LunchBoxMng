// app/home/page.tsx
import Link from 'next/link';

export default function Home() {
    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Next.js App Router サンプル</h1>
            <p>App Router と機能分割構成の例です。</p>
            <Link href="/api/hello">API を呼び出す →</Link>
        </main>
    );
}