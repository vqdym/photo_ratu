import Image from "next/image";
import { Photosession } from "../../types/Portfolio";
import Link from "next/link";
import { categoryLabels } from "@/utils/categoryLabels";
import DeleteButton from "./DeleteGallery";
import { jwtCookie } from "../_lib/actions/auth";
import { getServicesNames } from "../_lib/data-services";

export default async function PortfolioPhotoCard({
  photosession,
  lang,
}: {
  photosession: Photosession;
  lang: string;
}) {
  const isAdmin = await jwtCookie();
  const servicesNames = await getServicesNames();
  const currentCategory = servicesNames.find(
    (s: { name: string; nameEn: string }) =>
      s.nameEn.toLowerCase() === photosession.category.toLowerCase(),
  );
  const categoryText =
    lang === "uk" ? currentCategory?.name : currentCategory?.nameEn;
  return (
    <div className="relative break-inside-avoid p-6">
      {isAdmin && <DeleteButton id={photosession._id} />}
      <Link
        href={`/${lang}
/portfolio/${photosession._id}`}
        className="relative flex flex-col bg-white w-full p-6 md:p-8 py-12 overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow duration-500 rounded-sm cursor-pointer"
      >
        <div className="relative w-full h-150 mx-auto overflow-hidden mb-6">
          <Image
            src={photosession.coverImage}
            alt={photosession.category}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex justify-between items-center">
          <h4 className="text-2xl italic text-espresso-950">
            {photosession.title}
          </h4>
          <p className="text-[10px] text-espresso-300 tracking-[0.2em] uppercase border border-espresso-950/20 px-3 py-1 rounded-full">
            {categoryText}
          </p>
        </div>
      </Link>
    </div>
  );
}
