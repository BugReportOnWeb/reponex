import { ReactNode, createContext, useState, useEffect } from "react";
import { AuthUserContextType } from "../types/user";
import isTokenValid from "../lib/isTokenValid";

type AuthUserContextProviderProps = {
    children: ReactNode;
}

const AuthUserContext = createContext<AuthUserContextType | null>(null);

const AuthUserContextProvider = ({ children }: AuthUserContextProviderProps) => {
    const [authUser, setAuthUser] = useState('');

    useEffect(() => {
        const fetchUsername = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const data = await isTokenValid();
                if (data.valid && data.username) {
                    setAuthUser(data.username);
                }
            } catch (error) {
                console.error(error);
                setAuthUser("");
            }
        }

        fetchUsername();
    }, [])

    return (
        <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthUserContext.Provider >
    )
}

export { AuthUserContextProvider, AuthUserContext };
