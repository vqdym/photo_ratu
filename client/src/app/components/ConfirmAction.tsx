import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
import Modal from "./Modal";
import Button from "./Button";

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
        <Button style="danger" disabled={isPending} type="submit">
          {isPending ? (
            <span className="flex items-center text-xs justify-center gap-2">
              <SpinnerMini w="5" h="5" />
            </span>
          ) : (
            confirmText
          )}
        </Button>
      </form>
      <Modal.Close>
        <Button type="button" style="cancel">
          {cancelText}
        </Button>
      </Modal.Close>
    </div>
  );
}
