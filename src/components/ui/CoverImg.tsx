import React, { useState, useEffect, useRef } from "react";
import { BookXIcon } from "../icons/BookXIcon";
import "../../css/CoverImg.css";

const IMG_BASE_URL = import.meta.env.VITE_IMG_BASE_URL;

export function CoverImg(props: { coverId?: number; className: string }) {
  const lowSrc = `${IMG_BASE_URL}${props.coverId}-S.jpg`;
  const src = `${IMG_BASE_URL}${props.coverId}.jpg`;

  const [currentSrc, setCurrentSrc] = useState(lowSrc);

  const [error, setError] = useState(!props.coverId);

  const imgRef = useRef<HTMLImageElement | null>(null);
  useEffect(() => {
    const target = imgRef.current;
    if (target) {
      const imageFull = new Image();
      imageFull.src = src;
      imageFull.onload = () => {
        target.src = src;
        target.style.transform = "none";
        target.style.filter = "none";
      };
    }
  });

  return (
    <>
      {!error ? (
        <img
          className={`${props.className} book-cover__image`}
          src={lowSrc}
          loading="lazy"
          onError={() => setError(true)}
          ref={imgRef}
          style={{
            filter: "blur(10px)",
            transform: "scale(110%)",
          }}
        />
      ) : (
        <div className={`${props.className} book-cover__fallback`}>
          <BookXIcon style={{ color: "gray", height: "40%", width: "100%" }} />
          <div>No cover</div>
        </div>
      )}
    </>
  );
}
