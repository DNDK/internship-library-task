import "../../css/Favourites.css";
import { useLocalLiked } from "../../hooks/useLocalLiked";
import { HeartIcon } from "../icons/HeartIcon";
import { FavBookItem } from "./FavBookItem";

export function FavouritesSection() {
  const { getLikedBooks, addLikedBook } = useLocalLiked();

  return (
    <div className="favourites">
      <div className="favourites__header">
        <div className="favourites__icon">
          <HeartIcon />
        </div>
        <div className="favourites__header-text">
          <span className="favourites__header-text-main">Favourites</span>
          <span className="favourites__header-text-secondary">
            i books saved
          </span>
        </div>
      </div>
      <div className="favourites__content">
        {getLikedBooks().map((book, idx) => {
          return <FavBookItem {...book} />;
        })}
      </div>
    </div>
  );
}
