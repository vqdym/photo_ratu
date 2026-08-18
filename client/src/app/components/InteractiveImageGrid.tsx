"use client";

import Masonry from "react-masonry-css";
import { useState, useRef, useEffect } from "react";
import Modal from "@/app/components/Modal";
import LightboxSlider from "./LightboxSlider";
import SpinnerMini from "./SpinnerMini";
import { addNewPhotosToGallery, editGallery } from "../_lib/data-services";
import PhotoCard from "./PhotoCard";
import Button from "./Button";
import { useForm } from "react-hook-form";
import FilePreview from "./FilePreview";
import handleSort from "@/utils/handleSort";

interface PhotoFormValues {
  gallery: File[];
}

export default function InteractiveImageGrid({
  images: initialImages,
  isAdmin,
  galleryId,
}: {
  images: string[];
  isAdmin?: boolean;
  galleryId: string;
}) {
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<PhotoFormValues>();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [photos, setPhotos] = useState<string[]>(initialImages);
  const [deletedUrls, setDeletedUrls] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<null | string>();

  useEffect(() => {
    setPhotos(initialImages);
  }, [initialImages]);

  const closeRef = useRef<HTMLButtonElement>(null);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const rawGalleryFiles = watch("gallery");

  const galleryArray = rawGalleryFiles
    ? Array.isArray(rawGalleryFiles)
      ? rawGalleryFiles
      : Array.from(rawGalleryFiles as FileList)
    : [];

  const onDragEnd = () => {
    handleSort(dragItem, dragOverItem, photos, setPhotos);
  };

  const handleRemove = (urlToRemove: string) => {
    setPhotos(photos.filter((url) => url !== urlToRemove));
    setDeletedUrls((prev) => [...prev, urlToRemove]);
  };

  const handleCancel = () => {
    setPhotos(initialImages);
    setDeletedUrls([]);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await editGallery(galleryId, photos, deletedUrls);

      setIsEditing(false);
      setDeletedUrls([]);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  const onSubmit = async (data: PhotoFormValues) => {
    if (!data.gallery || data.gallery.length === 0) {
      setErrorMsg("Будь ласка, додайте хоча б одну фотографію!");
      return;
    }
    const formData = new FormData();

    if (data.gallery && data.gallery.length > 0) {
      data.gallery.forEach((file) => {
        formData.append("images", file);
      });
    }
    try {
      await addNewPhotosToGallery(galleryId, formData);

      closeRef.current?.click();

      setTimeout(() => {
        reset();
      }, 300);
    } catch (err) {
      console.error("Помилка збереження:", err);
      throw err;
    } finally {
      setErrorMsg(null);
    }
  };

  const breakpointColumnsObj = {
    default: 3,
    768: 2,
    500: 1,
  };

  const renderedPhotos = photos.map((imgUrl, index) => {
    return (
      <div
        key={imgUrl}
        draggable={isEditing}
        onDragStart={() => (dragItem.current = index)}
        onDragEnter={() => (dragOverItem.current = index)}
        onDragEnd={onDragEnd}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => !isEditing && setActiveIndex(index)}
      >
        {!isEditing ? (
          <Modal.Open opens="item-lightbox">
            <PhotoCard
              imgUrl={imgUrl}
              index={index}
              isEditing={isEditing}
              handleRemove={handleRemove}
            />
          </Modal.Open>
        ) : (
          <PhotoCard
            imgUrl={imgUrl}
            index={index}
            isEditing={isEditing}
            handleRemove={handleRemove}
          />
        )}
      </div>
    );
  });

  return (
    <div>
      <Modal>
        {isAdmin && (
          <div className="flex justify-end gap-4 mb-6">
            {!isEditing ? (
              <>
                <Button onClick={() => setIsEditing(true)} style="default">
                  Редагувати галерею
                </Button>
                <Modal.Open opens="add-new-photo">
                  <Button
                    style="default"
                    func={() => {
                      reset();
                      setErrorMsg(null);
                    }}
                  >
                    Додати нову фотографію
                  </Button>
                </Modal.Open>
              </>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  style="default"
                >
                  {isSaving ? <SpinnerMini /> : "Зберегти зміни"}
                </Button>
                <Button
                  onClick={handleCancel}
                  disabled={isSaving}
                  style="cancel"
                >
                  Скасувати
                </Button>
              </>
            )}
          </div>
        )}
        <Modal.Window name="add-new-photo">
          <div className="p-4 md:p-6 md:px-10 rounded-sm max-w-2xl w-[90vw] mx-auto bg-white shadow-2xl text-left">
            <div className="mb-8 border-b border-black/5 pb-4">
              <h2 className="text-2xl italic text-espresso-950">
                Додати нові фотографії
              </h2>
              {errorMsg && (
                <div className="bg-red-300/70 border p-4 text-white mt-4 rounded-sm">
                  <h2 className="">{errorMsg}</h2>
                </div>
              )}
            </div>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="block text-sm text-espresso-950 mb-2 mt-6">
                  Фотографії для галереї
                </label>

                <label className="relative w-full border-2 border-dashed border-black/15 rounded-sm p-4 flex flex-col items-center justify-center text-center hover:bg-beige-50/50 hover:border-espresso-950/30 transition-colors cursor-pointer group mb-4">
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      const newFiles = Array.from(e.target.files || []);
                      if (newFiles.length === 0) return;

                      const currentFiles = getValues("gallery") || [];
                      const currentArray = Array.isArray(currentFiles)
                        ? currentFiles
                        : Array.from(currentFiles as FileList);

                      setValue("gallery", [...currentArray, ...newFiles], {
                        shouldValidate: true,
                      });

                      e.target.value = "";
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 text-espresso-300 mb-3 group-hover:text-espresso-950 transition-colors"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    />
                  </svg>
                  <p className="text-sm text-espresso-950/70">
                    Натисніть або перетягніть нові файли сюди
                  </p>
                  <p className="text-xs text-espresso-950/40 mt-1">
                    Можна додавати поступово (PNG, JPG до 10MB)
                  </p>
                </label>
              </div>
              {galleryArray.length > 0 && (
                <div className="w-full">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-medium text-espresso-950">
                      Завантажено файлів: {galleryArray.length}
                    </p>
                    <button
                      type="button"
                      onClick={() => setValue("gallery", [])}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Очистити всі
                    </button>
                  </div>

                  <div className="max-h-20 overflow-y-auto flex flex-col">
                    {galleryArray.map((file, index) => (
                      <FilePreview
                        key={index}
                        file={file}
                        onRemove={() => {
                          const updatedGallery = galleryArray.filter(
                            (_, i) => i !== index,
                          );
                          setValue("gallery", updatedGallery);
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-4 justify-end pt-4 border-t border-black/5 mt-8">
                <Button
                  style="default"
                  disabled={isSubmitting ? true : false}
                  type="submit"
                >
                  {isSubmitting ? <SpinnerMini /> : "Зберегти"}
                </Button>
                <Modal.Close>
                  <Button style="cancel" disabled={isSubmitting} type="button">
                    Скасувати
                  </Button>
                </Modal.Close>
                <Modal.Close>
                  <button ref={closeRef} type="button" className="hidden" />
                </Modal.Close>
              </div>
            </form>
          </div>
        </Modal.Window>
      </Modal>

      <Modal>
        {isEditing ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {renderedPhotos}
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto gap-6"
            columnClassName="bg-clip-padding flex flex-col gap-6"
          >
            {renderedPhotos}
          </Masonry>
        )}

        <Modal.Window name="item-lightbox">
          <LightboxSlider images={photos} initialIndex={activeIndex} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
