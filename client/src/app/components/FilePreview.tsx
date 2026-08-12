"use client";

import { useEffect, useRef } from "react";

interface FilePreviewProps {
  file: File;
  onRemove?: () => void;
}

export default function FilePreview({ file, onRemove }: FilePreviewProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!file || !imgRef.current) return;

    const objectUrl = URL.createObjectURL(file);

    imgRef.current.src = objectUrl;

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!file) return null;

  const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);

  return (
    <div className="flex items-center mx-auto w-68.75 gap-1 p-1 border border-black/10 rounded-sm bg-white shadow-sm relative">
      {imgRef && (
        <img
          ref={imgRef}
          alt="preview"
          className="w-6 h-6 object-cover rounded-sm border border-black/5"
        />
      )}

      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium text-espresso-950 truncate">
          {file.name}
        </p>
        <p className="text-[8px] text-espresso-950/50">{fileSizeInMB} MB</p>
      </div>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -right-6 bg-transparent cursor-pointer text-black/40 hover:text-black/60  transition-colors"
          title="Видалити файл"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
