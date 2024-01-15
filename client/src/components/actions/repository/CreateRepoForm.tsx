import { useState } from "react";

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const CreateRepoForm = () => {
    const [repoName, setRepoName] = useState('');
    const [repoDescription, setRepoDescription] = useState('');
    const [repoPrivate, setRepoPrivate] = useState(false);

    const createRepo = async () => {
        const repoDetails = {
            repoName,
            description: repoDescription,
            privateRepo: repoPrivate
        }

        console.log({ action: 'CREATE', ...repoDetails });

        // TODO: Move to lib
        try {
            const res = await fetch('http://localhost:3000/api/repos/create', {
                method: 'POST',
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
        setRepoDescription('');
        setRepoPrivate(false);
    }

    return (
        <form className='h-fit flex flex-col justify-start items-center gap-4'>
            <div className='flex flex-col gap-2 text-center'> <h1 className='font-extrabold text-2xl'>Create a new Repository</h1>
                <p className='font-extralight text-sm'>Fill the essential details for a new GitHub repository</p>
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
                <label htmlFor="repoDescription">Repository Description</label>
                <input
                    id="repoDescription"
                    type='text'
                    placeholder='Sample description'
                    value={repoDescription}
                    onChange={(e) => setRepoDescription(e.target.value)}
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
                <button onClick={createRepo} type="button" className='mt-3 inline-flex w-full whitespace-nowrap items-center justify-center px-4 py-2 border border-[#27272a] font-medium text-sm rounded-md transition-colors cursor-pointer bg-white text-[#27272a] hover:bg-white/90'>
                    Create Repository
                </button>
            </div>
        </form>
    )
}

export default CreateRepoForm;
