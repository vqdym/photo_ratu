import { getGalleryById } from "@/_lib/data-services";

export default async function PortfolioItemPageHeader({ id }: { id: string }) {
  const response = await getGalleryById(id);
  const data = response?.data || response;

  return (
    <div className="mb-16 text-center pt-32">
      <h1 className="text-4xl md:text-5xl font-light mb-4 uppercase tracking-widest text-espresso-950">
        {data.title}
      </h1>
      <p className="text-espresso-950/50 uppercase tracking-[0.3em] text-sm">
        {data.category}
      </p>
    </div>
  );
}
