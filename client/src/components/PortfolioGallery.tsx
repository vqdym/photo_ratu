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
  return (
    <>
      <PortfolioFilter lang={lang} activeCategory={currentCategory} />
      <PhotoCardList lang={lang} currentCategory={currentCategory} />
    </>
  );
}
