"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";

interface MenuContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error(
      "Компоненти Menu повинні використовуватися всередині <Menu />",
    );
  }
  return context;
}

export default function Menu({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        close();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  return (
    <MenuContext.Provider value={{ isOpen, toggle, close }}>
      <div ref={menuRef} className="relative inline-block text-left">
        {children}
      </div>
    </MenuContext.Provider>
  );
}

function Toggle({ children }: { children?: ReactNode }) {
  const { toggle } = useMenu();
  return (
    <button
      type="button"
      onClick={toggle}
      className="p-2 m-2 text-espresso-950/60 hover:text-espresso-950 hover:bg-beige-50 bg-beige-50/40 rounded-full transition-colors focus:outline-none cursor-pointer"
    >
      {children || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
          />
        </svg>
      )}
    </button>
  );
}

function List({ children }: { children: ReactNode }) {
  const { isOpen } = useMenu();
  if (!isOpen) return null;
  return (
    <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-black/5 shadow-xl rounded-sm z-20 flex flex-col overflow-hidden py-1 animate-fade-in">
      {children}
    </div>
  );
}

interface ItemProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

function Item({
  children,
  onClick,
  disabled = false,
  danger = false,
}: ItemProps) {
  const { close } = useMenu();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    close();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between cursor-pointer ${
        danger
          ? "text-red-600 hover:bg-red-50"
          : "text-espresso-950 hover:bg-beige-50"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {children}
    </button>
  );
}

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Item = Item;
