import { Dispatch, SetStateAction } from "react";

type TokenState = {
    valid: boolean;
    username?: string;
}

type AuthUserContextType = {
    authUser: string;
    setAuthUser: Dispatch<SetStateAction<string>>;
}

export type { AuthUserContextType, TokenState };
