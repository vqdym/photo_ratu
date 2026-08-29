// src/components/Footer/FooterNav.tsx
import Link from "next/link";

interface NavLink {
  text: string;
  path: string;
}

interface FooterNavProps {
  links: NavLink[];
  navTitle: string;
}

export default function FooterNav({ links, navTitle }: FooterNavProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <h4 className="text-[12px] tracking-[0.4em] uppercase text-beige-100/40 md:mb-2">
        {navTitle}
      </h4>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="text-sm font-light text-beige-100/80 hover:text-white transition-colors duration-300 w-fit"
          >
            {link.text}
          </Link>
        ))}
      </nav>
    </div>
  );
}
