import { Action, Thunk } from "easy-peasy";
import { action, thunk } from "easy-peasy";
import axios from "axios";

const API_URL = "/api";

interface UpdateShape {
  idx: number;
  movieId: string | undefined;
}

interface TropeData {
  description: string;
  bonus:  string[] | [];
  ubiquity: number;
  bonus_pts:	number;
}

export interface GameModel {
  error: boolean;
  loading: boolean;
  complete: boolean;
  setError: Action<GameModel, GameModel["error"]>;
  setLoading: Action<GameModel, GameModel["loading"]>;
  tropes: [...TropeData[]] | null;
  setTropes: Action<GameModel, GameModel["tropes"]>;
  fetchTropes: Thunk<GameModel>;
  updateGame: Thunk<GameModel, UpdateShape>;
}

export const game: GameModel = {
  error: false,
  loading: false,
  complete: false,
  tropes: null,

  setError: action((state, payload) => {
    state.error = payload;
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setTropes: action((state, payload) => { state.tropes = payload }),
  fetchTropes: thunk(async (actions) => {
    const url = `${API_URL}/tropes/`;
    try {
      actions.setLoading(true);
      const response = await axios.get(url);
      console.log(response);
      const results: TropeData[] = response.data;
      actions.setTropes(results);
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
  updateGame: thunk(async (actions, payload) => {
    const {idx, movieId} = payload;
    const url = `${API_URL}/find/create`;
    try {
      console.log("udG", idx, movieId);
      return payload;
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  })
};
