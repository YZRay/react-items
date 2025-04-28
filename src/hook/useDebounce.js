import { useState, useEffect } from "react";

export default function useDebounce(value, delay = 500) {
  const [debouncedSearch, setDebouncedSearch] = useState(value);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setDebouncedSearch(value);
    }, delay);

    return () => clearTimeout(debounce);
  }, [value, delay]);

  return debouncedSearch;
}
