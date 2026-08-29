import getNavButtons from "@/utils/getNavButtons";
import LangSwitcher from "./LangSwithcer";
import NavButton from "./NavButton";

export default function Nav({
  lang,
  isMenuOpen,
  setIsMenuOpen,
}: {
  lang: string;
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}) {
  const navButtons = getNavButtons(lang);

  return (
    <>
      <ul className="relative hidden lg:flex items-center md:gap-8 lg:gap-10 md:text-[12px] lg:text-[14px] tracking-[0.2em] uppercase">
        {navButtons.map((item) => (
          <NavButton key={item.path} text={item.text} path={item.path} />
        ))}
        <li>
          <LangSwitcher />
        </li>
      </ul>

      <button
        className="lg:hidden relative z-[70] flex flex-col justify-center items-end gap-1.5 w-6 h-8 text-current"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <span
          className={`block w-full h-[2px] bg-current transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}
        />
        <span
          className={`block w-full h-[2px] bg-current transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block w-full h-[2px] bg-current transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
        />
      </button>

      <div
        className={`fixed inset-0 bg-black/60 z-[50] transition-opacity duration-300 lg:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-[100dvh] w-[100%] bg-espresso-900 z-[60] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out lg:hidden shadow-2xl ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center gap-10 text-xl tracking-[0.2em] uppercase text-beige-100">
          {navButtons.map((item) => (
            <NavButton
              key={item.path}
              text={item.text}
              path={item.path}
              onClick={() => setIsMenuOpen(false)}
            />
          ))}
          <li className="mt-8">
            <LangSwitcher isMobile />
          </li>
        </ul>
      </div>
    </>
  );
}
