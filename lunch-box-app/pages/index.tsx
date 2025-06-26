// pages/index.tsx
import Link from 'next/link';
import { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
            <h1>Next.js + TypeScript サンプルアプリ</h1>
            <p>これは Next.js の TypeScript テンプレートで作成したサンプルです。</p>
            <Link href="/api/hello">
                API を呼び出す →
            </Link>
        </main>
    );
};

export default Home;