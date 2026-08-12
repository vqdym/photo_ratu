"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Thumbnail from "./Thumbnail";

interface LightboxSliderProps {
  images: string[];
  initialIndex: number;
}

export default function LightboxSlider({
  images,
  initialIndex,
}: LightboxSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    if (thumbnailRefs.current[currentIndex]) {
      thumbnailRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      //   console.log(e.key);
      if (e.key === "ArrowRight" || e.key === "d") {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === "ArrowLeft" || e.key === "a") {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images) return null;
  if (images.length < 1) return null;

  return (
    <div className="relative w-full h-[95vh] flex flex-col items-center justify-between py-4">
      <div className="relative w-full flex-1 flex items-center justify-center min-h-0 mb-4 group">
        <button
          onClick={handlePrev}
          className="cursor-pointer absolute left-4 md:left-10 z-50 p-3 bg-espresso-950/50 text-white rounded-full hover:bg-espresso-950 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <div className="relative w-full h-full">
          <Image
            src={images[currentIndex]}
            alt="Gallery image"
            fill
            className="object-contain select-none"
            sizes="100vw"
            priority
          />
        </div>

        <button
          onClick={handleNext}
          className="cursor-pointer absolute right-4 md:right-10 z-50 p-3 bg-espresso-950/50 text-white rounded-full hover:bg-espresso-950 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      <Thumbnail
        images={images}
        currentIndex={currentIndex}
        onCurrentIndex={setCurrentIndex}
        thumbnailRefs={thumbnailRefs}
      />
    </div>
  );
}
