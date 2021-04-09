import { useEffect } from "react";

import Routes from "./Routes/Routes";
import { useSetIfToken } from "./Hooks/Auth";

const App = () => {
  const checkIfLoggedIn = useSetIfToken(
    localStorage.getItem("activeToken") ? "loggedIn" : "loggedOut"
  );

  useEffect(() => {
    checkIfLoggedIn();
  }, [checkIfLoggedIn]);

  return <Routes />;
};

export default App;
