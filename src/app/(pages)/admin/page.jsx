import { redirect } from "next/navigation";
import getSession from "@/lib/getSession";
export const metadata = {
    title: "Admin"
}

export default async function AdminLayout() {
    const session = await getSession()
    const user = session?.user;

    if(!user) {
       redirect('/api/auth/signin')
    }

    if(user.role !== 'admin') {
        return <main className="max-auto my-10">
            <p className="text-center">You are not authorized to view this page!</p>
        </main>
    }

    return (
        <main className="mx-auto my-10 space-y-3">
            <h1 className="text-center text-xl font-bold">Admin Layout</h1>
            <p className="text-center">Welcome, admin!</p>
        </main>
    )
}