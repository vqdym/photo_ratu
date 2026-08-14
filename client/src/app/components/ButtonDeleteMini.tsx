import { MouseEvent } from "react";

export default function ButtonDeleteMini({
  onClick,
  styles,
}: {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  styles: string;
}) {
  return (
    <button onClick={onClick} type="button" title="Видалити" className={styles}>
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
  );
}
