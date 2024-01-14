import CreateRepoForm from "./CreateRepoForm";
import DeleteRepoForm from "./DeleteRepoForm";
import UpdateRepoForm from "./UpdateRepoForm";

const RepositoryAction = () => {
    return (
        <div className='h-[calc(100vh-18rem)] flex justify-around gap-7'>
            <CreateRepoForm />
            <UpdateRepoForm />
            <DeleteRepoForm />
        </div>
    )
}

export default RepositoryAction;
