"use client";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "../_lib/actions/auth";

export default function LogoutButton() {
  const pathname = usePathname();

  return (
    <form action={logoutAdmin} className="absolute top-full mt-8 left-0">
      <input type="hidden" name="currentPath" value={pathname} />

      <button
        type="submit"
        className="cursor-pointer border border-beige-100 p-4 transition-all text-beige-100 duration-500 hover:bg-espresso-950/50"
      >
        Вийти з режиму адміністратора
      </button>
    </form>
  );
}
