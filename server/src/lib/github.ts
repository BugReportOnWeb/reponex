const isGitHubUser = async (username: string) => {
    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export { isGitHubUser };
