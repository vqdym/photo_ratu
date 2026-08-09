import { Montserrat } from "next/font/google";
import HeroImage from "./HeroImage";

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

export default function Hero({ dict }: HeroProps) {
  return (
    <section
      className={`${montserrat.className} relative h-screen w-full flex items-center pb-20 md:pb-32 px-6 md:px-16 bg-[#0a1912]`}
    >
      <HeroImage />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10 text-[#faf8f5] animate-fade-up-advanced">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#e6dfd5] mb-6 drop-shadow-md">
            {dict.hero.subtitle}
          </p>
          <h1
            className={`text-5xl md:text-8xl leading-[1.1] mb-6 drop-shadow-lg`}
          >
            {dict.hero.titleLine1} <br />
            <span className="italic text-[#e6dfd5]">
              {dict.hero.titleLine2}
            </span>
          </h1>
          <p className="text-sm md:text-base text-white/90 tracking-wider max-w-md leading-relaxed drop-shadow-md">
            {dict.hero.description}
          </p>
        </div>
      </div>
    </section>
  );
}
