export const SET_AUTH_STATUS = "SET_AUTH_STATUS";
export const SET_USER_DETAILS = "SET_USER_DETAILS";

export interface IUserDetailsReducer {
  userDetails: { username?: string; isAdmin?: number; isBlocked?: number };
}

export type UserDetailsActionType = {
  type: "SET_USER_DETAILS";
  payload: IUserDetailsReducer["userDetails"];
};

export const setUserDetails = (
  userDetails: IUserDetailsReducer
): UserDetailsActionType => ({
  type: SET_USER_DETAILS,
  payload: userDetails.userDetails,
});
