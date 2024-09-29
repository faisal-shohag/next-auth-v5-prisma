import { auth } from '@/auth';
import SettingPage from './SettingPage';
import { redirect } from 'next/navigation';
import getSession from '@/lib/getSession';
export const metadata = {
    title: 'Settings',
    description: 'Settings page',
}

export default async function Page(){
    const session = await getSession()
    const user = session?.user;
    if(!user) {
        redirect("/api/auth/signin?callbackUrl=/settings")
    }
    return <SettingPage user={user}/>
};
