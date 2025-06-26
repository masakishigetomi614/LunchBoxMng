'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });


        if (res.ok) {
            // Cookie を反映させるために完全リロードを行う（router.push では反映されない）
            window.location.replace('/home');
        } else {
            const result = await res.json();
            setError(result.message || 'ログイン失敗');
        }
    };

    return (
        <div>
            <h2>ログインページ</h2>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ユーザー名"
            />
            <br />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード"
            />
            <br />
            <button onClick={handleLogin}>ログイン</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
