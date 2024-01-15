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
      <section className="w-full h-[calc(100vh-15rem)] grid grid-cols-4 grid-rows-2 gap-x-4 gap-y-3">
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
          <h1 className='font-extrabold text-2xl'>Activity Feeds</h1>
          <div className="overflow-y-auto">
            {eventData.map(event => (
              <div key={event.id} className="flex items-center border rounded-md border-gray-700 gap-2 p-2 text-sm">
                <div className="w-1/6 font-medium text-base">{event.type.split("E")[0]}</div>
                {event.type === "IssuesEvent" && (
                  <a href={event.payload.issue?.html_url} className="w-5/6 flex justify-between text-sm text-[#ededed]/60 hover:text-blue-500">
                    <h1>
                      {event.payload.issue?.title}
                    </h1>
                    <h1 className={event.payload.issue?.state === "open" ? "text-red-500 font-semibold uppercase" : "text-green-500 font-semibold uppercase"}>
                      {event.payload.issue?.state}
                    </h1>
                  </a>
                )}
                {event.type === "PullRequestEvent" && (
                  <a href={event.payload.pull_request?.html_url} className="w-5/6 flex gap-1 justify-between text-sm text-[#ededed]/60 hover:text-blue-500">
                    <h1>
                      {event.payload.pull_request?.title}
                    </h1>
                    <h1 className={event.payload.pull_request?.state === "open" ? "text-red-500 font-semibold uppercase" : "text-green-500 font-semibold uppercase"}>
                      {event.payload.pull_request?.state}
                    </h1>
                  </a>
                )}
                {event.type === "WatchEvent" && (
                  <div className="w-5/6 flex gap-1 text-[#ededed]/60">
                    <h1>{event.actor.login}</h1>
                    <h3 className="font-semibold">{event.payload.action}</h3>
                    <h1>{event.repo.name}</h1>
                  </div>
                )}
                {event.type === "ForkEvent" && (
                  <a href={event.payload.forkee?.html_url} className="w-5/6 flex justify-between text-sm text-[#ededed]/60 hover:text-blue-500">
                    <div className="flex gap-1">
                      <h1>{event.actor.login}</h1>
                      <h3 className="font-semibold">forked</h3>
                      <h1>{event.repo.name}</h1>
                    </div>
                    {/* Added fork icon */}
                  </a>
                )}
                {event.type === "PushEvent" && (
                  <div className="w-5/6 flex gap-1 text-[13px] text-[#ededed]/60">
                    <h1>{event.actor.login} pushed</h1>
                    <h1 className="font-semibold">{event.payload.commits?.length} commits</h1>
                    <h1>to {event.repo.name}</h1>
                  </div>
                )}
                {event.type === "CreateEvent" && (
                  <a href={`https://github.com/${event.repo.name}/tree/${event.payload.master_branch}`} className="w-5/6 text-sm flex gap-1 text-[#ededed]/60 hover:text-blue-500">
                    <h1>Created </h1>
                    <h3 className="font-semibold uppercase">{event.payload.ref_type}</h3>
                    <h1>- {event.repo.name} #{event.payload.master_branch}</h1>
                  </a>
                )}
                {event.type === "DeleteEvent" && (
                  <div className="w-5/6 text-sm flex gap-1 text-[#ededed]/60">
                    <h1>Deleted </h1>
                    <h3 className="font-semibold uppercase">{event.payload.ref_type}</h3>
                    <h1>- {event.repo.name} #{event.payload.ref}</h1>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
