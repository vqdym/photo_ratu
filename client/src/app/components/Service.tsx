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
      className="text-center mb-24"
    >
      <div className="grid grid-cols-2 justify-items-center">
        <div
          className={`w-full relative group ${imagePosition === "right" ? "md:order-last" : ""} w-full h-[40vh] md:h-[50vh]`}
        >
          <div className="absolute -inset-4 border border-espresso-950/10 transition-all duration-300 ease-in-out group-hover:-inset-4 md:group-hover:-inset-6 group-hover:border-espresso-950/30"></div>
          <Image
            src={imgUrl}
            alt={altText}
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={
              "object-cover relative filter sepia-[10%] drop-shadow-sm"
            }
          />
        </div>
        <ServiceInfo number={number} name={name} description={description} />
      </div>
    </motion.div>
  );
}
