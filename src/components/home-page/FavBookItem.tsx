import type { SearchResDoc } from "../../types/api-types";
import { CoverImg } from "../ui/CoverImg";

import "../../css/FavBookItem.css";
import { HeartIcon } from "../icons/HeartIcon";

export function FavBookItem(props: SearchResDoc) {
  return (
    <div className="favourite-book">
      <div className="favourite-book__cover">
        <CoverImg
          coverId={props.cover_i}
          className="favourite-book__cover-img"
        />
      </div>
      <div className="favourite-book__details">
        <h3 className="favourite-book__title">{props.title}</h3>
        <div className="favourite-book__ap-container">
          <span className="favourite-book__author">{props.author_name}</span>
          <span className="facourite-book__publishYear">
            {props.first_publish_year}
          </span>
        </div>
      </div>
      <div>
        <button className="favourite-book__toggle-btn">
          <HeartIcon />
        </button>
      </div>
    </div>
  );
}
