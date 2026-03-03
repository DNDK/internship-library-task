import { useState } from "react";
import { CoverImg } from "../ui/CoverImg";
import "../../css/BookCard.css";
import { HeartIcon } from "../icons/HeartIcon";

interface BookCardProps {
  id: string;
  coverId: number;
  title: string;
  authors: string[];
  publishYear: number;
  isLiked: boolean;
  onLike: (id: string) => void;
}

export function BookCard(props: BookCardProps) {
  return (
    <div className="book-card">
      <button
        className="book-card__like_button"
        onClick={() => props.onLike(props.id)}
      >
        <HeartIcon
          fill={props.isLiked ? "red" : "transparent"}
          color={props.isLiked ? "red" : "current"}
        />
      </button>
      <div className="book-card__cover_container">
        <CoverImg coverId={props.coverId} className="book-card__cover" />
      </div>
      <div className="book-card__details">
        <h3 className="book-card__details_title">{props.title}</h3>
        <div className="book-card__details_ap-container">
          <span className="book-card__details_author">
            {props.authors?.[0] ?? props.authors}
          </span>
          <span className="book-card__details_publish-year">
            {props.publishYear}
          </span>
        </div>
      </div>
    </div>
  );
}
