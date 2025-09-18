import type { Metadata } from "next";
import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Toaster } from "sonner";

// Fonte Inter
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Adiciona display swap para melhor performance
});

// Fonte Quicksand
const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: 'swap', // Adiciona display swap para melhor performance
});

export const metadata: Metadata = {
  title: "Verté Beauty",
  description: "Sobrancelha de Sobra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${inter.variable} ${quicksand.variable}`}>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}