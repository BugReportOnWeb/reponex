import { FaRegStar, FaRegEye } from "react-icons/fa";
import { GoRepoForked } from "react-icons/go";
import { AiOutlineIssuesClose } from "react-icons/ai";
import { FilterRepo } from "../../../types/github";

type RepoCardProps = {
    repo: FilterRepo;
}

const RepoCard = ({ repo }: RepoCardProps) => {
    return (
        <div className='rounded-lg p-2 flex justify-between'>
            <div>
                <a target='_blank' href={repo.url} className='font-bold text-lg'>{repo.name} {repo.language && <span className='font-extralight text-sm ml-1'>({repo.language})</span>}</a>
                <h1 className='font-extralight text-sm'>{repo.description}</h1>
            </div>
            <div className='flex gap-3'>
                {repo.watchers_count >= 0 && (
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
    )
}

export default RepoCard;
