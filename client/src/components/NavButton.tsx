import Link from "next/link";

export default function NavButton({
  text,
  path,
}: {
  text: string;
  path: string;
}) {
  return (
    <li className="transition-all duration-300 hover:-translate-y-[1px]">
      <Link href={`${path}`} className="hover:text-white transition-colors ">
        {text}
      </Link>
    </li>
  );
}
