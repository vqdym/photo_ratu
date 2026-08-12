"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const loginAdmin = async function (prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(`${process.env.API_URL}/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.message || "Неправильний логін або пароль" };
    }

    if (data.token) {
      const cookieStore = await cookies();
      cookieStore.set("jwt", data.token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
  } catch (error) {
    return { error: "Помилка з'єднання з сервером." };
  }
};

export async function logoutAdmin(formData: FormData) {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  const currentPath = formData.get("currentPath")?.toString() || "/uk";
  redirect(currentPath);
}

export async function jwtCookie() {
  const cookieStore = await cookies();
  return cookieStore.has("jwt");
}

export async function getJWT() {
  const cookieStore = await cookies();
  return cookieStore.get("jwt")?.value;
}
