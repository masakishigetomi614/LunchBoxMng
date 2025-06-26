// components/server/UserDisplayName.tsx
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function UserDisplayName() {
    const supabase = createServerComponentClient({ cookies });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (!session) return null;

    const { data: userRecord, error } = await supabase
        .from('users')
        .select('display_name')
        .eq('user_id', session.user.id)
        .single();

    if (error || !userRecord) return <span>ゲスト</span>;

    return <span>{userRecord.display_name} さん</span>;
}
