import { useEffect, useContext, useState } from "react";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/auth";
import {
    getGitHubUser,
    getGitHubUserRepos,
    getGitHubUserEvents,
} from "../lib/User";
import UserData from "../components/dashboard/UserData";
import RepoCard from "../components/actions/repository/RepoCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import { GitHubEvent, GitHubRepo, GitHubUser, FilterRepo } from "../types/github";

const Dashboard = () => {
    const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
    const [error, setError] = useState('');

    const [userData, setUserData] = useState<GitHubUser | null>(null);
    const [reposData, setReposData] = useState<GitHubRepo[]>([]);
    const [eventsData, setEventsData] = useState<GitHubEvent[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const githubUserData = await getGitHubUser(authUser);
                const githubReposData = await getGitHubUserRepos(authUser);
                const githubEventsData = await getGitHubUserEvents(authUser);

                localStorage.setItem('userData', JSON.stringify(githubUserData));
                localStorage.setItem('reposData', JSON.stringify(githubReposData));
                localStorage.setItem('eventsData', JSON.stringify(githubEventsData));

                setUserData(githubUserData);
                setReposData(githubReposData);
                setEventsData(githubEventsData);
                setError('');
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
        }

        fetchData();
    }, []);

    const repositories = reposData.map((repo) => {
        const repoDetails: FilterRepo = {
            name: repo.name,
            url: repo.html_url,
            description: repo.description ?? undefined,
            language: repo.language ?? undefined,
            watchers_count: repo.watchers_count,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            open_issues_count: repo.open_issues_count,
        };
        return repoDetails;
    });


    const IssuesData = eventsData.filter((item) => item.type === "IssuesEvent");
    const PullRequestData = eventsData.filter(
        (item) => item.type === "PullRequestEvent",
    );

    return (
        <main className="p-5 pb-20 w-full">
            <h1 className="text-3xl text-white font-semibold mb-7">
                Hello, {authUser}!
            </h1>
            {!error && userData && (
                <div className="w-full h-[calc(100vh-15rem)] grid grid-cols-4 grid-rows-2 gap-x-4 gap-y-3">
                    <div className="flex gap-5 justify-center col-span-2">
                        <div className="w-[40%] p-3 flex justify-center items-center">
                            <a
                                href={userData.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={userData.avatar_url}
                                    alt={userData.name || userData.login}
                                    className="rounded-full transition-all duration-300 ease-in-out border border-white/40 hover:border-white/80"
                                />
                            </a>
                        </div>
                        <UserData userData={userData} />
                    </div>
                    <div className="col-span-2 flex flex-col gap-1.5 p-2">
                        <h1 className="font-extrabold text-2xl mb-2">Repositories List</h1>
                        <div className="overflow-y-auto">
                            {repositories.map((repo) => (
                                <RepoCard repo={repo} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <h1 className="font-extrabold text-xl">Pull Requests</h1>
                        <div className="overflow-y-auto">
                            {PullRequestData.map((issue, index) => (
                                <div
                                    key={issue.id}
                                    className="rounded-md border-gray-700 p-2 text-sm flex "
                                >
                                    <span className="mr-2">{index + 1}</span>
                                    <h1>{issue.payload.pull_request?.title}</h1>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 p-2 border border-gray-700 hover:border-[#ededed]/60">
                        <h1 className="font-bold text-xl">Issues</h1>
                        <div className="overflow-y-auto">
                            {IssuesData.map((issue) => (
                                <div
                                    key={issue.id}
                                    className="border rounded-md border-gray-700 p-2 text-sm"
                                >
                                    {issue.payload.issue?.title}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-2 border border-gray-700 flex flex-col gap-2 p-2 hover:border-[#ededed]/60 rounded-lg">
                        <h1 className="font-extrabold text-2xl">Activity Feeds</h1>
                        <div className="overflow-y-auto">
                            {eventsData.map((event) => (
                                <ActivityCard event={event} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Dashboard;
