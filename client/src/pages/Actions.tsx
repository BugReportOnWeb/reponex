import { useState } from "react";
import RepositoryAction from "../components/actions/RepositoryAction";
import IssueAction from "../components/actions/IssueAction";
import PullRequestAction from "../components/actions/PullRequestAction";

type CurrentTabType = 'repository' | 'issue' | 'pullRequest'

const Actions = () => {
    const [currentTab, setCurrentTab] = useState<CurrentTabType>('repository');

    return (
        <div className='p-5'>
            <h1 className='font-bold text-4xl mb-3'>Actions</h1>
            <div className='w-fit flex flex-col gap-5 mb-7'>
                <div className='flex gap-7'>
                    <button
                        onClick={() => setCurrentTab('repository')}
                        className={`
                        flex items-center gap-2 transition-colors ease-in-out hover:text-[#ededed]/80 
                        ${currentTab === 'repository' ? 'text-[#e1e7ef]/80 underline underline-offset-8 decoration-[#e1e7ef]' : 'text-[#ededed]/60 no-underline'} 
                    `}
                    >Repository</button>
                    <button
                        onClick={() => setCurrentTab('issue')}
                        className={`
                        flex items-center gap-2 transition-colors ease-in-out hover:text-[#ededed]/80 
                        ${currentTab === 'issue' ? 'text-[#e1e7ef]/80 underline underline-offset-8 decoration-[#e1e7ef]' : 'text-[#ededed]/60 no-underline'} 
                    `}
                    >Issue</button>
                    <button
                        onClick={() => setCurrentTab('pullRequest')}
                        className={`
                        flex items-center gap-2 transition-colors ease-in-out hover:text-[#ededed]/80 
                        ${currentTab === 'pullRequest' ? 'text-[#e1e7ef]/80 underline underline-offset-8 decoration-[#e1e7ef]' : 'text-[#ededed]/60 no-underline'} 
                    `}
                    >Pull Request</button>
                </div>
                <div className='border border-[#e1e7ef]/40'></div>
            </div>
            {currentTab === 'repository' && <RepositoryAction />}
            {currentTab === 'issue' && <IssueAction />}
            {currentTab === 'pullRequest' && <PullRequestAction />}
        </div>
    )
}

export default Actions;
