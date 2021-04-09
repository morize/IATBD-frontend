import {
  SET_USER_DETAILS,
  UserDetailsActionType,
  IUserDetailsReducer,
} from "./Actions";

export const userDetailsReducer = (
  state: IUserDetailsReducer = { userDetails: {} },
  action: UserDetailsActionType
) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
