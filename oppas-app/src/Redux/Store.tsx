import { createStore } from "redux";

import { authReducer } from "./Reducers";

export const store = createStore(authReducer);
