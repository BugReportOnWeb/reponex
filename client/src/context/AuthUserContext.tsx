import { ReactNode, createContext, useState, useEffect } from "react";
import { AuthUserContextType } from "../types/user";
import { isTokenValid } from "../lib/isTokenValid";

type AuthUserContextProviderProps = {
  children: ReactNode;
}

const AuthUserContext = createContext<AuthUserContextType | null>(null);

const AuthUserContextProvider = ({ children }: AuthUserContextProviderProps) => {
  const [authUser, setAuthUser] = useState('');

  useEffect(() => {
    // Fetch the username from the /api/users/me
    const fetchUsername = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token == null) {
          return;
        }
        const data = await isTokenValid();
        setAuthUser(data.username);
      } catch (error) {
        setAuthUser("");
      }
    };

    fetchUsername();
  }, []);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider >
  )
}

export { AuthUserContextProvider, AuthUserContext };
