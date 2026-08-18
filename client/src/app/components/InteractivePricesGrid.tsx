"use client";

import { useState, useRef, useEffect } from "react";
import AddNewPricesModal from "./AddEditPricesModal";
import PricesCard from "./PricesCard";
import Button from "./Button";
import SpinnerMini from "./SpinnerMini";
import handleSort from "@/utils/handleSort";
import { editPrices } from "../_lib/data-services";
// Тут імпортуєш функцію для збереження порядку та видалення з бекенду
// import { savePricesChanges } from "../_lib/data-services";

interface ServiceProps {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  features: string[];
  __v: number;
}

export default function InteractivePricesGrid({
  services: initialServices,
  isAdmin,
}: {
  services: ServiceProps[];
  isAdmin: boolean;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [prevInitialServices, setPrevInitialServices] =
    useState<ServiceProps[]>(initialServices);
  const [services, setServices] = useState<ServiceProps[]>(initialServices);
  const [deletedIds, setDeletedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  if (initialServices !== prevInitialServices) {
    setPrevInitialServices(initialServices);
    setServices(initialServices);
  }

  const onDragEnd = () => {
    handleSort(dragItem, dragOverItem, services, setServices);
  };

  const handleRemove = (idToRemove: string) => {
    setServices(services.filter((s) => s._id !== idToRemove));
    setDeletedIds((prev) => [...prev, idToRemove]);
  };

  const handleCancel = () => {
    setServices(initialServices);
    setDeletedIds([]);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await editPrices(services, deletedIds);

      setIsEditing(false);
      setDeletedIds([]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const renderedPrices = services.map(
    (service: ServiceProps, index: number) => (
      <div
        key={service._id}
        draggable={isEditing}
        onDragStart={() => (dragItem.current = index)}
        onDragEnter={() => (dragOverItem.current = index)}
        onDragEnd={onDragEnd}
        onDragOver={(e) => e.preventDefault()}
        className={isEditing ? "cursor-move" : ""}
      >
        <PricesCard
          title={service.name}
          price={service.price}
          imageUrl={service.imageUrl}
          description={service.description}
          features={service.features}
          index={index}
          isEditing={isEditing}
          onRemove={() => handleRemove(service._id)}
          editComponent={<AddNewPricesModal itemToEdit={service} />}
        />
      </div>
    ),
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
      <div className="flex flex-col gap-12">{renderedPrices}</div>
    </>
  );
}
