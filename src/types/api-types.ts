interface SearchResDoc {
  cover_i: number;
  title: string;
  author_name: string[];
  first_publish_year: number;
  key: string;
}

interface SearchResult {
  start: number;
  num_found: number;
  docs: SearchResDoc[];
}

export type { SearchResDoc, SearchResult };
