import type { Metadata } from "next";
import { Noto_Serif, Inter, Barlow_Condensed, Barlow, Playfair_Display, Luxurious_Script, Vollkorn, Nunito_Sans, Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";

const notoSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-noto-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const vollkorn = Vollkorn({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-vollkorn",
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const luxuriousScript = Luxurious_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["400"],
  variable: "--font-luxurious-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gift Glamorous - Bộ Sưu Tập Quà Tặng Cao Cấp",
  description:
    "Khám phá thế giới quà tặng nghệ thuật tại Gift Glamorous — sự kết tinh giữa tinh hoa truyền thống và phong cách đương đại. Quà tặng cho mọi dịp quan trọng, đối tác doanh nghiệp và người thân yêu.",
  keywords: [
    "quà tặng cao cấp",
    "quà tết",
    "quà valentine",
    "quà trung thu",
    "quà giáng sinh",
    "quà doanh nghiệp",
    "gift glamorous",
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${notoSerif.variable} ${inter.variable} ${barlowCondensed.variable} ${barlow.variable} ${playfairDisplay.variable} ${luxuriousScript.variable} ${vollkorn.variable} ${nunitoSans.variable} ${anton.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-on-surface antialiased">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
