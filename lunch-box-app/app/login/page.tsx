'use client';

import { useState, useEffect } from 'react';

export default function LoginPage() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // トークンがクッキーにあるかをチェック（簡易版）
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, password }),
        });

        const result = await res.json();
        console.log('Status:', res.status);
        console.log('Result:', result);

        if (!res.ok) {
            setError(result.error || 'ログインに失敗しました');
        } else {
            window.location.href = '/home';
        }
    };

    const handleLogout = () => {
        document.cookie = 'token=; Max-Age=0; path=/;';
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <div>
            <h2>ログイン</h2>
            {isLoggedIn ? (
                <button onClick={handleLogout}>ログアウト</button>
            ) : (
                <>
                    <input
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="ユーザーID"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="パスワード"
                    />
                    <button onClick={handleLogin}>ログイン</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </>
            )}
        </div>
    );
}
