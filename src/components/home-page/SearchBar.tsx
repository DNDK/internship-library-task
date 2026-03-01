import { SearchBarIcon } from "../icons/SearchIcon";
import "../../css/SearchBar.css";

interface SearchBarProps {
  value: string;
  onValueChange: (val: string) => void;
}

export function SearchBar(props: SearchBarProps) {
  return (
    <div className="searchbar">
      <SearchBarIcon className="searchbar__icon" />
      <input
        className="searchbar__input"
        name="search"
        id="search"
        value={props.value}
        onChange={(e) => props.onValueChange(e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}
