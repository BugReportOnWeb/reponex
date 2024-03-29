import { TokenState } from "../types/auth";

const isTokenValid = async () => {
    const server = import.meta.env.VITE_SERVER;
    const token = localStorage.getItem("token");

    let tokenState: TokenState = { valid: false };

    const res = await fetch(`${server}/api/users/me`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.error);
    }

    if (res.ok) {
        tokenState = { valid: true, username: data.username };
    }

    return tokenState;
};

export default isTokenValid;
