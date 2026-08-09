import { getDictionary } from "../../dictionaries";
import { Montserrat } from "next/font/google";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: { template: "PHOTOGRATU %s", default: "PHOTOGRATU" },
  description:
    "Професійний фотограф. Створюю естетичні та емоційні кадри, що зберігають ваші найцінніші моменти. Індивідуальні, парні та сімейні фотосесії.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: "uk" | "en";
  }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return (
    <html lang={resolvedParams.lang}>
      <body
        className={`${montserrat.className} text-gray-50 min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer lang={resolvedParams.lang} dict={dict.footer} />
      </body>
    </html>
  );
}
