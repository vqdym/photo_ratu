import Image from "next/image";
import { Photosession } from "../types/portfolio";
import Link from "next/link";
import { categoryLabels } from "@/utils/categoryLabels";

export default function PortfolioPhotoCard({
  photosession,
  lang,
}: {
  photosession: Photosession;
  lang: string;
}) {
  return (
    <div className="break-inside-avoid">
      <Link
        href={`/${lang}
/portfolio/${photosession._id}`}
        className="flex flex-col bg-white w-full p-6 md:p-8 py-12 overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-sm cursor-pointer"
      >
        <div className="relative w-full mx-auto h-auto overflow-hidden mb-6">
          <Image
            src={photosession.coverImage}
            alt={photosession.category}
            width={800}
            height={1200}
            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-2xl italic text-espresso-950">
            {photosession.title}
          </h4>
          <p className="text-[10px] text-espresso-300 tracking-[0.2em] uppercase border border-espresso-950/20 px-3 py-1 rounded-full">
            {categoryLabels[lang]?.[photosession.category] ||
              photosession.category}
          </p>
        </div>
      </Link>
    </div>
  );
}
