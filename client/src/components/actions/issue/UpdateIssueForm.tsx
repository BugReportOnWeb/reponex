import { useState } from "react";

const UpdateIssueForm = () => {
    const [repoName, setRepoName] = useState('');
    const [repoOwner, setRepoOwner] = useState('');
    const [issueNumber, setIssueNumber] = useState('');
    const [issueTitle, setIssueTitle] = useState('');
    const [issueBody, setIssueBody] = useState('');
    const [issueCloseState, setIssueCloseState] = useState(false);

    const updateIssue = () => {
        console.log({ action: 'UPDATE', repoName, repoOwner, issueTitle, issueNumber, issueCloseState, issueBody });

        setRepoName('');
        setRepoOwner('');
        setIssueNumber('');
        setIssueTitle('');
        setIssueBody('');
        setIssueCloseState(false);
    }

    return (
        <form className='h-fit flex flex-col justify-start items-center gap-3'>
            <div className='flex flex-col gap-2 text-center'> <h1 className='font-extrabold text-2xl'>Update an Issue</h1>
                <p className='font-extralight text-sm'>Fill the details to upate an existing issue</p>
            </div>
            <div className='flex flex-col gap-3 w-72'>
                <label htmlFor="repoName">Repository Name</label>
                <input
                    id="repoName"
                    type='text'
                    placeholder='sample-repository'
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    required={true}
                />
                <label htmlFor="repoOwner">Repository Owner</label>
                <input
                    id="repoOwner"
                    type='text'
                    placeholder='UserXYZ'
                    value={repoOwner}
                    onChange={(e) => setRepoOwner(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    required
                />
                <label htmlFor="issueNumber">Issue Number</label>
                <input
                    id="issueNumber"
                    type='number'
                    placeholder='#345 Issue number'
                    value={issueNumber}
                    onChange={e => setIssueNumber(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    required
                />
                <label htmlFor="issueTitle">Issue Title (updated)</label>
                <input
                    id="issueTitle"
                    type='text'
                    placeholder='Sample updated issue title'
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                />
                <label htmlFor="issueBody">Issue Body (updated)</label>
                <textarea
                    id="issueBody"
                    placeholder='Sample updated issue body'
                    value={issueBody}
                    onChange={(e) => setIssueBody(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                />
                <div className='flex gap-2 items-center'>
                    <input
                        id="issueCloseState"
                        type='checkbox'
                        checked={issueCloseState}
                        onChange={() => setIssueCloseState(!issueCloseState)}
                        className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    />
                    <h1>Close Issue</h1>
                </div>
                <button onClick={updateIssue} type="button" className='mt-1 inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer bg-white text-[#27272a] hover:bg-white/90'>
                    Update Issue
                </button>
            </div>
        </form>
    )
}

export default UpdateIssueForm;
