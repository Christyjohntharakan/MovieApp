import { useState, useEffect, useRef } from 'react';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../constants/api';

export const useSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) { setResults([]); return; }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
        );
        const json = await res.json();
        setResults(json.results || []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  }, [query]);

  return { query, setQuery, results, loading };
};