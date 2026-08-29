import Link from "next/link";

export default function NavButton({
  text,
  path,
  onClick,
}: {
  text: string;
  path: string;
  onClick?: () => void;
}) {
  return (
    <li className="transition-all duration-300 hover:-translate-y-[1px]">
      <Link
        href={`${path}`}
        onClick={onClick}
        className="hover:text-white transition-colors"
      >
        {text}
      </Link>
    </li>
  );
}
