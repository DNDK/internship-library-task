import "../../css/Banner.css";
import { SearchXIcon } from "../icons/SearcXIcon";

export function NothingFoundBanner(props: { className: string }) {
  return (
    <div className={`${props.className} banner`}>
      <SearchXIcon />
      Unfortunately no books match your query, try searching something else
    </div>
  );
}
