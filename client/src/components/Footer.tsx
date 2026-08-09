import FooterBrand from "./FooterBrand";
import FooterNav from "./FooterNav";
import FooterContact from "./FooterContact";
import FooterCopyright from "./FooterCopyright";
import getNavButtons from "@/utils/getNavButtons";

interface FooterProps {
  lang: string;
  dict: {
    subtitle: string;
    description: string;
    navTitle: string;
    contactTitle: string;
    rights: string;
  };
}

export default function Footer({ lang, dict }: FooterProps) {
  const navLinks = getNavButtons(lang);
  return (
    <footer className="w-full bg-espresso-950 drop-shadow-[0_10px_15px_rgba(0,0,0,0.35)] z-50 text-beige-50 pt-18 pb-18 relative">
      <div className="mx-auto max-w-7xl px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <FooterBrand dict={dict} />
          <FooterNav navTitle={dict.navTitle} links={navLinks} />
          <FooterContact contactTitle={dict.contactTitle} />
          <FooterCopyright rights={dict.rights} />
        </div>
      </div>
    </footer>
  );
}
