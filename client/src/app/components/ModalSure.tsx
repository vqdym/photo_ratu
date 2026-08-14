import { ReactNode } from "react";

export default function ModalSure({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) {
  return (
    <div className="p-8 rounded-sm text-center max-w-sm mx-auto bg-white">
      <h3 className="text-2xl italic text-espresso-950 mb-2">Ви впевнені?</h3>
      <p className="text-sm text-espresso-950/70 mb-8">{text}</p>

      {children}
    </div>
  );
}
