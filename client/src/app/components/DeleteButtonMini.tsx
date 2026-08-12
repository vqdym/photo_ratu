"use client";
import { useContext } from "react";
import { deleteGallery } from "../_lib/data-services";
import ConfirmAction from "./ConfirmAction";
import Modal, { ModalContext } from "./Modal";

export default function DeleteButtonMini({
  id,
  onCloseModal,
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
          <button
            type="button"
            title="Видалити"
            className="absolute top-4 right-4 z-20 cursor-pointer
          flex items-center justify-center p-2 rounded-full bg-beige-300
          backdrop-blur-sm text-espresso-950 shadow-sm hover:bg-red-700
          hover:text-white transition-all duration-300 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </Modal.Open>
      </div>

      <Modal.Window name={`delete-modal-${id}`}>
        <div className="p-8 rounded-sm text-center max-w-sm mx-auto bg-white">
          <h3 className="text-2xl italic text-espresso-950 mb-2">
            Ви впевнені?
          </h3>
          <p className="text-sm text-espresso-950/70 mb-8">
            Ви збираєтесь назавжди видалити цю фотосесію. Цю дію неможливо буде
            скасувати.
          </p>

          <ConfirmAction
            onConfirm={deleteAction}
            confirmText="Так, видалити"
            cancelText="Скасувати"
          />
        </div>
      </Modal.Window>
    </Modal>
  );
}
