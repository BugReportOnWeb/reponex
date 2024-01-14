import CreateRepoForm from "./CreateRepoForm";
import DeleteRepoForm from "./DeleteRepoForm";
import RepositoryList from "./RepositoryList";
import UpdateRepoForm from "./UpdateRepoForm";

const RepositoryAction = () => {
    return (
        <div className='h-[calc(100vh-18rem)] grid grid-rows-2 grid-cols-3 gap-4'>
            <CreateRepoForm />
            <DeleteRepoForm />
            <UpdateRepoForm />
            <RepositoryList />
        </div>
    )
}

export default RepositoryAction;
