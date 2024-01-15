import { useState } from "react";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const UpdateRepoForm = () => {
    const [repoName, setRepoName] = useState('');
    const [repoNameUpdated, setRepoNameUpdated] = useState('');
    const [repoDescriptionUpdated, setRepoDescriptionUpdated] = useState('');
    const [repoPrivateUpdated, setRepoPrivateUpdated] = useState(false);
    const [repoOwner, setRepoOwner] = useState('');

    const updateRepository = async () => {
        const repoDetails = {
            name: repoNameUpdated,
            description: repoDescriptionUpdated,
            repoPrivate: repoPrivateUpdated
        }

        console.log({ action: 'UPDATE', ...repoDetails, repoOwner, repoName });

        // TODO: Move to lib
        try {
            const res = await fetch(`http://localhost:3000/api/repos/update/${repoOwner}/${repoName}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GITHUB_TOKEN}`
                },
                body: JSON.stringify(repoDetails)
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
        setRepoNameUpdated('');
        setRepoDescriptionUpdated('');
        setRepoPrivateUpdated(false);
        setRepoOwner('');
    }

    return (
        <form className='h-fit row-span-2 flex flex-col justify-start items-center gap-4'>
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
                <label htmlFor="repoDescriptionUpdated">Repository Description (updated)</label>
                <input
                    id="repoDescriptionUpdated"
                    type='text'
                    placeholder='New updated description'
                    value={repoDescriptionUpdated}
                    onChange={(e) => setRepoDescriptionUpdated(e.target.value)}
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
                        id="repoPrivateUpdated"
                        type='checkbox'
                        checked={repoPrivateUpdated}
                        onChange={() => setRepoPrivateUpdated(!repoPrivateUpdated)}
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
