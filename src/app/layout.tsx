import type { Metadata } from "next";
import { Roboto, Montserrat, Inter } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CF Yerba | Tienda Oficial de Yerba Mate & Accesorios Artesanales",
  description:
    "Catálogo oficial de CF Yerba. Yerba mate agroecológica, mates de calabaza, bombillas y accesorios artesanales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${roboto.variable} ${montserrat.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col font-body bg-base-white text-dark antialiased">
        {children}
      </body>
    </html>
  );
}
