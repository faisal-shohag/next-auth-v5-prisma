import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });
export const Metadata = {
  title: {
    template: "%s | Next-Auth V5",
    absolute: "Next-Auth",
  },
  description:
    "Learning how to use Auth.js v5 in Next.js with custom roles, caching, and more!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionProvider>
      <body
        className={inter.className}
      >
        <Toaster/>
        <NavBar/>
        {children}
      </body>
      </SessionProvider>
    </html>
  );
}
