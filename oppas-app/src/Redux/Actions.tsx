export const SET_AUTH_STATUS = "SET_AUTH_STATUS";

export interface IAuthReducer {
  auth: string;
}

export type AuthActionType = {
  type: "SET_AUTH_STATUS";
  payload: IAuthReducer;
};

export const setAuthStatus = (authStatus: IAuthReducer): AuthActionType => ({
  type: SET_AUTH_STATUS,
  payload: authStatus,
});
