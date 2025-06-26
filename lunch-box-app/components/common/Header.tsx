'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function Header({ username }: { username?: string }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleLogout = async () => {
        await fetch('/api/logout', { method: 'POST' });
        window.location.href = '/login';
    };

    const handleLogin = () => {
        router.push('/login');
    };

    const isLoginPage = pathname === '/login';

    return (
        <header className="site-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>ヘッダー</span>
            <div>
                {username && <span style={{ marginRight: '1rem' }}>ようこそ, {username} さん</span>}
                {!isLoginPage && (
                    <button onClick={username ? handleLogout : handleLogin}>
                        {username ? 'ログアウト' : 'ログイン'}
                    </button>
                )}
            </div>
        </header>
    );
}
