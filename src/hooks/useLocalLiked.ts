import type { SearchResDoc } from "../types/api-types";
import { useState, useEffect } from "react";

export function useLocalLiked() {
  const getLikedBooks = () => {
    const itemsStr = localStorage.getItem("library__likedbooks");
    const items = itemsStr ? (JSON.parse(itemsStr) as SearchResDoc[]) : [];
    return items;
  };

  const [likedBooks, setLikedBooks] = useState<SearchResDoc[]>(getLikedBooks());

  const toggleLikedBook = (item: SearchResDoc) => {
    setLikedBooks((prev) => {
      const exists = prev.some((i) => i.key === item.key);
      const next = exists
        ? prev.filter((i) => i.key !== item.key)
        : [...prev, item];

      localStorage.setItem("library__likedbooks", JSON.stringify(next));
      return next;
    });
  };
  return { likedBooks, getLikedBooks, toggleLikedBook };
}
