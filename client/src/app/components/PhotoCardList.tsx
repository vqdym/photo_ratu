import PortfolioPhotoCard from "./PortfolioPhotoCard";
import { getGallery } from "@/app/_lib/data-services";
import { Photosession } from "@/types/Portfolio";

export default async function PhotoCardList({
  lang,
  currentCategory,
}: {
  lang: string;
  currentCategory?: string;
}) {
  const gallery = await getGallery(currentCategory);

  if (!gallery.data?.length) return null;

  return (
    <div className="columns-1 md:columns-2 max-w-7xl mx-auto">
      {gallery.data.map((photosession: Photosession) => (
        <PortfolioPhotoCard
          lang={lang}
          photosession={photosession}
          key={photosession._id}
        />
      ))}
    </div>
  );
}
