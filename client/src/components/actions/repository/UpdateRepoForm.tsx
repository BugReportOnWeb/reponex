import { useState } from "react";

const UpdateRepoForm = () => {
    const [repoName, setRepoName] = useState('');
    const [repoNameUpdated, setRepoNameUpdated] = useState('');
    const [repoDescription, setRepoDescription] = useState('');
    const [repoPrivate, setRepoPrivate] = useState(false);
    const [repoOwner, setRepoOwner] = useState('');

    const updateRepository = () => {
        console.log({ action: 'UPDATE', repoName, repoNameUpdated, repoDescription, repoPrivate, repoOwner });

        setRepoName('');
        setRepoNameUpdated('');
        setRepoDescription('');
        setRepoPrivate(false);
        setRepoOwner('');
    }

    return (
        <form className='flex flex-col justify-start items-center gap-4'>
            <div className='flex flex-col gap-2 text-center'>
                <h1 className='font-extrabold text-2xl'>Update a Repository</h1>
                <p className='font-extralight text-sm'>Fill the updated details for your GitHub repository</p>
            </div>
            <div className='flex flex-col gap-3 w-72'>
                <label htmlFor="repoName">Repository Name (original)</label>
                <input
                    id="repoName"
                    type='text'
                    placeholder='sample-repository'
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    required
                />
                <label htmlFor="repoNameUpdated">Repository Name (updated)</label>
                <input
                    id="repoNameUpdated"
                    type='text'
                    placeholder='sample-repository-updated'
                    value={repoNameUpdated}
                    onChange={(e) => setRepoNameUpdated(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    required
                />
                <label htmlFor="repoDescription">Repository Description (updated)</label>
                <input
                    id="repoDescription"
                    type='text'
                    placeholder='New updated description'
                    value={repoDescription}
                    onChange={(e) => setRepoDescription(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    required
                />
                <label htmlFor="repoOwner">Repository Owner (original)</label>
                <input
                    id="repoOwner"
                    type='text'
                    placeholder='UserXYZ'
                    value={repoOwner}
                    onChange={(e) => setRepoOwner(e.target.value)}
                    className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    required
                />
                <div className='flex gap-2 items-center'>
                    <input
                        id="repoPrivate"
                        type='checkbox'
                        checked={repoPrivate}
                        onChange={() => setRepoPrivate(!repoPrivate)}
                        className='bg-transparent border border-[#272731] px-3.5 py-2.5 text-sm rounded-lg placeholder-[#A1A1AA] outline-none'
                    />
                    <h1>Private Repository</h1>
                </div>
                <button type="button" onClick={updateRepository} className='mt-3 inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer bg-white text-[#27272a] hover:bg-white/90'>
                    Update Repository
                </button>
            </div>
        </form>
    )
}

export default UpdateRepoForm;
