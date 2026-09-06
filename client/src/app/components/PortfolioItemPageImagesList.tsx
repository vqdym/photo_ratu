import { getGalleryById } from "@/app/_lib/data-services";
import InteractiveImageGrid from "./InteractiveImageGrid";
import { notFound } from "next/navigation";
import { jwtCookie } from "../_lib/actions/auth";

export default async function PortfolioItemPageImagesList({
  id,
}: {
  id: string;
}) {
  const response = await getGalleryById(id);
  const data = response?.data || response;
  const isAdmin = await jwtCookie();
  if (!data) {
    notFound();
  }

  const images = Array.isArray(data.images) ? data.images : [];

  return (
    <InteractiveImageGrid images={images} isAdmin={isAdmin} galleryId={id} />
  );
}
