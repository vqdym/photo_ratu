"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitcher() {
  const pathname = usePathname();

  const redirectedPathname = (locale: string) => {
    if (!pathname) return "/";

    const segments = pathname.split("/");

    segments[1] = locale;

    return segments.join("/");
  };

  const isUk = pathname?.startsWith("/uk");
  const isEn = pathname?.startsWith("/en");

  return (
    <div className="absolute top-0 right-0 translate-x-10 -translate-y-5 flex flex-col items-center text-sm font-light uppercase tracking-widest z-50">
      <Link
        href={redirectedPathname("uk")}
        className={`transition-opacity duration-300 ${
          isUk ? "opacity-100 font-medium" : "opacity-40 hover:opacity-100"
        }`}
      >
        Укр
      </Link>

      <span className="text-white/20">—</span>

      <Link
        href={redirectedPathname("en")}
        className={`transition-opacity duration-300 ${
          isEn ? "opacity-100 font-medium" : "opacity-40 hover:opacity-100"
        }`}
      >
        Eng
      </Link>
    </div>
  );
}
