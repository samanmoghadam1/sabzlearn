import customFetch from "./custom_fetch";

export async function fetchNavbarCategories() {
  try {
    return await customFetch(
      "http://127.0.0.1:8000/courses/category/",
      "GET",
      undefined,
      {
        cache: "no-store",
        next: { revalidate: false },
      }
    );
  } catch (error) {
    console.error("Error fetching navbar categories:", error);
    throw new Error("An error occurred while fetching categories");
  }
}

export async function fetchCoursesByCategories(id: number) {
  try {
    return await customFetch(
      `http://127.0.0.1:8000/courses/category/${id}`,
      "GET",
      undefined,
      { cache: "no-store", next: { revalidate: false } }
    );
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    throw new Error("An error occurred while fetching courses by category");
  }
}

export async function fetchCourses() {
  try {
    return await customFetch(
      `http://127.0.0.1:8000/courses/`,
      "GET",
      undefined,
      {
        cache: "no-store",
      }
    );
  } catch (error) {
    console.error("Error fetching courses by category:", error);
    throw new Error("An error occurred while fetching courses by category");
  }
}

export async function fetchUserData() {
  if (typeof window !== "undefined") {
    return await customFetch(
      "http://127.0.0.1:8000/api/user-info/",
      "GET",
      undefined
    );
  }
  return null;
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return false;
}

export const fetchPaginatedCourses = async (page: number): Promise<any> => {
  return await customFetch(
    `http://127.0.0.1:8000/courses/?page=${page}`,
    "GET",
    undefined,
  );
};


export const fetchDetailCourse = async (id: number) => {
  const response = await fetch(`http://127.0.0.1:8000/courses/${id}/`);
  if (!response.ok) {
    throw new Error("faild to fetch course detail");
  }
  return await response.json();
};

export const fetchHeadLinesByCourse = async (id: number) => {
  const response = await fetch(
    `http://127.0.0.1:8000/courses/course-headlines/${id}/`
  );
  if (!response.ok) {
    throw new Error("faild to fetch headlines");
  }
  return await response.json();
};

export const fetchLeesonByHeadLine = async (id: number) => {
  return await customFetch(`http://127.0.0.1:8000/courses/lessons/${id}`, "GET");
};

export const fetchReviewsByCourse = async (id: number) => {
  const response = await fetch(`http://127.0.0.1:8000/reviews/${id}`);
  if (!response.ok) {
    throw new Error("faild to fetch reviews");
  }
  return await response.json();
};

export const fetchUserProfile = async (id: number) => {
  const response = await fetch(`http://127.0.0.1:8000/profile/${id}/`);
  if (!response.ok) {
    throw new Error("faild to fetch reviews");
  }
  return await response.json();
};

export const fetchCoursesByUser = async (id: number) => {
  const response = await fetch(`http://127.0.0.1:8000/courses/user/${id}/`);
  if (!response.ok) {
    throw new Error("faild to fetch courses by user");
  }
  return await response.json();
};

export const fetchCoursesByUserOrder = async () => {
  const token = getToken();
  if (token) {
    try {
      const response = await fetch("http://127.0.0.1:8000/orders/cart/list/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data || null;
      }
      throw new Error("Failed to fetch user data");
    } catch (error) {
      console.error("Error fetchin user data: ", error);
      throw error;
    }
  }
};

export const fecthLessonById = async (id: number) => {
  const response = await fetch(`http://127.0.0.1:8000/courses/lesson/${id}/`);
  if (!response.ok) {
    throw new Error("faild to fetch lesson by id");
  }
  return await response.json();
};