import { useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/user";
import { FaRegStar, FaRegEye } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { userData } from "../localStore/userData";
import UserData from "../components/UserData";
import { eventData } from "../localStore/eventData";
import { repoData } from "../localStore/repoData";

const Dashboard = () => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;
  const IssuesData = eventData.filter(item => item.type === "IssuesEvent");
  const PullRequestData = eventData.filter(item => item.type === "PullRequestEvent");

  return (
    <main className='p-5 pb-20 w-full min-h-screen flex flex-col gap-3'>
      <h1 className="text-2xl text-white font-semibold">Hello, {userData.login}!</h1>
      <section className="w-full h-[75vh] grid grid-cols-4 grid-rows-2 gap-x-5 gap-y-3">
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
        <div className="col-span-2 border border-gray-700 flex flex-col gap-2 p-2 hover:border-[#ededed]/60 rounded-lg overflow-y-auto">
        <div className="text-white text-lg font-semibold">Repositories</div>
        {repoData.map(repo => (
          <div key={repo.id} className="flex justify-between border rounded-md border-gray-700 p-2 text-sm">
            <div>{repo.name}</div>
            <div className="flex gap-3">
            {repo.watchers_count && (
              <div className="flex items-center gap-1">
              <FaRegEye />
              <div>{repo.watchers_count}</div>
              </div>
            )}
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1">
              <FaRegStar />
              <div>{repo.stargazers_count}</div>
              </div>
            )}
            {repo.forks_count > 0 && (
              <div className="flex items-center gap-1">
               <GoRepoForked /> 
               <div>{repo.forks_count}</div>
              </div>
            )}
            {repo.open_issues_count > 0 && (
              <div className="flex items-center gap-1">
                <AiOutlineIssuesClose />
                <div>{repo.open_issues_count}</div>
              </div>
            )}
            </div>
          </div>
        ))}
        </div>
        <div className="border border-gray-700 flex flex-col gap-2 p-2 hover:border-[#ededed]/60 rounded-lg overflow-y-auto">
          <div className="text-white text-lg font-semibold">Pull Requests</div>
          {PullRequestData.map(issue => (
            <div key={issue.id} className="border rounded-md border-gray-700 p-2 text-sm">
            {issue.payload.pull_request?.title}
            </div>
          ))}
        </div>
        <div className="border border-gray-700 flex flex-col gap-2 p-2 hover:border-[#ededed]/60 rounded-lg overflow-y-auto">
          <div className="text-white text-lg font-semibold">Issues</div>
          {IssuesData.map(issue => (
            <div key={issue.id} className="border rounded-md border-gray-700 p-2 text-sm">
            {issue.payload.issue?.title}
            </div>
          ))}
        </div>
        <div className="col-span-2 border border-gray-700 flex flex-col gap-2 p-2 hover:border-[#ededed]/60 rounded-lg">
        <div className="text-white text-lg font-semibold"> Activity Feeds</div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
