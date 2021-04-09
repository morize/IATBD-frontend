import { useDispatch, useSelector } from "react-redux";

import { IAuthReducer, setAuthStatus } from "../Redux/Actions";

export const useLogin = () => {
  const dispatch = useDispatch();

  return () => dispatch(setAuthStatus({ auth: "loggedIn" }));
};

export const useLogout = () => {
  const dispatch = useDispatch();

  return () => dispatch(setAuthStatus({ auth: "loggedOut" }));
};

export const useSetIfToken = (auth: string) => {
  const dispatch = useDispatch();

  return () => dispatch(setAuthStatus({ auth: auth }));
};

export const useLoginStatus = () => {
  const authStatus = useSelector<IAuthReducer, IAuthReducer["auth"]>(
    (state) => state.auth
  );

  return authStatus === "loggedIn" ? true : false;
};
