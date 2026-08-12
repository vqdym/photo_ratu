"use client";

import { useRouter } from "next/navigation";

export default function BackButton({
  lang,
  path,
}: {
  lang: string;
  path: string;
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.replace(`/${lang}/${path}`)}
      className="group flex items-center gap-3 text-sm uppercase tracking-[0.2em] cursor-pointer text-espresso-950/60 hover:text-espresso-950 transition-colors duration-300 mb-8"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
        />
      </svg>
      <span>{lang === "en" ? "Back" : "Назад"}</span>
    </button>
  );
}
