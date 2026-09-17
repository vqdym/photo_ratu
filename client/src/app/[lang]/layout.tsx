import { getDictionary } from "../../dictionaries";
import { Montserrat } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../_styles/globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "Фотограф Тернопіль | Сукар Галина",
  description:
    "Професійний фотограф у Тернополі. Весільна, портретна, сімейна фотографія та репортаж. Забронювати фотосесію.",
  keywords:
    "фотограф тернопіль, весільний фотограф тернопіль, фотосесія тернопіль, Сукар Галина, photogratu, фотограту, індивідуальна фотосесія, де знайти фотографа",
  openGraph: {
    title: "Фотограф Тернопіль | Вадим Ратушний",
    description: "Професійна фотозйомка у Тернополі та області.",
    url: "https://photogratu.com",
    siteName: "Photogratu",
    locale: "uk_UA",
    type: "website",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const locale = resolvedParams.lang === "en" ? "en" : "uk";
  const dict = await getDictionary(locale);
  return (
    <html lang={locale}>
      <body
        className={`${montserrat.className} text-gray-50 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="grow">{children}</main>
        <Footer lang={locale} dict={dict.footer} />
      </body>
    </html>
  );
}
