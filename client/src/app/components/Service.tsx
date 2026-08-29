"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import ServiceInfo from "./ServiceInfo";

export default function Service({
  number,
  name,
  description,
  imgUrl,
  altText,
  imagePosition,
}: {
  number: string;
  name: string;
  description: string;
  imgUrl: string;
  altText: string;
  imagePosition: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="mb-40 md:mb-32"
    >
      <div className="flex flex-col md:grid md:grid-cols-2 md:p-6 lg:p-12 items-center gap-10 md:gap-12 lg:gap-20">
        <div
          className={`w-full relative group h-[45vh] md:h-[50vh] lg:h-[65vh] ${
            imagePosition === "right" ? "md:order-last" : ""
          }`}
        >
          <div className="absolute md:-inset-4 md:border border-espresso-950/10 transition-all duration-300 ease-in-out group-hover:-inset-4 md:group-hover:-inset-6 group-hover:border-espresso-950/30"></div>
          <Image
            src={imgUrl}
            alt={altText}
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover relative filter sepia-[10%] drop-shadow-sm"
          />
        </div>

        <ServiceInfo number={number} name={name} description={description} />
      </div>
    </motion.div>
  );
}
