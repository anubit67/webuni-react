import React, { useCallback, useContext, useState } from 'react';
import { setApiToken } from './useApi';

const AuthContext = React.createContext();
AuthContext.displayName = 'AuthContext';

export function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(false);
  const [sessionUser, setSessionUser] = useState({});

  const handleLoginResult = useCallback(
    (loginResult) => {
      setApiToken(loginResult.token);
      setAuthToken(loginResult.token);
      setSessionUser(loginResult.user);
    },
    [setAuthToken, setSessionUser, setApiToken],
  );

  const logout = useCallback(
    () => {
      handleLoginResult({ token: false, user: {} });
    },
    [handleLoginResult],
  );

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{
      authToken, sessionUser, handleLoginResult, logout, setSessionUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
