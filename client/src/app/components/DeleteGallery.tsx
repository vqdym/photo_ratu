"use client";
import { useContext } from "react";
import { deleteGallery } from "../_lib/data-services";
import ConfirmAction from "./ConfirmAction";
import Modal, { ModalContext } from "./Modal";
import ButtonDeleteMini from "./ButtonDeleteMini";
import ModalSure from "./ModalSure";

export default function DeleteGallery({
  id,
}: {
  id: string;
  onCloseModal?: () => void;
}) {
  const deleteAction = deleteGallery.bind(null, id);
  const context = useContext(ModalContext);
  return (
    <Modal>
      <div>
        <Modal.Open opens={`delete-modal-${id}`}>
          <ButtonDeleteMini
            styles="absolute top-4 right-4 z-20 cursor-pointer
          flex items-center justify-center p-1 md:p-2 rounded-full bg-beige-300
          backdrop-blur-sm text-espresso-950 shadow-sm hover:bg-red-700
          hover:text-white transition-all duration-300 group"
          />
        </Modal.Open>
      </div>

      <Modal.Window name={`delete-modal-${id}`}>
        <ModalSure
          text="Ви збираєтесь назавжди видалити цю фотосесію. Цю дію неможливо буде
      скасувати."
        >
          <ConfirmAction
            onConfirm={deleteAction}
            confirmText="Так, видалити"
            cancelText="Скасувати"
          />
        </ModalSure>
      </Modal.Window>
    </Modal>
  );
}
