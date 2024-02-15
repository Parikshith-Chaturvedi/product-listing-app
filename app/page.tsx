"use client"
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
     <h1 className={inter.className}>Product home</h1>
    </main>
  );
}
