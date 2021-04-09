import { createStore, combineReducers } from "redux";

import { userDetailsReducer } from "./Reducers";

export const store = createStore(
  combineReducers({
    userDetails: userDetailsReducer,
  })
);
