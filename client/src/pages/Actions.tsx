import { useState } from "react";
import RepositoryAction from "../components/actions/repository/RepositoryAction";
import IssueAction from "../components/actions/issue/IssueAction";
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
                </div>
                <div className='border border-[#e1e7ef]/40'></div>
            </div>
            {/* TODO: Complete pull reaquest request */}
            {currentTab === 'repository' && <RepositoryAction />}
            {currentTab === 'issue' && <IssueAction />}
        </div>
    )
}

export default Actions;
