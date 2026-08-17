"use client";

import { useForm } from "react-hook-form";
import { startTransition, useRef } from "react";
import { createGallery } from "../_lib/data-services";
import SpinnerMini from "./SpinnerMini";
import Button from "./Button";
import Modal from "./Modal";
import FilePreview from "./FilePreview";

interface PortfolioFormValues {
  title: string;
  category: string;
  cover: FileList | null;
  gallery: File[];
}

export default function AddNewPortfolioModal() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<PortfolioFormValues>();
  const closeRef = useRef<HTMLButtonElement>(null);

  const coverFile = watch("cover");
  const rawGalleryFiles = watch("gallery");

  const galleryArray = rawGalleryFiles
    ? Array.isArray(rawGalleryFiles)
      ? rawGalleryFiles
      : Array.from(rawGalleryFiles as FileList)
    : [];

  const onSubmit = async (data: PortfolioFormValues) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("category", data.category);

    if (data.cover && data.cover.length > 0) {
      formData.append("coverImage", data.cover[0]);
    }

    if (data.gallery && data.gallery.length > 0) {
      data.gallery.forEach((file) => {
        formData.append("images", file);
      });
    }
    try {
      await createGallery(formData);

      closeRef.current?.click();

      setTimeout(() => {
        reset();
      }, 300);
    } catch (error) {
      console.error("Помилка збереження:", error);
    }
  };

  return (
    <Modal>
      <div className="flex justify-end mb-6">
        <Modal.Open opens={`add-new-portfolio`}>
          <Button style="default">додати нову фотосесію +</Button>
        </Modal.Open>
      </div>
      <Modal.Window name={`add-new-portfolio`}>
        <div className="p-4 md:p-6 md:px-10 rounded-sm max-w-2xl w-[90vw] mx-auto bg-white shadow-2xl text-left">
          <div className="mb-8 border-b border-black/5 pb-4">
            <h2 className="text-2xl italic text-espresso-950">
              Нова фотосесія
            </h2>
            <p className="text-sm text-espresso-950/60">
              Заповніть форму нижче, щоб додати нову галерею до вашого
              портфоліо.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm text-espresso-950 mb-2"
              >
                Назва фотосесії
              </label>
              <input
                id="title"
                type="text"
                placeholder="Наприклад: Весілля Анни та Олега"
                {...register("title", { required: true })}
                className="w-full px-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-espresso-950 text-espresso-950 transition-colors bg-beige-50/30"
              />
            </div>

            <div>
              <label className="block text-sm text-espresso-950 mb-2">
                Категорія
              </label>
              <select
                className="w-full px-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-espresso-950 text-espresso-950 transition-colors bg-beige-50/30 cursor-pointer"
                {...register("category", { required: true })}
              >
                <option value="individual">Індивідуальна</option>
                <option value="couple">Парна</option>
                <option value="family">Сімейна</option>
                <option value="wedding">Весільна</option>
                <option value="commercial">Комерційна</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-espresso-950 mb-2">
                Обкладинка фотосесії
              </label>

              <label className="relative w-full border-2 border-dashed border-black/15 rounded-sm p-4 flex flex-col items-center justify-center text-center hover:bg-beige-50/50 hover:border-espresso-950/30 transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register("cover", { required: true })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {coverFile && coverFile.length > 0 ? (
                  <div className="text-espresso-950 font-medium">
                    <p>Вибрано:</p>
                    <div className="mt-2">
                      <FilePreview
                        file={coverFile[0]}
                        onRemove={() => setValue("cover", null)}
                      />
                    </div>
                  </div>
                ) : (
                  <>
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
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                    <p className="text-sm text-espresso-950/70">
                      Натисніть або перетягніть обкладинку сюди
                    </p>
                    <p className="text-xs text-espresso-950/40 mt-1">
                      1 файл (PNG, JPG до 10MB)
                    </p>
                  </>
                )}
              </label>
            </div>

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
            </div>

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
  );
}
