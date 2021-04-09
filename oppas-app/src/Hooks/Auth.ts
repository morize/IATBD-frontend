import { useDispatch, useSelector } from "react-redux";

import { IAuthReducer, setAuthStatus } from "../Redux/Actions";

export const useLoginAuth = () => {
  const dispatch = useDispatch();

  return () => dispatch(setAuthStatus({ auth: "loggedIn" }));
};

export const useLogoutAuth = () => {
  const dispatch = useDispatch();

  return () => dispatch(setAuthStatus({ auth: "loggedOut" }));
};

export const useSetIfToken = (auth: string) => {
  const dispatch = useDispatch();

  return () => dispatch(setAuthStatus({ auth: auth }));
};

export const useCheckAuth = () => {
  const authStatus = useSelector<IAuthReducer, IAuthReducer["auth"]>(
    (state) => state.auth
  );

  return authStatus;
};
