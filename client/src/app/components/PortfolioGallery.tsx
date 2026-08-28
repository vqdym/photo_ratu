import { jwtCookie } from "../_lib/actions/auth";
import AddNewPortfolioModal from "./AddNewPortfolioModal";
import PhotoCardList from "./PhotoCardList";
import PortfolioFilter from "./PortfolioFilter";
import { getGallery, getServicesNames } from "../_lib/data-services";

interface PortfolioGalleryProps {
  lang: string;
  searchParams: Promise<{ category?: string }>;
}

interface GalleryItem {
  title: string;
  category: string;
  coverImage: string;
  images: string[];
}

export default async function PortfolioGallery({
  lang,
  searchParams,
}: PortfolioGalleryProps) {
  const params = await searchParams;
  const currentCategory = params?.category || "all";
  const isAdmin = await jwtCookie();
  const [services, galleries] = await Promise.all([
    getServicesNames(),
    getGallery(),
  ]);

  const usedCategories: string[] = Array.from(
    new Set(
      galleries.data.map((item: GalleryItem) => item.category.toLowerCase()),
    ),
  );

  return (
    <>
      <PortfolioFilter
        lang={lang}
        activeCategory={currentCategory}
        services={services}
        usedCategories={usedCategories}
      />
      {isAdmin && <AddNewPortfolioModal />}
      <PhotoCardList lang={lang} currentCategory={currentCategory} />
    </>
  );
}
