import { type ReactNode } from "react";

import "../css/DefaultLayout.css";
import { BookIcon } from "../components/icons/BookIcon";
export function DefaultLayout(props: { children: ReactNode }) {
  return (
    <div>
      <header className="layout__header">
        <div className="layout__header_logo">
          <BookIcon />
        </div>
        <div className="layout__header_text">
          <h1>The Library</h1>
          <p>Discover your next favourite book</p>
        </div>
      </header>
      <main>{props.children}</main>
      <footer></footer>
    </div>
  );
}
