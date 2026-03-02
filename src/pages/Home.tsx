import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

import "../css/Home.css";
import "../css/Loader.css";
import { SearchBar } from "../components/home-page/SearchBar";
import { useDebounce } from "../hooks/useDebounce";
import type { SearchResult } from "../types/api-types";
import { BookCard } from "../components/home-page/BookCard";
import { FavouritesSection } from "../components/home-page/FavouritesSection";
import { useLocalLiked } from "../hooks/useLocalLiked";
import { BookSearchIcon } from "../components/ui/BookSearchIcon";
import { StartTypingBanner } from "../components/home-page/StartTypingBanner";
import { NothingFoundBanner } from "../components/home-page/NothingFoundBanner";

export function HomePage() {
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const queryDebounced = useDebounce<string>(query, 500);
  const { data, error, execute } = useFetch<SearchResult>("/api/search.json", {
    immediate: false,
  });

  useEffect(() => {
    const handleSmallQuery = () => setIsFetching(false);
    const search = async () => {
      execute(undefined, { query: { q: queryDebounced } }).then((res) => {
        setIsFetching(false);
        console.log(data);
      });
    };
    if (queryDebounced && queryDebounced.length >= 3) search();
    else handleSmallQuery();
  }, [queryDebounced]);

  const { getLikedBooks, addLikedBook } = useLocalLiked();

  const renderMainContent = () => {
    if (isFetching) {
      return (
        <div className="homepage__loader-container">
          <div className="loader" />
          <div>Searching...</div>
        </div>
      );
    }
    if (!query?.length) {
      return <StartTypingBanner className="homepage__banner" />;
    }
    if (!data?.docs.length) {
      return <NothingFoundBanner className="homepage__banner" />;
    }
    return (
      <div className="homepage__search-results">
        {data.docs.map((doc, idx) => {
          return (
            <BookCard
              title={doc.title}
              authors={doc.author_name}
              publishYear={doc.first_publish_year}
              key={idx}
              coverId={doc.cover_i}
              id={doc.key}
              onLike={(id) =>
                addLikedBook(data.docs.find((doc) => doc.key === id))
              }
            />
          );
        })}
      </div>
    );
  };
  return (
    <div>
      <div className="homepage__banner">
        <h2>Discover Your Next Great Read</h2>
        <p>
          Search million of books, build your personal library, and never lose
          track of what to read next
        </p>
      </div>
      <div className="homepage__search">
        <SearchBar
          value={query}
          onValueChange={(val) => {
            setIsFetching(true);
            setQuery(val);
          }}
        />
      </div>
      <div className="homepage__content-container">
        {renderMainContent()}
        <div className="homepage__fav-container">
          <FavouritesSection />
        </div>
      </div>
    </div>
  );
}
