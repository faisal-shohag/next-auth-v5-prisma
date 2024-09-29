import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth, unstable_update } = NextAuth({
    trustHost: true,
    theme: {
        logo: "/logo.png"
    },
    adapter: PrismaAdapter(prisma),
    providers: [Google, Github],
    events: {
        async signIn({ user }) {
            // console.log("signIN", user)
        },

        async session(session) {
            //console.log("session", session)
        }
    },
    callbacks: {
        
        async jwt({ token, user, session, trigger}) {

            if(trigger === "update" && session?.name) {
                token.name = session.name;
            }

            //
            if(user) {
                return {
                    ...token,
                    id: user.id,
                    role: user.role,
                }
            }
            // console.log(token)
            return token
        },
        async session({ token, session, user }) {
            if(token.sub && session.user){
                session.user.id = token.sub
            }
            // console.log("token from session", token)
            // console.log("session", session)
            return {
                ...session,
                user:{
                    ...session.user, 
                    role: token.role,
                    name: token.name,
                }
            }
        },
    },
    session: { strategy: "jwt" },
})