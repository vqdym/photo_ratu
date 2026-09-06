"use client";
import Image from "next/image";
import { useState } from "react";
import SpinnerMini from "./SpinnerMini";
import ButtonDeleteMini from "./ButtonDeleteMini";

export default function PhotoCard({
  imgUrl,
  index,
  isEditing,
  handleRemove,
  onClick,
}: {
  imgUrl: string;
  index: number;
  isEditing: boolean;
  handleRemove: (url: string) => void;
  onClick?: () => void;
}) {
  const [IsImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden bg-black/5 group ${
        isEditing
          ? "aspect-square cursor-grab active:cursor-grabbing border-2 border-transparent hover:border-espresso-950 transition-colors"
          : "min-h-64 cursor-pointer mb-6 break-inside-avoid md:min-h-80"
      }`}
    >
      {!IsImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-beige-50/80 z-10">
          <SpinnerMini />
        </div>
      )}
      {isEditing && (
        <ButtonDeleteMini
          onClick={(e) => {
            e.stopPropagation();
            handleRemove(imgUrl);
          }}
          styles="cursor-pointer absolute top-2 right-2 z-20 bg-red-600 text-white p-1.5 rounded-full opacity-100 transition-opacity hover:bg-red-700"
        />
      )}

      {isEditing && (
        <div className="absolute top-2 left-2 z-20 bg-espresso-950/80 text-white text-xs px-2 py-1 rounded-sm">
          {index + 1}
        </div>
      )}

      <Image
        quality={100}
        src={imgUrl}
        alt={`Photo ${index + 1}`}
        width={0}
        height={0}
        sizes="100vw"
        onLoad={() => setIsImageLoaded(true)}
        onError={() => setIsImageLoaded(true)}
        style={{ width: "100%", height: isEditing ? "100%" : "auto" }}
        className={`w-full transition-all duration-700 ${
          isEditing
            ? "object-cover pointer-events-none"
            : "h-auto group-hover:scale-105"
        } ${IsImageLoaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
