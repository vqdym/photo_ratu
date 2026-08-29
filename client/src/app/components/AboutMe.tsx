"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface AboutMeProps {
  about: {
    title: string;
    subtitle: string;
    headingPart1: string;
    headingPart2: string;
    headingHighlight: string;
    headingPart3: string;
    paragraph1: string;
    paragraph2: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
    bookButton: string;
  };
}

export default function AboutMe({ about }: AboutMeProps) {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 relative h-137.5 md:h-162.5"
        >
          <div className="absolute top-0 left-0 w-7/8 md:w-3/4 h-100 md:h-137.5 z-10 overflow-hidden shadow-sm">
            <Image
              src="/images/aboutme/IMG_ABOUT1.PNG"
              alt="Main portrait"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="absolute bottom-0 right-0 w-[60%] h-65 md:h-87.5 z-20 border-10 border-beige-50 overflow-hidden shadow-xl bg-espresso-200">
            <Image
              src="https://images.unsplash.com/photo-1516961642265-531546e84af2?q=80&w=1000&auto=format&fit=crop"
              alt="Detail"
              fill
              sizes="(max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-1/2 flex flex-col justify-center"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-espresso-950/40 mb-6">
            {about.subtitle}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light mb-8 leading-[1.1] tracking-tight">
            {about.headingPart1} <br /> {about.headingPart2}{" "}
            <span className="italic">{about.headingHighlight}</span>{" "}
            {about.headingPart3}
          </h1>

          <div className="space-y-6 text-lg text-espresso-950/80 font-light leading-relaxed max-w-lg">
            <p>{about.paragraph1}</p>
            <p>{about.paragraph2}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-espresso-950/10 flex items-center gap-10">
            <div>
              <span className="block text-3xl font-medium mb-1 text-espresso-950">
                {about.stat1Value}
              </span>
              <span className="text-xs uppercase tracking-widest text-espresso-950/50">
                {about.stat1Label}
              </span>
            </div>
            <div>
              <span className="block text-3xl font-medium mb-1 text-espresso-950">
                {about.stat2Value}
              </span>
              <span className="text-xs uppercase tracking-widest text-espresso-950/50">
                {about.stat2Label}
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
              {about.bookButton}
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
