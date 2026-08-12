import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  style,
  type,
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  style: "default" | "cancel" | "danger";
  type?: "submit" | "button";
  disabled?: boolean;
}) {
  const styles = {
    default:
      "uppercase bg-espresso-950/70 text-beige-50 px-6 py-3 cursor-pointer transition-all duration-300 hover:bg-espresso-600/90 rounded-sm",
    cancel:
      "px-6 py-3 uppercase tracking-widest text-xs text-espresso-950 border border-espresso-950/20 hover:bg-espresso-950/5 transition-colors cursor-pointer rounded-sm",
    danger:
      "bg-red-700 rounded-sm text-white px-6 py-3 hover:bg-red-800 transition-colors uppercase tracking-widest text-xs cursor-pointer",
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={styles[style]}
    >
      {children}
    </button>
  );
}
