"use client";

import { useState, useLayoutEffect, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Nav from "./Nav";

export default function Header() {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];
  const isHomePage = pathname === "/uk" || pathname === "/en";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const shouldBeDark = !isHomePage || isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
        shouldBeDark
          ? "bg-espresso-900 backdrop-blur-md shadow-lg py-4 lg:py-4 "
          : "bg-transparent  py-4 lg:py-4"
      }`}
    >
      <div
        className={`w-full mx-auto flex justify-between items-center lg:items-baseline px-4 md:px-8 lg:px-12 ${
          shouldBeDark ? "text-beige-100" : "text-beige-300"
        }`}
      >
        <Logo />
        <Nav
          lang={lang}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>
    </header>
  );
}
