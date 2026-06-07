import { useState, useEffect, useCallback } from 'react';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../constants/api';

export const useFetch = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const queryParams = new URLSearchParams({
        api_key: TMDB_API_KEY,
        language: 'en-US',
        ...params,
      }).toString();

      const response = await fetch(`${TMDB_BASE_URL}${endpoint}?${queryParams}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export const useMovieVideos = (movieId) => {
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) return;
    const fetch_videos = async () => {
      try {
        const res = await fetch(
          `${TMDB_BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
        );
        const json = await res.json();
        const found = json.results?.find(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        ) || json.results?.find((v) => v.site === 'YouTube');
        setTrailer(found || null);
      } catch {
        setTrailer(null);
      } finally {
        setLoading(false);
      }
    };
    fetch_videos();
  }, [movieId]);

  return { trailer, loading };
};