import { Action, Thunk } from "easy-peasy";
import { action, thunk } from "easy-peasy";
import { MovieData } from "./movies";
import axios from "axios";
import { SettingsRemoteSharp } from "@mui/icons-material";

const API_URL = "/api";

interface UpdateShape {
  id: string;
  movie: MovieData | undefined;
  bonus?: string[] | [];
  points?: number;
}

interface GameDataShape {
  gameOn: boolean;
  movie?: MovieData;
  tropes: any[];
  score: number;
}

export type TropeData = {
  _id: string;
  description: string;
  bonus:  string[] | [];
  bonus_pts:	number;
  points: number;
  status?: "pool" | "card" | "found" | "not-found";
  dateAdded?: number;
}

interface StatusShape {
  id: string;
  status: TropeData["status"];
}

export interface GameModel {
  error: boolean;
  loading: boolean;
  complete: boolean;
  setError: Action<GameModel, GameModel["error"]>;
  setLoading: Action<GameModel, GameModel["loading"]>;
  tropes: [...TropeData[]] | null;
  setTropes: Action<GameModel, GameModel["tropes"]>;
  refreshTrope: Action<GameModel, TropeData>;
  setStatus: Action<GameModel, StatusShape>;
  newTrope: Action<GameModel>;
  fetchTropes: Thunk<GameModel>;
  updateTrope: Thunk<GameModel, TropeData>;
  saveGame: Thunk<GameModel, GameDataShape>;
  updateGame: Thunk<GameModel, UpdateShape>;
  addPoints: Action<GameModel, number>;
  loadGame: Action<GameModel, GameDataShape>;
  clearGame: Action<GameModel>;
  gameLoaded: boolean;
  tropeQty: number;
  score: number;
}

export const game: GameModel = {
  error: false,
  loading: false,
  complete: false,
  tropes: null,
  tropeQty: 12,
  score: 0,
  gameLoaded: false,

  setError: action((state, payload) => {
    state.error = payload;
  }),
  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
  setTropes: action((state, payload) => {
    payload = payload.map(t => {
      t.status = "pool";
      return t;
    });
    let count = 0;
    while (count < state.tropeQty) {
      const i = Math.floor(Math.random()*payload.length);
      if (payload[i]?.status !== "card") {
        payload[i].status = "card";
        payload[i].dateAdded = new Date().getTime();
        count +=1;
      }
    }
    state.tropes = payload;
   }),
  setStatus: action((state, payload)  => {
    const { id, status } = payload;
    const idx = state.tropes.findIndex(t => t._id === id);
    state.tropes[idx].status = status;
  }),
  newTrope: action((state) => {
    let count = 11;
    while (count < state.tropeQty) {
      const i = Math.floor(Math.random()*state.tropes.length);
      const status = state.tropes[i]?.status;
      if (status === "pool") {
        state.tropes[i].status = "card";
        state.tropes[i].dateAdded = new Date().getTime();
        count +=1;
      }
    }
  }),
  fetchTropes: thunk(async (actions) => {
    const url = `${API_URL}/tropes/`;
    try {
      actions.setLoading(true);
      const response = await axios.get(url);
      // console.log(response.data);
      const results: TropeData[] = response.data;
      actions.setTropes(results);
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
  updateTrope: thunk(async (actions, payload: TropeData) => {
    const token = localStorage.token;
    if (!token) {
      return;
    }
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`
    };
    const url = `${API_URL}/tropes/update`;
    try {
      actions.setLoading(true);
      const response = await axios.patch(url,payload,{
        headers: headers
      });
      if (response) {
        actions.refreshTrope(response.data);
      }
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
  refreshTrope: action((state, payload) => {
    const index = state.tropes.findIndex((trope) => trope._id = payload._id);
    if (index < 0 ) { state.tropes[state.tropes.length] = payload; }
    else { state.tropes[index] = payload; }
  }),
  addPoints: action((state, payload) => { state.score += payload }),
  loadGame: action((state, payload) => {
    state.tropes = payload.tropes;
    state.score = payload.score;
    state.gameLoaded = true;
  }),
  saveGame: thunk( async(actions,payload) => {
    const { token, id } = localStorage;
    if (!token) {
      return;
    }
    const url = `${API_URL}/users/${id}/update`;
    actions.setLoading(true);
    try {
      await axios.patch(url, {
        data: payload
      },{
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
  updateGame: thunk(async (actions, payload) => {
    const token = localStorage.token;
    if (!token) {
      return;
    }
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Authorization': `Bearer ${token}`
    };
    const {movie, id, bonus, points} = payload;
    const discard = (points === undefined);
    const movie_id = movie._id;
    if (!discard) {
      actions.setStatus({id, status: "found"});
      actions.addPoints(points);
    } else {
      actions.setStatus({id, status: "not-found"});
    }
    actions.newTrope();
    const url = `${API_URL}/finds/create`;
    try {
      actions.setLoading(true);
      await axios.post(url,{
        movie_id,
        trope_id: id,
        bonus_memos: bonus,
        indication: discard ? -1 : 1
      },{
        headers: headers
      });
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
  clearGame: action((state, payload) => { 
    state.tropes = null;
    state.score = 0;
    state.gameLoaded = false;
  }),
};
