// Types
import { GitHubUser } from "../../types/github";

// Icons
import { RiGitRepositoryCommitsFill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import {
    FaLocationDot,
    FaLink,
    FaPeopleGroup,
    FaUserGroup,
} from "react-icons/fa6";

type UserDataProps = {
    userData: GitHubUser;
}

const UserData = ({ userData }: UserDataProps) => {
    return (
        <div className="h-full flex flex-col justify-center items-center">
            <div className='p-5'>
                <div className='mb-3.5'>
                    <div className="text-3xl font-bold mb-2">{userData.name} <span className='text-sm font-light text-gray-300'>({userData.login})</span></div>
                    <div className="text-[#ededed]/60 text-sm font-bold">"{userData.bio}"</div>
                </div>
                <div className='flex flex-col gap-2'>
                    {userData.location && (
                        <div className="w-full flex gap-3 items-center">
                            <FaLocationDot />
                            <div className="text-sm">{userData.location}</div>
                        </div>
                    )}
                    {userData.blog && (
                        <div className="w-full flex gap-3 items-center">
                            <FaLink />
                            <a href={userData.blog} className="text-sm hover:text-blue-500">
                                {userData.blog}
                            </a>
                        </div>
                    )}
                    {userData.email && (
                        <div className="w-full flex gap-3 items-center">
                            <MdAttachEmail />
                            <a href={`mailto:${userData.email}`}>
                                <div className="text-sm">{userData.email}</div>
                            </a>
                        </div>
                    )}
                    <div className="w-full flex gap-3 items-center">
                        <FaUserGroup />
                        <div className="text-sm">
                            {userData.followers}{" "}
                            <span className="pl-1 text-[#ededed]/60">Followers</span>
                        </div>
                    </div>
                    <div className="w-full flex gap-3 items-center">
                        <FaPeopleGroup />
                        <div className="text-sm">
                            {userData.following}{" "}
                            <span className="pl-1 text-[#ededed]/60">Followings</span>
                        </div>
                    </div>
                    <div className="w-full flex gap-3 items-center">
                        <RiGitRepositoryCommitsFill />
                        <div className="text-sm">
                            {userData.public_repos}{" "}
                            <span className="pl-1 text-[#ededed]/60">Public Repos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UserData;
