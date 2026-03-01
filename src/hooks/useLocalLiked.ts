import type { SearchResDoc } from "../types/api-types";

export function useLocalLiked() {
  const getLikedBooks = () => {
    const itemsStr = localStorage.getItem("library__likedbooks");
    const items = itemsStr ? (JSON.parse(itemsStr) as SearchResDoc[]) : [];
    return items;
  };

  const addLikedBook = (item: SearchResDoc) => {
    const items = getLikedBooks();
    const itemsJSON = JSON.stringify([...items, item]);
    localStorage.setItem("library__likedbooks", itemsJSON);
  };

  return { getLikedBooks, addLikedBook };
}
