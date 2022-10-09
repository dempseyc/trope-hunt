import { createStore, action, Store } from 'easy-peasy'
import { createTypedHooks } from 'easy-peasy';
import { HYDRATE, createWrapper, Context } from "next-redux-wrapper";

import {Action} from 'easy-peasy'
import {users, UsersModel} from './users'
import {movies, MoviesModel} from './movies'
import {game, GameModel} from './game'

export interface StoreModel {
  gameOn: boolean;
  setGameOn: Action<StoreModel, StoreModel['gameOn']>;
  currView: number;
  setCurrView: Action<StoreModel, StoreModel['currView']>;
  movies: MoviesModel;
  users: UsersModel;
  game: GameModel;
}

const typedHooks = createTypedHooks<StoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;

export const model: StoreModel = {
  gameOn: false,
  setGameOn: action((state, payload) => { state.gameOn = payload }),
  currView: 0,
  setCurrView: action((state, payload) => { state.currView = payload }),
  movies,
  users,
  game
}

const makeStore = (context: Context) => {
  return createStore(model);
}
export const store = createStore(model);

export const wrapper = createWrapper<Store<StoreModel>>(makeStore, {debug: true});


// const SSR_HYDRATE = actionOn(
//   () => HYDRATE,
//   (state,target) => {
//     state.count = target.payload.count;
//   }
// )
// const combinedReducer = combineReducers({
//   count,
//   tick,
// })
// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     };
//     if (state.count) nextState.count = state.count; // preserve count value on client side navigation
//     return nextState;
//   } else {
//     return combinedReducer(state, action);
//   }
// };