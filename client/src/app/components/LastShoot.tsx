import Image from "next/image";
import ArrowLink from "./ArrowLink";

export default function LastShoot({
  lang,
  title,
  category,
  imgUrl,
  altText,
  isLower,
}: {
  lang: string;
  title: string;
  category: string;
  imgUrl: string;
  altText: string;
  isLower: boolean;
}) {
  return (
    <div
      className={`flex flex-col group bg-white p-6 md:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-sm relative w-full ${
        isLower ? "md:mt-32" : ""
      }`}
    >
      <div className="relative w-full aspect-[4/5] mb-6 h-[60vh] md:h-[50vh] overflow-hidden">
        <Image
          src={imgUrl}
          alt={altText}
          fill
          quality={100}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover filter sepia-[10%] drop-shadow-sm transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex justify-between items-center">
        <h4 className="text-2xl italic text-espresso-950">{title}</h4>
        <p className="text-[10px] text-espresso-300 tracking-[0.2em] uppercase border border-espresso-950/20 px-3 py-1 rounded-full">
          {category}
        </p>
      </div>
      <div className={`self-end mt-6 ${!isLower ? "md:mt-37" : ""}`}>
        <ArrowLink path={`${lang}/portfolio`}>
          <span className="border-b border-white/50 group-hover:border-[#e6dfd5] pb-1">
            {lang === "en" ? "view work" : "дивитися роботу"}
          </span>
        </ArrowLink>
      </div>
    </div>
  );
}
