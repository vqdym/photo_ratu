import PortfolioPhotoCard from "./PortfolioPhotoCard";
import NoDataMessage from "./NoDataMessage";
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

  if (!gallery.data?.length)
    return <NoDataMessage message="Немає фотографій для цього розділу" />;

  return (
    <div className="columns-1 min-[1200px]:columns-2 max-w-7xl mx-auto">
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
