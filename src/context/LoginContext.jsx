import { createContext, useEffect, useState, } from "react";

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [token, setToken] = useState('');
  const [loginState, setLoginState] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setToken(token);

    if (!token) {
      setChecking(false)
    }
    else {
      setLoginState(true);
    }
  }, []);

  const userLogin = (token) => {
    window.localStorage.setItem("token", token);
    setToken(token);
    setLoginState(true);
  };

  const userLogout = () => {
    window.localStorage.removeItem("token");
    setToken("");
    setLoginState(false);
  };

  const contextValue = {
    token,
    loginState,
    checking,
    setLoginState,
    setChecking,
    userLogin,
    userLogout,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      { children }
    </LoginContext.Provider>
  );
};
