import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import {authOptions} from '@/utils/authOptions';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MajesticMarket",
  description: "Sell and buy items locally with US",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session= await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header session={session} />
        {children}
        </body>
    </html>
  );
}
