"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./_styles/globals.css";

const dictionary = {
  uk: {
    code: "404",
    title: "Сторінку не знайдено",
    desc: "Схоже, такої сторінки не існує. Можливо, вона була видалена або ви ввели неправильну адресу.",
    btn: "Повернутися на головну",
  },
  en: {
    code: "404",
    title: "Page not found",
    desc: "It looks like this page doesn't exist. It might have been removed or the URL is incorrect.",
    btn: "Return to homepage",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const lang = pathname?.split("/")[1] === "en" ? "en" : "uk";
  const t = dictionary[lang];

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-50 px-4">
      <div className="max-w-md w-full bg-white rounded-sm shadow-xl p-8 space-y-6 text-center">
        <div>
          <h2 className="text-7xl italic text-espresso-950 mb-4">{t.code}</h2>
          <p className="text-sm text-espresso-300 tracking-widest uppercase">
            {t.title}
          </p>
        </div>

        <p className="text-sm text-espresso-950/70">{t.desc}</p>

        <Link
          href={`/${lang}`}
          className="w-full bg-espresso-950 cursor-pointer text-beige-50 py-3 rounded-sm hover:bg-espresso-900 transition-colors flex justify-center items-center h-12 mt-4"
        >
          {t.btn}
        </Link>
      </div>
    </div>
  );
}
