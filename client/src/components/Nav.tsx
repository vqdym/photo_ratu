import getNavButtons from "@/utils/getNavButtons";
import LangSwitcher from "./LangSwithcer";
import NavButton from "./NavButton";

export default function Nav({ lang }: { lang: string }) {
  console.log("NAV", lang);
  const navButtons = getNavButtons(lang);
  return (
    <ul className="relative hidden md:flex gap-10 text-[14px] tracking-[0.2em] uppercase">
      {navButtons.map((item) => (
        <NavButton key={item.path} text={item.text} path={item.path} />
      ))}
      <li>
        <LangSwitcher />
      </li>
    </ul>
  );
}
