import { useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/user";
import { userData } from "../localStore/userData";
import UserData from "../components/UserData";
import { eventData } from "../localStore/eventData";
import { repoData } from "../localStore/repoData";
import RepoCard from "../components/actions/repository/RepoCard";
import { Repository } from "../types/repo";

const Dashboard = () => {
    const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
    const IssuesData = eventData.filter(item => item.type === "IssuesEvent");
    const PullRequestData = eventData.filter(item => item.type === "PullRequestEvent");

    const repositories = repoData.map(repo => {
        const repoDetails: Repository = {
            name: repo.name,
            url: repo.html_url,
            description: repo.description ?? undefined,
            language: repo.language ?? undefined,
            watchers_count: repo.watchers_count,
            stargazers_count: repo.stargazers_count,
            forks_count: repo.forks_count,
            open_issues_count: repo.open_issues_count
        }
        return repoDetails;
    })

    return (
        <main className='p-5 pb-20 w-full'>
            <h1 className="text-3xl text-white font-semibold mb-7">Hello, {userData.login}!</h1>
            <section className="w-full h-[calc(100vh-15rem)] grid grid-cols-4 grid-rows-2 gap-x-5 gap-y-3">
                <div className="flex col-span-2 border border-gray-700 hover:border-[#ededed]/60 rounded-lg w-full h-full">
                    <div className="w-1/3 h-full p-3 flex flex-col gap-3 justify-center items-center00">
                        <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                            <img src={userData.avatar_url} alt={userData.name} className="rounded-full transition-all duration-300 ease-in-out hover:border hover:border-cyan-500" />
                        </a>
                    </div>
                    <div className="w-2/3">
                        <UserData userData={userData} />
                    </div>
                </div>
                <div className='col-span-2 flex flex-col gap-1.5 p-2'>
                    <h1 className='font-extrabold text-2xl mb-2'>Repositories List</h1>
                    <div className="overflow-y-auto">
                        {repositories.map(repo => (
                            <RepoCard repo={repo} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <h1 className='font-extrabold text-xl'>Pull Requests</h1>
                    <div className='overflow-y-auto'>
                        {PullRequestData.map((issue, index) => (
                            <div key={issue.id} className="rounded-md border-gray-700 p-2 text-sm flex ">
                                <span className='mr-2'>{index + 1}</span>
                                <h1>{issue.payload.pull_request?.title}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2 border border-gray-700 hover:border-[#ededed]/60">
                    <h1 className='font-bold text-xl'>Issues</h1>
                    <div className='overflow-y-auto'>
                        {IssuesData.map(issue => (
                            <div key={issue.id} className="border rounded-md border-gray-700 p-2 text-sm">
                                {issue.payload.issue?.title}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-2 border border-gray-700 flex flex-col gap-2 p-2 hover:border-[#ededed]/60 rounded-lg">
                    <h1 className='font-extrabold text-2xl mb-2'>Activity Feeds</h1>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
