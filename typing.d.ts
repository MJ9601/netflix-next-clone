export type MoviesRespObj = {
  page: number;
  results: MovieRespObj[];
  total_pages: number;
  total_results: number;
};

export type MoviesObject = {
  fetchActionMovies: MoviesRespObj;
  fetchComedyMovies: MoviesRespObj;
  fetchDocumentaries: MoviesRespObj;
  fetchHorrorMovies: MoviesRespObj;
  fetchNetflixOriginals: MoviesRespObj;
  fetchRomanceMovies: MoviesRespObj;
  fetchTopRated: MoviesRespObj;
  fetchTrending: MoviesRespObj;
};

export interface MovieRespObj {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface MovieObjectOnPage {
  backdrop_path: string;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity?: number;
  poster_path: string;
  release_date: string;
  status: string;
  tagline: string;
  title: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }
  ];
  videos: {
    results: [
      { id: string; key: string; type: string; name: string; site: string }
    ];
  };
}
