import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
import Modal from "./Modal";

interface ConfirmActionProps {
  onConfirm: (formData: FormData) => void | Promise<any>;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmAction({
  onConfirm,
  confirmText = "Підтвердити",
  cancelText = "Скасувати",
}: ConfirmActionProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex gap-4 justify-center">
      <form
        action={(formData) => {
          startTransition(async () => {
            await onConfirm(formData);
          });
        }}
      >
        <button
          disabled={isPending}
          type="submit"
          className="bg-red-700 rounded-sm text-white px-6 py-3 hover:bg-red-800 transition-colors uppercase tracking-widest text-xs cursor-pointer"
        >
          {isPending ? (
            <span className="flex items-center text-xs justify-center gap-2">
              <SpinnerMini w="5" h="5" />
            </span>
          ) : (
            confirmText
          )}
        </button>
      </form>
      <Modal.Close>
        <button
          type="button"
          className="px-6 py-3 uppercase bg-transparent rounded-sm text-xs text-espresso-950 hover:bg-espresso-950/10 transition-colors cursor-pointer"
        >
          {cancelText}
        </button>
      </Modal.Close>
    </div>
  );
}
