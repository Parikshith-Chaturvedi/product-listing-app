"use client"
import { Inter } from "next/font/google";
import ProductHome from "./layout/page";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={inter.className}>
     <ProductHome/>
    </main>
  );
}
