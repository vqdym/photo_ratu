import { Montserrat } from "next/font/google";
import HeroImage from "./HeroImage";
import { jwtCookie, logoutAdmin } from "@/app/_lib/actions/auth";
import LogoutButton from "./LogoutButton";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
});

interface HeroProps {
  dict: {
    hero: {
      subtitle: string;
      titleLine1: string;
      titleLine2: string;
      description: string;
    };
  };
}

export default async function Hero({ dict }: HeroProps) {
  const isAdmin = await jwtCookie();
  return (
    <section
      className={`${montserrat.className} relative h-screen w-full flex items-center pb-24 md:pb-32 bg-[#0a1912]`}
    >
      <HeroImage />

      <div className="relative mx-auto z-10 w-full max-w-7xl px-4 md:px-8 lg:px-12 text-[#faf8f5] animate-fade-up-advanced">
        <div className="relative max-w-2xl">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#e6dfd5] mb-6 drop-shadow-md">
            {dict.hero.subtitle}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 drop-shadow-lg">
            {dict.hero.titleLine1} <br />
            <span className="italic text-[#e6dfd5]">
              {dict.hero.titleLine2}
            </span>
          </h1>
          <p className="text-xs md:text-sm lg:text-base text-white/90 tracking-wider max-w-md leading-relaxed drop-shadow-md">
            {dict.hero.description}
          </p>

          {isAdmin && <LogoutButton />}
        </div>
      </div>
    </section>
  );
}
