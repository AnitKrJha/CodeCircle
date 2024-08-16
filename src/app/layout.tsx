import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import { ThemeProvider } from "@/components/themeprovider";

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

      <body className={inter.className}>
      <ThemeProvider attribute="class" defaultTheme="system">
        
        <NavBar/>
        {children}
      </ThemeProvider>
        </body>
    </html>
  );
}
