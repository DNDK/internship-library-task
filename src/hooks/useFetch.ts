import { useState, useEffect, useCallback } from "react";

interface UseFetchOptions {
  query?: Record<string, string>;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  immediate?: boolean;
}

export function useFetch<T>(url: string, options?: UseFetchOptions) {
  console.log(url);
  const [data, setData] = useState<T | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const execute = useCallback(
    async (overrideUrl?: string, overrideOptions?: UseFetchOptions) => {
      const finalUrl = overrideUrl ?? url;
      const finalOptions = { ...options, ...overrideOptions };

      if (!finalUrl) return;
      setIsFetching(true);
      setError(null);
      try {
        function withQuery(base: string, query?: Record<string, string>) {
          if (!query) return base;
          const usp = new URLSearchParams(query);
          const sep = base.includes("?") ? "&" : "?";
          return base + sep + usp.toString();
        }
        const response = await fetch(withQuery(finalUrl, finalOptions.query), {
          method: finalOptions?.method ?? "GET",
        });
        if (!response.ok) {
          throw new Error("HTTP error");
        }
        const result = (await response.json()) as T;
        setData(result);
        setError(null);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setIsFetching(false);
      }
    },
    [url, options],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (options?.immediate) void execute();
    };

    if (url && url.length) fetchData();
  }, [options?.immediate, execute, url]);

  return { data, isFetching, error, execute };
}
