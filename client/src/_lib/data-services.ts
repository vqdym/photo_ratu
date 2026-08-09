import { cache } from "react";

export const getGallery = async function (category?: string) {
  try {
    const query = category && category !== "all" ? `?category=${category}` : "";

    const response = await fetch(`${process.env.API_URL}/gallery${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Fail while fetching the galleries data: ${response.status}`,
      );
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return { data: null, error: err };
  }
};

export const getGalleryById = cache(async function (id: string) {
  try {
    const response = await fetch(`${process.env.API_URL}/gallery/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Fail while fetching the galleries data: ${response.status}`,
      );
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return { data: null, error: err };
  }
});

export const getLastShoots = async function () {
  try {
    const response = await fetch(
      `${process.env.API_URL}/gallery?sort&limit=${process.env.LAST_SHOOTS_LIMIT}&fields=_id,title,coverImage,category`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `Fail while fetching the galleries data: ${response.status}`,
      );
    }
    const data = await response.json();
    return data.data;
  } catch (err) {
    console.error(err);
    return { data: [], error: err };
  }
};
