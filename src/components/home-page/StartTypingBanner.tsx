import { BookSearchIcon } from "../ui/BookSearchIcon";

import "../../css/Banner.css";

export function StartTypingBanner(props: { className: string }) {
  return (
    <div className={`${props.className} banner`}>
      <BookSearchIcon />
      Start typing to find your favourite books
    </div>
  );
}
