import { ReactNode, createContext, useState, useEffect } from "react";
import { AuthUserContextType } from "../types/user";
import isTokenValid from "../lib/isTokenValid";
import socket from "../socket/socket";

type AuthUserContextProviderProps = {
    children: ReactNode;
}

const AuthUserContext = createContext<AuthUserContextType | null>(null);

const AuthUserContextProvider = ({ children }: AuthUserContextProviderProps) => {
    // Setting initial authUser to ' ' thus keeeping it valid on refresh
    // Now when validation happens, it is decided where to have a username or ''
    //
    // WHY DO THIS?? - Cause on refresh on any page other than '/' that is
    // forbidden for non-auth users, the page redirects to '/login' cause
    // the initial value of authUser is '' and then it validates, and when
    // the auth user is set, the login pages redirects to '/'
    //
    // IN SHORT - Refresh with valid token on any route redirects to '/'
    // Really weird but safe bug, need a better fix; 

    const [authUser, setAuthUser] = useState(' ');

    useEffect(() => {
        const fetchUsername = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setAuthUser('');
                return;
            }

            try {
                const data = await isTokenValid();
                if (data.valid && data.username) {
                    setAuthUser(data.username);
                    socket.connect();
                }
            } catch (error) {
                console.error(error);
                setAuthUser('');
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
