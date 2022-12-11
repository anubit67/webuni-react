import { createContext, useCallback, useContext } from 'react';
import { setApiToken } from './useApi';
import useLocalStorage from './useLocalStorage';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

export function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useLocalStorage('token', false);
  const [sessionUser, setSessionUser] = useLocalStorage('session', {});
  setApiToken(authToken);

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
