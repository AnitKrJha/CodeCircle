import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { ThemeProvider } from "@/components/themeprovider";
import { Toaster } from "@/components/ui/sonner";
import Footer  from "@/components/landing/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PeerCode",
  description: "Collaborate on common problems with your peers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${inter.className} pt-16`}>
      <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
        
        <NavBar/>
        <main className="min-h-[94vh]">

        {children}
        </main>
        <Footer/>
        <Toaster richColors/>
      </ThemeProvider>
        </body>
    </html>
  );
}
