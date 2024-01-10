import { GitHubUser } from "../types/user";

const getGitHubUser = async (username: string): Promise<GitHubUser> => {
    try {
        const url = `https://api.github.com/users/${username}`
        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { getGitHubUser };
