"use client";

import { useState, useRef } from "react";
import AddNewPricesModal from "./AddEditPricesModal";
import PricesCard from "./PricesCard";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";
import handleSort from "@/utils/handleSort";
import { editPrices, isCategoryInUse } from "../_lib/data-services";
import { ServiceProps } from "@/types/Service";
import Menu from "./Menu";
import Modal from "./Modal";
import Link from "next/link";

export default function InteractivePricesGrid({
  services: initialServices,
  isAdmin,
  buttonText,
}: {
  services: ServiceProps[];
  isAdmin: boolean;
  buttonText: string;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [prevInitialServices, setPrevInitialServices] =
    useState<ServiceProps[]>(initialServices);
  const [services, setServices] = useState<ServiceProps[]>(initialServices);
  const [archivedIds, setArchivedIds] = useState<string[]>([]);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [warningService, setWarningService] = useState<ServiceProps | null>(
    null,
  );
  const [isChecking, setIsChecking] = useState(false);
  const [restoredIds, setRestoredIds] = useState<string[]>([]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  if (initialServices !== prevInitialServices) {
    setPrevInitialServices(initialServices);
    setServices(initialServices);
  }

  const onDragEnd = () => {
    handleSort(dragItem, dragOverItem, services, setServices);
  };

  // Функція для переміщення карток цін кнопками на мобільних
  const moveService = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= services.length) return;

    const updatedServices = [...services];
    const [movedItem] = updatedServices.splice(index, 1);
    updatedServices.splice(newIndex, 0, movedItem);
    setServices(updatedServices);
  };

  const handleArchive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s._id === id ? { ...s, isActive: false } : s)),
    );

    setArchivedIds((prev) => [...new Set([...prev, id])]);
    setRestoredIds((prev) => prev.filter((restoredId) => restoredId !== id));
  };

  const handleDelete = async (service: ServiceProps) => {
    setIsChecking(true);
    try {
      const isInUse = await isCategoryInUse(service.nameEn);

      if (isInUse) {
        setWarningService(service);

        setTimeout(() => {
          document.getElementById("trigger-warning-modal")?.click();
        }, 0);
      } else {
        setServices(services.filter((s) => s._id !== service._id));
        setDeletedIds((prev) => [...prev, service._id]);
      }
    } catch (err) {
      console.error("Помилка видалення:", err);
    } finally {
      setIsChecking(false);
    }
  };

  const handleCancel = () => {
    setServices(initialServices);
    setArchivedIds([]);
    setDeletedIds([]);
    setRestoredIds([]);
    setIsEditing(false);
  };

  const handleRestore = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s._id === id ? { ...s, isActive: true } : s)),
    );

    setRestoredIds((prev) => [...new Set([...prev, id])]);
    setArchivedIds((prev) => prev.filter((archivedId) => archivedId !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await editPrices(services, archivedIds, deletedIds, restoredIds);

      setIsEditing(false);
      setArchivedIds([]);
      setDeletedIds([]);
      setRestoredIds([]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderedPrices = services.map(
    (service: ServiceProps, index: number) => {
      const isArchived = service.isActive === false;

      return (
        <div
          key={service._id}
          draggable={isEditing}
          onDragStart={() => (dragItem.current = index)}
          onDragEnter={() => (dragOverItem.current = index)}
          onDragEnd={onDragEnd}
          onDragOver={(e) => e.preventDefault()}
          className={`relative ${
            index !== services.length - 1 ? "mb-20 md:mb-24" : ""
          } ${isEditing ? "cursor-move" : ""}`}
        >
          <div className={isArchived ? "opacity-60 transition-opacity" : ""}>
            <PricesCard
              isArchived={isArchived}
              title={service.name}
              price={service.price}
              imageUrl={service.imageUrl}
              description={service.description}
              features={service.features}
              index={index}
              isEditing={isEditing}
              buttonText={buttonText}
            />
          </div>

          {isEditing && (
            <div className="absolute top-6 right-6 z-30">
              <Menu>
                <Menu.Toggle />

                <AddNewPricesModal itemToEdit={service} />

                <Menu.List>
                  <Menu.Item
                    onClick={() =>
                      document.getElementById(`trigger-${service._id}`)?.click()
                    }
                  >
                    Редагувати
                  </Menu.Item>

                  {!isArchived && (
                    <Menu.Item onClick={() => handleArchive(service._id)}>
                      Архівувати
                    </Menu.Item>
                  )}

                  {isArchived && (
                    <Menu.Item onClick={() => handleRestore(service._id)}>
                      Відновити
                    </Menu.Item>
                  )}

                  <Menu.Item danger onClick={() => handleDelete(service)}>
                    Видалити
                  </Menu.Item>
                </Menu.List>
              </Menu>
            </div>
          )}

          {isEditing && (
            <div className="absolute top-4 left-4 flex gap-1 z-20 md:hidden bg-black/70 p-1.5 rounded-sm backdrop-blur-sm shadow-md">
              <button
                type="button"
                onClick={() => moveService(index, "up")}
                disabled={index === 0}
                className="px-3 py-1 text-white text-xs bg-white/20 rounded disabled:opacity-30"
              >
                ↑ Вгору
              </button>
              <button
                type="button"
                onClick={() => moveService(index, "down")}
                disabled={index === services.length - 1}
                className="px-3 py-1 text-white text-xs bg-white/20 rounded disabled:opacity-30"
              >
                ↓ Вниз
              </button>
            </div>
          )}
        </div>
      );
    },
  );

  return (
    <>
      {isAdmin && (
        <div className="flex items-center justify-end gap-4 mb-10">
          {!isEditing ? (
            <>
              <Button onClick={() => setIsEditing(true)} style="default">
                Редагувати ціни
              </Button>
              <AddNewPricesModal />
            </>
          ) : (
            <>
              <Button onClick={handleSave} disabled={isSaving} style="default">
                {isSaving ? <SpinnerMini /> : "Зберегти зміни"}
              </Button>
              <Button onClick={handleCancel} disabled={isSaving} style="cancel">
                Скасувати
              </Button>
            </>
          )}
        </div>
      )}
      <div className="flex flex-col">{renderedPrices}</div>
      <Modal>
        <Modal.Open opens="warning-window">
          <button id="trigger-warning-modal" className="hidden" type="button" />
        </Modal.Open>

        <Modal.Window name="warning-window">
          <div className="p-6 md:p-8 flex flex-col rounded-sm max-w-md w-[90vw] mx-auto bg-white shadow-2xl text-left">
            <h3 className="text-xl font-medium text-espresso-950 mb-3">
              Неможливо видалити пакет
            </h3>

            <p className="text-sm text-espresso-950/70 mb-8 leading-relaxed">
              Ви не можете назавжди видалити пакет{" "}
              <strong>{warningService?.name}</strong>, оскільки у вашому
              портфоліо є фотографії з цією категорією. <br />
              <br />
              Спочатку видаліть відповідні фотосесії з портфоліо, або
              скористайтеся функцією <strong>«Архівувати»</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-4">
              <Modal.Close>
                <Link
                  href={`/portfolio?category=${warningService?.nameEn?.toLowerCase()}`}
                  className="px-5 py-2.5 text-sm font-medium bg-espresso-950 text-white hover:bg-espresso-900 rounded-sm transition-colors text-center block"
                >
                  В портфоліо
                </Link>
              </Modal.Close>
              <Modal.Close>
                <Button style="cancel" type="button">
                  Скасувати
                </Button>
              </Modal.Close>
            </div>
          </div>
        </Modal.Window>
      </Modal>
    </>
  );
}
