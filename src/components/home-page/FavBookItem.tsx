import type { SearchResDoc } from "../../types/api-types";
import { CoverImg } from "../ui/CoverImg";

import "../../css/FavBookItem.css";
import { HeartIcon } from "../icons/HeartIcon";
import { useLikedBooksContext } from "../../context/LikedBooksProvider";

export function FavBookItem(props: { book: SearchResDoc }) {
  const likedContext = useLikedBooksContext();
  return (
    <div className="favourite-book" key={props.book.key}>
      <div className="favourite-book__cover">
        <CoverImg
          coverId={props.book.cover_i}
          className="favourite-book__cover-img"
        />
      </div>
      <div className="favourite-book__details">
        <h3 className="favourite-book__title">{props.book.title}</h3>
        <div className="favourite-book__ap-container">
          <span className="favourite-book__author">
            {props.book.author_name}
          </span>
          <span className="facourite-book__publishYear">
            {props.book.first_publish_year}
          </span>
        </div>
      </div>
      <div>
        <button
          className="favourite-book__toggle-btn"
          onClick={() => likedContext?.toggleLikedBook(props.book)}
        >
          <HeartIcon fill="red" color="red" />
        </button>
      </div>
    </div>
  );
}
