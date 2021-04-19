import { useDispatch, useSelector } from "react-redux";

import { setUserDetails, IUserDetailsReducer } from "../Redux/Actions";

export const useSetUserDetails = (userDetails: IUserDetailsReducer) => {
  const dispatch = useDispatch();

  return () => dispatch(setUserDetails(userDetails));
};

export const useGetUserDetails = () => {
  const userDetails = useSelector<
    IUserDetailsReducer,
    IUserDetailsReducer["userDetails"]
  >((state) => state.userDetails);

  return userDetails;
};
