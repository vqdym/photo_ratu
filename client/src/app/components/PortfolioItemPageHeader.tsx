import { getGalleryById } from "@/app/_lib/data-services";
import { categoryLabels } from "@/utils/categoryLabels";
import { notFound } from "next/navigation";

export default async function PortfolioItemPageHeader({
  id,
  lang,
}: {
  id: string;
  lang: string;
}) {
  const response = await getGalleryById(id);
  const data = response?.data || response;
  if (!data) {
    notFound();
  }
  return (
    <div className="mb-16 text-center pt-32">
      <h1 className="text-4xl md:text-5xl font-light mb-4 uppercase tracking-widest text-espresso-950">
        {data.title}
      </h1>
      <p className="text-espresso-950/50 uppercase tracking-[0.3em] text-sm">
        {categoryLabels[lang]?.[data.category] || data.category}
      </p>
    </div>
  );
}
