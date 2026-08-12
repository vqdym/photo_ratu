import { getGalleryById } from "@/app/_lib/data-services";
import InteractiveImageGrid from "./InteractiveImageGrid";
import { notFound } from "next/navigation";

export default async function PortfolioItemPageImagesList({
  id,
}: {
  id: string;
}) {
  const response = await getGalleryById(id);
  const data = response?.data || response;
  if (!data) {
    notFound();
  }
  return <InteractiveImageGrid images={data.images} />;
}
