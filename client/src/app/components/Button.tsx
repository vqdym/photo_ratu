import { ReactNode } from "react";

export default function Button({
  children,
  onClick,
  style,
  type,
  disabled,
  func,
}: {
  children: ReactNode;
  onClick?: () => void;
  style: "default" | "cancel" | "danger";
  type?: "submit" | "button";
  disabled?: boolean;
  func?: () => void;
}) {
  const styles = {
    default:
      "bg-espresso-950 text-beige-50 px-6 py-2 uppercase tracking-widest text-xs rounded-sm hover:bg-espresso-800 transition cursor-pointer",
    cancel:
      "px-6 py-3 uppercase tracking-widest text-xs text-espresso-950 border border-espresso-950/20 hover:bg-espresso-950/5 transition-colors cursor-pointer rounded-sm border border-sm",
    danger:
      "bg-red-700 rounded-sm text-white px-6 py-3 hover:bg-red-800 transition-colors uppercase tracking-widest text-xs cursor-pointer",
  };
  return (
    <button
      onClick={() => {
        if (onClick) onClick();
        if (func) func();
      }}
      disabled={disabled}
      type={type}
      className={styles[style]}
    >
      {children}
    </button>
  );
}
