import { ReactNode, createContext, useState, useEffect } from "react";
import { AuthUserContextType } from "../types/user";

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
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAuthUser(data.username);
        } else {
          setAuthUser("");
        }
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
