import { repoData } from '../../../localStore/repoData';
import { Repository } from '../../../types/repo';
import RepoCard from './RepoCard';

const RepositoryList = () => {
    const owner = repoData[0].owner.login;
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
        <div className='mt-12 h-52 col-span-2 p-5'>
            <h1 className='font-extrabold text-2xl mb-2'>Repositories List <span className='font-extralight text-sm ml-2'>~ {owner}</span></h1>
            <div className='flex flex-col overflow-y-auto h-[80%]'>
                {repositories.map((repo, index) => (
                    <RepoCard key={index} repo={repo} />
                ))}
            </div>
        </div>
    )
}

export default RepositoryList;
