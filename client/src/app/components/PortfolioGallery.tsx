import { jwtCookie } from "../_lib/actions/auth";
import AddNewPortfolioModal from "./AddNewPortfolioModal";
import PhotoCardList from "./PhotoCardList";
import PortfolioFilter from "./PortfolioFilter";

interface PortfolioGalleryProps {
  lang: string;
  searchParams: Promise<{ category?: string }>;
}

export default async function PortfolioGallery({
  lang,
  searchParams,
}: PortfolioGalleryProps) {
  const params = await searchParams;
  const currentCategory = params?.category || "all";
  const isAdmin = await jwtCookie();
  return (
    <>
      <PortfolioFilter lang={lang} activeCategory={currentCategory} />
      {isAdmin && <AddNewPortfolioModal />}
      <PhotoCardList lang={lang} currentCategory={currentCategory} />
    </>
  );
}
