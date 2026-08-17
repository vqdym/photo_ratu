import { getDictionary } from "@/dictionaries";
import DictProps from "@/types/DictProps";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return {
    title: dict.about.title,
  };
}

export default async function Page({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return (
    <section className="min-h-screen bg-beige-50 text-espresso-950 pt-32 px-6 pb-24 flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 relative h-137.5 md:h-162.5">
            <div className="absolute top-0 left-0 w-3/4 h-112.5 md:h-137.5 z-10 overflow-hidden shadow-sm">
              <Image
                src="/images/aboutme/IMG_ABOUT1.PNG"
                alt="Main portrait"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-0 right-0 w-[60%] h-75 md:h-87.5 z-20 border-10 border-beige-50 overflow-hidden shadow-xl bg-espresso-200">
              <Image
                src="https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1000&auto=format&fit=crop"
                alt="Detail"
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-espresso-950/40 mb-6">
              {dict.about.subtitle}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-[1.1] tracking-tight">
              {dict.about.headingPart1} <br /> {dict.about.headingPart2}{" "}
              <span className="italic">{dict.about.headingHighlight}</span>{" "}
              {dict.about.headingPart3}
            </h1>

            <div className="space-y-6 text-lg text-espresso-950/80 font-light leading-relaxed max-w-lg">
              <p>{dict.about.paragraph1}</p>
              <p>{dict.about.paragraph2}</p>
            </div>

            <div className="mt-12 pt-8 border-t border-espresso-950/10 flex items-center gap-10">
              <div>
                <span className="block text-3xl font-medium mb-1 text-espresso-950">
                  {dict.about.stat1Value}
                </span>
                <span className="text-xs uppercase tracking-widest text-espresso-950/50">
                  {dict.about.stat1Label}
                </span>
              </div>
              <div>
                <span className="block text-3xl font-medium mb-1 text-espresso-950">
                  {dict.about.stat2Value}
                </span>
                <span className="text-xs uppercase tracking-widest text-espresso-950/50">
                  {dict.about.stat2Label}
                </span>
              </div>
            </div>

            <div className="mt-10">
              <Link
                href="https://www.instagram.com/photo_g_ratu_/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-espresso-950 text-beige-50 px-10 py-4 text-xs uppercase tracking-[0.2em] font-medium hover:bg-espresso-800 transition-colors duration-300 shadow-lg"
              >
                {dict.about.bookButton}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
