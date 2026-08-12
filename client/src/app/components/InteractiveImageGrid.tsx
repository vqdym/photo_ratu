"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "@/app/components/Modal";
import LightboxSlider from "./LightboxSlider";
import SpinnerMini from "./SpinnerMini";

export default function InteractiveImageGrid({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Modal>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6  w-full">
        {images.map((imgUrl, index) => (
          <div
            className="break-inside-avoid mb-6"
            key={index}
            onClick={() => setActiveIndex(index)}
          >
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-beige-100/50 z-10">
                <SpinnerMini />
              </div>
            )}

            <Modal.Open opens="item-lightbox">
              <div className=" overflow-hidden bg-black/5 relative  cursor-pointer group">
                <Image
                  quality={100}
                  src={imgUrl}
                  alt={`Photo ${index + 1}`}
                  width={0}
                  height={0}
                  sizes="100vw"
                  onLoad={() => setIsLoaded(true)}
                  style={{ width: "100%", height: "auto" }}
                  className={`w-full h-auto transition-all duration-700 group-hover:scale-105 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </Modal.Open>
          </div>
        ))}
      </div>

      <Modal.Window name="item-lightbox">
        <LightboxSlider images={images} initialIndex={activeIndex} />
      </Modal.Window>
    </Modal>
  );
}
