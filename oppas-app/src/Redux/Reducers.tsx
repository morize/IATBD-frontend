import { SET_AUTH_STATUS, AuthActionType, IAuthReducer } from "./Actions";

const initialAuthState = {
  auth: "",
};

export const authReducer = (
  state: IAuthReducer = initialAuthState,
  action: AuthActionType
) => {
  switch (action.type) {
    case SET_AUTH_STATUS:
      return action.payload;
    default:
      return state;
  }
};
