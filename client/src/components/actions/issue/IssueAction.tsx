import CreateIssueForm from "./CreateIssueForm";
import LockUnlockIssueForm from "./LockUnlockIssueForm";
import UpdateIssueForm from "./UpdateIssueForm";

const IssueAction = () => {
    return (
        <div className='border h-[40rem] grid grid-rows-2 grid-cols-3 gap-4'>
            <CreateIssueForm />
            <UpdateIssueForm />
            <LockUnlockIssueForm />
        </div>
    )
}

export default IssueAction;
