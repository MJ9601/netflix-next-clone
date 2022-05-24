const { API_KEY } = process.env;
// console.log(API_KEY);

export const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default {
  Trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  "Netflix Originals": `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  "Top Rated": `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  "Action Movies": `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  "Comedy Movies": `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  "Horror Movies": `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  "Romance Movies": `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  Documentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export const urlForMovieWithId = (movieId: string | number) =>
  `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`;
