import Image from "next/image";
import { RefObject } from "react";

interface ThumbnailProps {
  images: string[];
  currentIndex: number;
  onCurrentIndex: (index: number) => void;
  thumbnailRefs: RefObject<(HTMLButtonElement | null)[]>;
}
export default function Thumbnail({
  images,
  currentIndex,
  onCurrentIndex,
  thumbnailRefs,
}: ThumbnailProps) {
  return (
    <div className="max-w-5xl h-20 md:h-24 px-2 shrink-0">
      <div className="flex gap-2 md:gap-3 px-2 overflow-x-auto snap-x items-center h-full w-full scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {images.map((image, index) => (
          <button
            key={index}
            ref={(el) => {
              thumbnailRefs.current[index] = el;
            }}
            onClick={() => onCurrentIndex(index)}
            className={`relative h-16 w-16 md:h-20 md:w-20 shrink-0 snap-center rounded-md overflow-hidden transition-all duration-300 ${
              currentIndex === index
                ? "ring-2 ring-beige-100 opacity-100 scale-105"
                : "opacity-40 hover:opacity-100"
            }`}
          >
            <Image
              src={image}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 64px, 80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
