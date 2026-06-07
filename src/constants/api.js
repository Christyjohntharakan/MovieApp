export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY || '9ac95d99d80d7c265ebe688f49cc25bb';

export const IMAGE_SIZES = {
  poster: {
    small: `${TMDB_IMAGE_BASE}/w185`,
    medium: `${TMDB_IMAGE_BASE}/w342`,
    large: `${TMDB_IMAGE_BASE}/w500`,
  },
  backdrop: {
    small: `${TMDB_IMAGE_BASE}/w780`,
    large: `${TMDB_IMAGE_BASE}/w1280`,
  },
};

export const ENDPOINTS = {
  trending: '/trending/movie/week',
  topRated: '/movie/top_rated',
  upcoming: '/movie/upcoming',
  nowPlaying: '/movie/now_playing',
  search: '/search/movie',
  movieDetail: (id) => `/movie/${id}`,
  videos: (id) => `/movie/${id}/videos`,
  genres: '/genre/movie/list',
};