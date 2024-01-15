const getGitHubUser = async (username: string) => {
    const userData = localStorage.getItem("userData");
    if (userData) return JSON.parse(userData);

    try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getGitHubUserRepos = async (username: string) => {
    const reposData = localStorage.getItem("reposData");
    if (reposData) return JSON.parse(reposData);

    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const getGitHubUserEvents = async (username: string) => {
    const eventsData = localStorage.getItem("eventsData");
    if (eventsData) return JSON.parse(eventsData);

    try {
        const res = await fetch(`https://api.github.com/users/${username}/events`);
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error);
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export { getGitHubUser, getGitHubUserRepos, getGitHubUserEvents };
