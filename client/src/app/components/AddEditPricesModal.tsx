"use client";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Modal from "./Modal";
import FilePreview from "./FilePreview";
import SpinnerMini from "./SpinnerMini";
import { useRef } from "react";
import { createService, updateService } from "../_lib/data-services";

interface PricesFormValues {
  name: string;
  price: number;
  image: FileList | null;
  description: string;
  features: string | string[];
}

interface ServiceProps {
  _id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  image?: string;
}

export default function AddEditPricesModal({
  itemToEdit,
}: {
  itemToEdit?: ServiceProps;
}) {
  const isEditSession = Boolean(itemToEdit);
  const editId = itemToEdit?._id;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<PricesFormValues>({
    defaultValues: isEditSession
      ? {
          name: itemToEdit?.name,
          price: itemToEdit?.price,
          description: itemToEdit?.description,
          features: itemToEdit?.features?.join(", "),
        }
      : {},
  });

  const imageFile = watch("image");
  const closeRef = useRef<HTMLButtonElement>(null);

  const onSubmit = async (data: PricesFormValues) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", String(data.price));
    formData.append("description", data.description || "");

    if (data.image && data.image.length > 0) {
      formData.append("photo", data.image[0]);
    }

    let featuresArray: string[] = [];
    if (typeof data.features === "string") {
      featuresArray = data.features.split(",").map((item) => item.trim());
    } else if (Array.isArray(data.features)) {
      featuresArray = data.features;
    }

    featuresArray.forEach((feature) => {
      if (feature) formData.append("features", feature);
    });

    try {
      if (isEditSession) {
        await updateService(editId!, formData);
      } else {
        await createService(formData);
      }

      closeRef.current?.click();
      reset();
    } catch (error) {
      console.error("Помилка збереження:", error);
    }
  };

  return (
    <Modal>
      <div>
        <Modal.Open opens={`add-new-prices`}>
          <Button style="default">
            {isEditSession ? "Редагувати" : "додати новий пакет +"}
          </Button>
        </Modal.Open>
      </div>

      <Modal.Window name={`add-new-prices`}>
        <div className="p-4 md:p-6 md:px-10 rounded-sm max-w-2xl w-[90vw] mx-auto bg-white shadow-2xl text-left max-h-[92vh] overflow-y-auto">
          <div className="mb-8 border-b border-black/5 pb-4">
            <h2 className="text-2xl italic text-espresso-950">
              {isEditSession
                ? `Редагувати: ${itemToEdit?.name}`
                : "Нова фотосесія / пакет"}
            </h2>
            <p className="text-sm text-espresso-950/60">
              {isEditSession
                ? "Оновіть інформацію нижче."
                : "Заповніть форму нижче, щоб додати новий тариф."}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-espresso-950 mb-2"
              >
                Назва
              </label>
              <input
                id="name"
                type="text"
                placeholder="Наприклад: Індивідуальна, Весільна..."
                {...register("name", { required: "Введіть назву" })}
                className="w-full px-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-espresso-950 text-espresso-950 transition-colors bg-beige-50/30"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm text-espresso-950 mb-2"
              >
                Ціна (грн)
              </label>
              <input
                id="price"
                type="number"
                placeholder="1200"
                {...register("price", {
                  required: "Введіть ціну",
                  valueAsNumber: true,
                })}
                className="w-full px-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-espresso-950 text-espresso-950 transition-colors bg-beige-50/30"
              />
            </div>

            <div>
              <label className="block text-sm text-espresso-950 mb-2">
                Обкладинка фотосесії
              </label>

              <label className="relative w-full border-2 border-dashed border-black/15 rounded-sm p-4 flex flex-col items-center justify-center text-center hover:bg-beige-50/50 hover:border-espresso-950/30 transition-colors cursor-pointer group">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  {...register("image", { required: !isEditSession })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {imageFile && imageFile.length > 0 ? (
                  <div className="text-espresso-950 font-medium">
                    <p>Вибрано:</p>
                    <div className="mt-2">
                      <FilePreview
                        file={imageFile[0]}
                        onRemove={() => setValue("image", null)}
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
              <label
                htmlFor="description"
                className="block text-sm text-espresso-950 mb-2"
              >
                Опис
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="Короткий опис пакету чи зйомки..."
                {...register("description")}
                className="w-full px-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-espresso-950 text-espresso-950 transition-colors bg-beige-50/30 resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="features"
                className="block text-sm text-espresso-950 mb-2"
              >
                Особливості (через кому)
              </label>
              <input
                id="features"
                type="text"
                placeholder="1 година зйомки, 80 фото, готовність 7 днів"
                {...register("features", {
                  setValueAs: (value: unknown) =>
                    typeof value === "string"
                      ? value.split(",").map((item) => item.trim())
                      : Array.isArray(value)
                        ? value
                        : [],
                })}
                className="w-full px-4 py-3 border border-black/10 rounded-sm focus:outline-none focus:border-espresso-950 text-espresso-950 transition-colors bg-beige-50/30"
              />
              <p className="text-xs text-espresso-950/40 mt-1">
                Перерахуйте пункти через кому, вони автоматично запишуться
                масивом.
              </p>
            </div>

            <div className="flex gap-4 justify-end pt-4 border-t border-black/5 mt-8">
              <Button style="default" disabled={isSubmitting} type="submit">
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
