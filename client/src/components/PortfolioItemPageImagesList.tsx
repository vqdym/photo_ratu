import { getGalleryById } from "@/_lib/data-services";
import Image from "next/image";

export default async function PortfolioItemPageImagesList({
  id,
}: {
  id: string;
}) {
  const response = await getGalleryById(id);
  const data = response?.data || response;

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 w-full">
      {data.images.map((imgUrl: string, index: number) => (
        <div
          key={index}
          className="break-inside-avoid overflow-hidden bg-black/5 relative mb-6 cursor-pointer"
        >
          <Image
            quality={100}
            src={imgUrl}
            alt="Photo"
            width={1200}
            height={1600}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  );
}
