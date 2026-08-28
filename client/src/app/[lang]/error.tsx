"use client";

import { usePathname } from "next/navigation";

const dictionary = {
  uk: {
    title: "Отакої...",
    subtitle: "Щось пішло не так",
    desc: "Спробуйте оновити сторінку або поверніться сюди трохи пізніше.",
    btn: "Спробувати ще раз",
    fallbackError: "Сталася непередбачувана помилка.",
  },
  en: {
    title: "Oops...",
    subtitle: "Something went wrong",
    desc: "Please try refreshing the page or come back later.",
    btn: "Try again",
    fallbackError: "An unexpected error occurred.",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();

  const lang = pathname.split("/")[1] as "uk" | "en";

  const t = dictionary[lang] || dictionary["en"];

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-50 px-4">
      <div className="max-w-md w-full bg-white rounded-sm shadow-xl p-8 space-y-6 text-center">
        <div>
          <h2 className="text-3xl italic text-espresso-950 mb-2">{t.title}</h2>
          <p className="text-sm text-espresso-300 tracking-widest uppercase">
            {t.subtitle}
          </p>
        </div>

        <div className="bg-red-50 text-red-600 p-4 rounded text-sm text-center border border-red-100 break-words">
          {error.message || t.fallbackError}
        </div>

        <p className="text-sm text-espresso-950/70">{t.desc}</p>

        <button
          onClick={() => reset()}
          className="w-full bg-espresso-950 cursor-pointer text-beige-50 py-3 rounded-sm hover:bg-espresso-900 transition-colors flex justify-center items-center h-12"
        >
          {t.btn}
        </button>
      </div>
    </div>
  );
}
