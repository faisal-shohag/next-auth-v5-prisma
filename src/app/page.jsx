import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main className=" flex flex-col justify-center items-center text-center px-3 py-10">
    <h1 className="text-4xl font-bold">Home Page</h1>
    <h3 className="text-2xl font-semibold">Next Auth with Prisma & Supabase</h3>
    <ul className="list-disc list-inside">
      {
        users.map((user) => (
          <li key={user.id}>
            <Link className="hover:underline" href={`/user/${user.id}`}>{user.name || `User ${user.id}`}</Link>
          </li>
        ))
      }
    </ul>
    </main>
  );
}
