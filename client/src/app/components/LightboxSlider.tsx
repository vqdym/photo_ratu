"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Thumbnail from "./Thumbnail";
import SpinnerMini from "./SpinnerMini";

interface LightboxSliderProps {
  images: string[];
  initialIndex: number;
}

export default function LightboxSlider({
  images,
  initialIndex,
}: LightboxSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [prevInitialIndex, setPrevInitialIndex] = useState(initialIndex);

  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  if (initialIndex !== prevInitialIndex) {
    setPrevInitialIndex(initialIndex);
    setCurrentIndex(initialIndex);
    setIsImageLoading(true);
  }

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
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setIsImageLoading(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleThumbnailChange = (index: number) => {
    if (index === currentIndex) return;
    setIsImageLoading(true);
    setCurrentIndex(index);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  if (!images) return null;
  if (images.length < 1) return null;

  return (
    <div className="relative flex h-[85dvh] max-h-[calc(100dvh-2rem)] w-full min-w-0 flex-col items-center justify-between overflow-hidden py-4 md:h-[95dvh]">
      <div
        className="relative flex min-h-0 w-full min-w-0 flex-1 touch-pan-y items-center justify-center md:mb-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <button
          onClick={handlePrev}
          className="cursor-pointer absolute left-0 md:left-10 z-50 p-3 bg-espresso-950/30 md:bg-espresso-950/50 text-white rounded-full hover:bg-espresso-950 transition-colors"
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

        <div className="relative h-full w-full min-w-0 max-w-full">
          {isImageLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <SpinnerMini />
            </div>
          )}
          <Image
            src={images[currentIndex]}
            alt="Gallery image"
            fill
            className="object-contain select-none"
            sizes="100vw"
            onLoad={() => setIsImageLoading(false)}
          />
        </div>

        <button
          onClick={handleNext}
          className="cursor-pointer absolute right-0 md:right-10 z-50 p-3 bg-espresso-950/30 md:bg-espresso-950/50 text-white rounded-full hover:bg-espresso-950 transition-colors"
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
        onCurrentIndex={handleThumbnailChange}
        thumbnailRefs={thumbnailRefs}
      />
    </div>
  );
}
