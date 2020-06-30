import {API_HOST, API_KEY, LANG} from '../utils/constants';

export const getNewsMoviesApi = async (page = 1) => {
  const url = `${API_HOST}/movie/now_playing?api_key=${API_KEY}&language=${LANG}&page=${page}`;
  const response = await fetch(url);
  return response.json();
};

export const getGenreMoviesApi = async idGenres => {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
  const response = await fetch(url);
  const result = await response.json();
  const arrayGenre = [];
  idGenres.map(id => {
    result.genres.map(item => {
      item.id === id && arrayGenre.push(item.name);
    });
  });
  return arrayGenre;
};

export const getAllGenresApi = async () => {
  const url = `${API_HOST}/genre/movie/list?api_key=${API_KEY}&language=${LANG}`;
  const response = await fetch(url);
  return response.json();
};

export const getGenreMovieApi = async idGenre => {
  const url = `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${idGenre}&language=${LANG}`;
  const response = await fetch(url);
  return response.json();
};

export const getMovieByIdApi = async id => {
  const url = `${API_HOST}/movie/${id}?api_key=${API_KEY}&language=${LANG}`;
  const response = await fetch(url);
  return response.json();
};

export const getVideoMovieApi = async id => {
  const url = `${API_HOST}/movie/${id}/videos?api_key=${API_KEY}&language=${LANG}`;
  const response = await fetch(url);
  return response.json();
};

export const getPopularMoviesApi = async (page = 1) => {
  const url = `${API_HOST}/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${page}`;
  const response = await fetch(url);
  return response.json();
};
