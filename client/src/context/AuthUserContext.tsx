import { ReactNode, createContext, useState } from "react";
import { AuthUserContextType } from "../types/user";

type AuthUserContextProviderProps = {
    children: ReactNode;
}

const AuthUserContext = createContext<AuthUserContextType | null>(null);

const AuthUserContextProvider = ({ children }: AuthUserContextProviderProps) => {
    const [authUser, setAuthUser] = useState('');

    return (
        <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthUserContext.Provider >
    )
}

export default AuthUserContextProvider;
