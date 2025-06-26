'use client';

import { useState } from 'react';

export default function LoginPage() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, password }),
        });

        const result = await res.json();

        if (!res.ok) {
            setError(result.error || 'ログインに失敗しました');
        } else {
            window.location.href = '/home';
        }
    };

    return (
        <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 py-12 min-h-[600px]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">ログイン</h2>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-1 text-gray-700">ユーザーID</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="ユーザーID"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-semibold mb-1 text-gray-700">パスワード</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="パスワード"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-200"
                >
                    ログイン
                </button>

                {error && <p className="mt-4 text-center text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
}
