import "@/app/globals.css";
import { ThemeProvider } from "@/components/themeprovider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PeerCode",
  description: "Collaborate on common problems with your peers",
};


import DashboardHeader from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

    <body className={`${inter.className}`}>
    <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
      
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar/>
      <div className="flex flex-col">
       <DashboardHeader/>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          
          <div
            className="h-full border border-dashed shadow-sm"
          >
           {children}
          </div>
        </main>
      </div>
    </div>
    <Toaster richColors/>
      </ThemeProvider>
        </body>
    </html>
  )
}
