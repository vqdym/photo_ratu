"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LangSwitcher({
  isMobile = false,
}: {
  isMobile?: boolean;
}) {
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
    <div
      className={`flex items-center text-sm font-light uppercase tracking-widest z-50 ${
        isMobile ? "flex-row gap-4" : "flex-col"
      }`}
    >
      <Link
        href={redirectedPathname("uk")}
        className={`transition-opacity duration-300 ${
          isUk ? "opacity-100 font-medium" : "opacity-40 hover:opacity-100"
        }`}
      >
        Укр
      </Link>

      <span className={`text-white/20 ${isMobile ? "hidden" : "block"}`}>
        —
      </span>
      {isMobile && <span className="text-white/20">|</span>}

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
