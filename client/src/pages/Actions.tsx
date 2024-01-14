import { useState } from "react";
import RepositoryAction from "../components/actions/RepositoryAction";
import IssueAction from "../components/actions/IssueAction";
import PullRequestAction from "../components/actions/PullRequestAction";
import ActionTab from "../components/actions/ActionTab";
import { ActionTabType } from "../types/action";

const Actions = () => {
    const [currentTab, setCurrentTab] = useState<ActionTabType>('repository');

    return (
        <div className='p-5'>
            <h1 className='font-bold text-4xl mb-3'>Actions</h1>
            <div className='w-fit flex flex-col gap-5 mb-7'>
                <div className='flex gap-7'>
                    <ActionTab
                        tab='repository'
                        currentTab={currentTab}
                        onClick={() => setCurrentTab('repository')}
                    >Repository</ActionTab>
                    <ActionTab
                        tab='issue'
                        currentTab={currentTab}
                        onClick={() => setCurrentTab('issue')}
                    >Issue</ActionTab>
                    <ActionTab
                        tab='pullRequest'
                        currentTab={currentTab}
                        onClick={() => setCurrentTab('pullRequest')}
                    >Pull Request</ActionTab>
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
