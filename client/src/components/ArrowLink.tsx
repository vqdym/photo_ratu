import Link from "next/link";

export default function ArrowLink({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={`/${path}`}
      className="group flex items-center gap-4 text-xs tracking-[0.2em] uppercase text-espresso-800 hover:text-espresso-950 transition-colors drop-shadow-sm"
    >
      <span>{children}</span>
      <span className="text-xl">→</span>
    </Link>
  );
}
