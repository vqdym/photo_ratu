"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { cache } from "react";
import { getJWT } from "./actions/auth";

export const getGallery = async function (category?: string) {
  try {
    const query = category && category !== "all" ? `?category=${category}` : "";

    const response = await axios.get(`${process.env.API_URL}/gallery${query}`);

    return response.data.data;
  } catch (err) {
    console.error("Помилка getGallery:", err.response?.data || err.message);
    return { data: null, error: err.message };
  }
};

export const getGalleryById = cache(async function (id: string) {
  try {
    const response = await axios(`${process.env.API_URL}/gallery/${id}`);

    return response.data.data;
  } catch (err) {
    console.error("Помилка getGalleryById:", err.response?.data || err.message);
    return null;
  }
});

export const createGallery = async function (formData: FormData) {
  try {
    const token = await getJWT();
    console.log("Мій токен з кукі:", token);
    if (!token) {
      throw new Error("Немає доступу. Ви не адміністратор.");
    }
    const response = await axios.post(
      `${process.env.API_URL}/gallery`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    revalidatePath("/portfolio");
    revalidatePath("/");
    return response.data;
  } catch (err: any) {
    console.error("Помилка createGallery:", err.response?.data || err.message);
    throw new Error(
      err.response?.data?.message || "Помилка при створенні галереї",
    );
  }
};

export const deleteGallery = async function (id: string) {
  try {
    const token = await getJWT();

    if (!token) {
      throw new Error("Немає доступу. Ви не адміністратор.");
    }

    await axios.delete(`${process.env.API_URL}/gallery/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidatePath("/portfolio");
    revalidatePath("/");
  } catch (err: any) {
    console.error("Помилка deleteGallery:", err.response?.data || err.message);
  }
};

export const editGallery = async (
  id: string,
  photos: string[],
  deletedUrls: string[],
) => {
  try {
    const token = await getJWT();
    const res = await axios.patch(
      `${process.env.API_URL}/gallery/${id}/manage-photos`,
      {
        images: photos,
        deletedImages: deletedUrls,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (err: any) {
    console.error("Помилка editGallery:", err.response?.data || err.message);
    throw err;
  }
};

export const addNewPhotosToGallery = async (id: string, formData: FormData) => {
  try {
    const token = await getJWT();
    const res = await axios.patch(
      `${process.env.API_URL}/gallery/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (err: any) {
    console.error("Помилка editGallery:", err.response?.data || err.message);
    throw err;
  } finally {
    revalidatePath(`/portfolio/${id}`);
  }
};

export const getLastShoots = async function () {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/gallery?sort&limit=${process.env.LAST_SHOOTS_LIMIT}&fields=_id,title,coverImage,category`,
    );

    return response.data.data;
  } catch (err: any) {
    console.error("Помилка getLastShoots:", err.response?.data || err.message);
    return { data: [], error: err.message };
  }
};
