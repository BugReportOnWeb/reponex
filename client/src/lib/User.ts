import { GitHubUser } from "../types/user";

const getGitHubUser = async (username: string): Promise<GitHubUser> => {
  const userData = localStorage.getItem("userData");

  try {
    if (userData) {
      return JSON.parse(userData);
    }
    const url = `https://api.github.com/users/${username}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    localStorage.setItem("userData", JSON.stringify(data));

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

  try {
    if (reposData) {
      return JSON.parse(reposData);
    }

    const url = `https://api.github.com/users/${username}/repos`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    localStorage.setItem("reposData", JSON.stringify(data));

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

  try {
    if (eventsData) {
      return JSON.parse(eventsData);
    }

    const url = `https://api.github.com/users/${username}/events`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    localStorage.setItem("eventsData", JSON.stringify(data));

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
