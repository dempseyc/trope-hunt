import { Action, Thunk } from "easy-peasy";
import { action, thunk } from "easy-peasy";
import axios from "axios";

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
  data: [...any] | null;
  setError: Action<MoviesModel, MoviesModel["error"]>;
  setLoading: Action<MoviesModel, MoviesModel["loading"]>;
  setData: Action<MoviesModel, any>;
  setQuery: Action<MoviesModel, QueryShape>;
  setSelection: Action<MoviesModel, MoviesModel["selection"]>;
  submitQuery: Thunk<MoviesModel, QueryShape>;
  resetQuery: Action<MoviesModel, any>;
}

export const movies: MoviesModel = {
  error: false,
  query: { text: "", page: -1 },
  selection: null,
  loading: false,
  complete: false,
  total_pages: 0,
  data: null,

  setError: action((state, payload) => {
    state.error = payload;
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setData: action((state, payload) => {
    state.data = state.data ? [...state.data, ...payload.results] : [...payload.results];
    state.total_pages = payload.total_pages;
    state.complete = ( state.query.page >= payload.total_pages );
  }),
  setQuery: action((state, payload) => {
    state.query = payload;
  }),
  resetQuery: action((state, payload) => {
    state.query = { text: "", page: -1 };
    state.total_pages = 0;
    state.data = null;
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
        // console.log(response.data);
        const results = response.data.results?.map((movie) => {
          movie.tmdb_id = movie.id;
          const { id, ...allExcept } = movie;
          return allExcept;
        });
        const total_pages = response.data.total_pages;
        actions.setData({results, total_pages});
        // actions.setData(response.data);
      } catch (error) {
        console.log(error);
        actions.setError(true);
      } finally {
        actions.setLoading(false);
      }
    }
  }),
};
