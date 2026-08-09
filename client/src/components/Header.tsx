"use client";
import { getDictionary } from "../dictionaries";
import { useState, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const isHomePage = pathname === "/uk" || pathname === "/en";

  const [isScrolled, setIsScrolled] = useState(false);

  useLayoutEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 15);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const shouldBeDark = !isHomePage || isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 transition-all duration-500 ease-in-out ${
        shouldBeDark
          ? "bg-espresso-950/70 backdrop-blur-md shadow-lg py-6"
          : "bg-transparent py-6"
      }`}
    >
      <div
        className={`w-full mx-auto flex justify-between items-baseline px-16 ${
          shouldBeDark ? "text-beige-100" : "text-beige-300"
        }`}
      >
        <Logo />
        <Nav lang={lang} />
      </div>
    </header>
  );
}
