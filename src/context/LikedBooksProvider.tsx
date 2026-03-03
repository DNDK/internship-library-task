import type { SearchResDoc } from "../types/api-types";
import { useState, createContext, useContext, type ReactNode } from "react";

interface LikedBooksContextType {
  likedBooks: SearchResDoc[];
  likedKeySet: Set<string>;
  toggleLikedBook: (item: SearchResDoc) => void;
}

const LikedBooksContext = createContext<LikedBooksContextType | null>(null);

export function LikedBooksProvider(props: { children: ReactNode }) {
  const getLikedBooks = () => {
    const itemsStr = localStorage.getItem("library__likedbooks");
    const items = itemsStr ? (JSON.parse(itemsStr) as SearchResDoc[]) : [];
    return items;
  };

  const [likedBooks, setLikedBooks] = useState<SearchResDoc[]>(getLikedBooks());
  const [likedKeySet, setLikedKeySet] = useState<Set<string>>(
    new Set(likedBooks.map((b) => b.key)),
  );

  const toggleLikedBook = (item: SearchResDoc) => {
    setLikedBooks((prev) => {
      const exists = likedKeySet.has(item.key);
      const next = exists
        ? prev.filter((i) => i.key !== item.key)
        : [...prev, item];
      setLikedKeySet(new Set(next.map((b) => b.key)));
      localStorage.setItem("library__likedbooks", JSON.stringify(next));
      return next;
    });
  };
  return (
    <LikedBooksContext.Provider
      value={{ likedBooks, likedKeySet, toggleLikedBook }}
    >
      {props.children}
    </LikedBooksContext.Provider>
  );
}

export function useLikedBooksContext() {
  const context = useContext(LikedBooksContext);
  return context;
}
