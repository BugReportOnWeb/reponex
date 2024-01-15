import { useState } from "react";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const CreateIssueForm = () => {
    const [repoName, setRepoName] = useState('');
    const [repoOwner, setRepoOwner] = useState('');
    const [issueTitle, setIssueTitle] = useState('');
    const [issueBody, setIssueBody] = useState('');

    const createIssue = async () => {
        const issueDetails = {
            title: issueTitle,
            body: issueBody
        }

        console.log({ action: 'CREATE', repoName, repoOwner, ...issueDetails });

        // TODO: Move to lib
        try {
            const res = await fetch(`http://localhost:3000/api/repos/issues/create/${repoOwner}/${repoName}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GITHUB_TOKEN}`
                },
                body: JSON.stringify(issueDetails)
            })

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error);
            }

            // TODO: Handle success and error accordingly
            console.log(data);
        } catch (error) {
            console.error(error);
        }

        setRepoName('');
        setRepoOwner('');
        setIssueTitle('');
        setIssueBody('');
    }

    return (
        <form className='h-fit flex flex-col justify-start items-center gap-4'>
            <div className='flex flex-col gap-2 text-center'> <h1 className='font-extrabold text-2xl'>Create a new Issue</h1>
                <p className='font-extralight text-sm'>Fill the essential details for a new GitHub issue</p>
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
                    required
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
                <label htmlFor="issueTitle">Issue Title</label>
                <input
                    id="issueTitle"
                    type='text'
                    placeholder='Sample issue title'
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    required
                />
                <label htmlFor="issueBody">Issue Body</label>
                <textarea
                    id="issueBody"
                    placeholder='Sample issue body'
                    value={issueBody}
                    onChange={(e) => setIssueBody(e.target.value)}
                    className='h-40 bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    required
                />
                <button onClick={createIssue} type="button" className='mt-3 inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer bg-white text-[#27272a] hover:bg-white/90'>
                    Create Issue
                </button>
            </div>
        </form>
    )
}

export default CreateIssueForm;
