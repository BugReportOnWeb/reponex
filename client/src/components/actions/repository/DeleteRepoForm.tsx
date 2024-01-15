import { useState } from "react";

const DeleteRepoForm = () => {
    const [repoName, setRepoName] = useState('');
    const [repoOwner, setRepoOwner] = useState('');

    const deleteRepo = () => {
        console.log({ action: 'DELETE', repoName, repoOwner });

        setRepoName('');
        setRepoOwner('');
    }

    return (
        <form className='h-fit flex flex-col justify-start items-center gap-4'>
            <div className='flex flex-col gap-2 text-center'> <h1 className='font-extrabold text-2xl'>Delete a Repository</h1>
                <p className='font-extralight text-sm'>Fill the repository name to permantly delete it</p>
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
                <button onClick={deleteRepo} type="button" className='text-[#FEF2F2] bg-[#7f1d1d] mt-3 inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer hover:bg-[#7f1d1d]/90'>
                    Delete Repository
                </button>
            </div>
        </form>
    )
}

export default DeleteRepoForm;
