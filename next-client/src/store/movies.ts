import { Action, Thunk } from "easy-peasy";
import { action, thunk } from "easy-peasy";
import axios from "axios";

const API_URL = "/api/gameMovies/";
const API2_URL = "/api/movies/";

interface QueryShape {
  text: string;
  page: number;
}

interface MovieData {
  tmdb_id?: number;
  created_by?: number;
  backdrop_path?: string;
  poster_path?: string;
  genre_ids?: [number];
  original_language?: string;
  original_title: string;
  title?: string;
  overview?: string;
  release_date?: string;
  finds?: [number];
}

export interface MoviesModel {
  error: boolean;
  query: QueryShape;
  selection: number | null;
  loading: boolean;
  complete: boolean;
  total_pages: number;
  data: [...MovieData[]] | null;
  setError: Action<MoviesModel, MoviesModel["error"]>;
  setLoading: Action<MoviesModel, MoviesModel["loading"]>;
  setData: Action<MoviesModel, [...MovieData[]]>;
  setTotalPages: Action<MoviesModel, MoviesModel["total_pages"]>;
  setQuery: Action<MoviesModel, QueryShape>;
  setSelection: Action<MoviesModel, MoviesModel["selection"]>;
  submitQuery: Thunk<MoviesModel, QueryShape>;
  resetQuery: Action<MoviesModel, any>;
  chooseGameMovie: Thunk<MoviesModel, MovieData>;
  setCurrentGameMovie: Action<MoviesModel, MovieData>;
  currentGameMovie: MovieData | null;
  fetchGameMovies: Thunk<MoviesModel>;
}

export const movies: MoviesModel = {
  error: false,
  query: { text: "", page: -1 },
  selection: null,
  loading: false,
  complete: false,
  total_pages: 0,
  data: null,
  currentGameMovie: null,

  setError: action((state, payload) => {
    state.error = payload;
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setData: action((state, payload) => {
    state.data = state.data
      ? [...state.data, ...payload]
      : [...payload];
    }),
  setTotalPages: action((state,payload) => {
    state.total_pages = payload;
    state.complete = state.query.page >= payload;
  }),
  setQuery: action((state, payload) => {
    state.query = payload;
  }),
  resetQuery: action((state, payload) => {
    state.query = { text: "", page: -1 };
    state.total_pages = 0;
    state.loading = false;
    state.complete = false;
    state.error = false;
  }),
  setSelection: action((state, payload) => {
    state.selection = payload;
  }),
  submitQuery: thunk(async (actions, payload) => {
    const { text, page } = payload;
    if (text.length) {
      const queryEnc = encodeURI(text);
      const url = `${API2_URL}&query=${queryEnc}&page=${page}`;
      actions.setQuery({ text: text, page: page });
      actions.setLoading(true);
      try {
        const response = await axios.get(url);
        const results: MovieData[] = response.data.results?.map((movie) => {
          movie.tmdb_id = movie.id;
          const { id, ...allExcept } = movie;
          return allExcept;
        });
        const total_pages = response.data.total_pages;
        actions.setTotalPages(total_pages);
        actions.setData(results);
      } catch (error) {
        console.log(error);
        actions.setError(true);
      } finally {
        actions.setLoading(false);
      }
    }
  }),
  setCurrentGameMovie: action((state, payload) => {
    state.currentGameMovie = payload;
  }),
  chooseGameMovie: thunk(async (actions, payload) => {
    const url = `${API_URL}/create`;
    const token = localStorage.token;
    try {
      const response = await axios.post(url, 
        {
          gameMovie: payload,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      actions.setCurrentGameMovie(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("game created");
    }
  }),
  fetchGameMovies: thunk(async (actions) => {
    const url = `${API_URL}`;
    try {
      actions.setLoading(true);
      const response = await axios.get(url);
      const results: MovieData[] = response.data;
      actions.setData(results);
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  })
};
