const TMDB_API_KEY = "80f29af5c7f115765627dce11bec7385";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p";

export type TmdbMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
};

export type TmdbResponse = {
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
};

export const getImageUrl = (path: string | null, size: "w342" | "w500" | "w780" | "original" = "w500") => {
  if (!path) return "/placeholder.svg";
  return `${IMAGE_BASE}/${size}${path}`;
};

export const fetchPopularMovies = async (page = 1): Promise<TmdbResponse> => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  return res.json();
};

export const fetchTrendingMovies = async (): Promise<TmdbResponse> => {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  return res.json();
};

export const fetchTopRatedMovies = async (): Promise<TmdbResponse> => {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch top rated movies");
  return res.json();
};

export const fetchUpcomingMovies = async (): Promise<TmdbResponse> => {
  const res = await fetch(`${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch upcoming movies");
  return res.json();
};

export const searchMovies = async (query: string): Promise<TmdbResponse> => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Failed to search movies");
  return res.json();
};
