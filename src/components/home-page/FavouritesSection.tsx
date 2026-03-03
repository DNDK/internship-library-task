import { useState, useEffect } from "react";

import "../../css/Favourites.css";
import { useLocalLiked } from "../../hooks/useLocalLiked";
import { HeartIcon } from "../icons/HeartIcon";
import { FavBookItem } from "./FavBookItem";
import type { SearchResDoc } from "../../types/api-types";

export function FavouritesSection(props: { books: SearchResDoc[] }) {
  return (
    <div className="favourites">
      <div className="favourites__header">
        <div className="favourites__icon">
          <HeartIcon />
        </div>
        <div className="favourites__header-text">
          <span className="favourites__header-text-main">Favourites</span>
          <span className="favourites__header-text-secondary">
            {props.books.length} books saved
          </span>
        </div>
      </div>
      <div className="favourites__content">
        {props.books.map((book) => {
          return <FavBookItem book={book} />;
        })}
      </div>
    </div>
  );
}
