import Link from "next/link";

export default function Logo({ lang }: { lang: string }) {
  const cleanLang = lang?.replace(/\//g, "") || "uk";
  const baseUrl = `/${cleanLang}`;
  return (
    <Link
      href={baseUrl}
      className="lg:text-[16px] text-[20px] tracking-[0.3em] md:tracking-[0.4em] uppercase"
    >
      PHOTOGRATU
    </Link>
  );
}
