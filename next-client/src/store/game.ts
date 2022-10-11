import { Action, Thunk } from "easy-peasy";
import { action, thunk } from "easy-peasy";
import axios from "axios";

const API_URL = "/api";

interface UpdateShape {
  id: string;
  movieId: string | undefined;
  bonus: string[] | [];
  points: number;
}

interface TropeData {
  _id: string;
  description: string;
  bonus:  string[] | [];
  ubiquity: number;
  bonus_pts:	number;
  status: "pool" | "card" | "found" ;
  dateAdded: number;
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
  setStatus: Action<GameModel, StatusShape>;
  newTrope: Action<GameModel>;
  fetchTropes: Thunk<GameModel>;
  updateGame: Thunk<GameModel, UpdateShape>;
  addPoints: Action<GameModel, number>;
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
    console.log(count);
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
      if (state.tropes[i]?.status !== "card") {
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
      console.log(response);
      const results: TropeData[] = response.data;
      actions.setTropes(results);
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  }),
  addPoints: action((state, payload) => { state.score += payload }),
  updateGame: thunk(async (actions, payload) => {
    const token = localStorage.token;
    const {id, movieId, bonus, points} = payload;
    actions.setStatus({id, status: "found"});
    actions.addPoints(points);
    actions.newTrope();
    const url = `${API_URL}/finds/create`;
    try {
      actions.setLoading(true);
      const response = await axios.post(url,{
        movie_id: movieId,
        trope_id: id,
        bonus_memos: bonus
      },{
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log(response);
    } catch (error) {
      actions.setError(true);
    } finally {
      actions.setLoading(false);
    }
  })
};
