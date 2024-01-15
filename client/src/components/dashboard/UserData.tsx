import React from "react";
import {
    FaLocationDot,
    FaLink,
    FaPeopleGroup,
    FaUserGroup,
} from "react-icons/fa6";
import { RiGitRepositoryCommitsFill } from "react-icons/ri";
import { MdAttachEmail } from "react-icons/md";
import { GitHubUser } from "../../types/github";

interface UserDataProps {
    userData: GitHubUser;
}

const UserData: React.FC<UserDataProps> = ({ userData }) => {
    return (
        <div className="w-full h-full flex flex-col justify-center items-center gap-1">
            <div className="text-white text-lg">{userData.name}</div>
            <div className="text-[#ededed]/60 text-sm font-semibold">
                "{userData.bio}"
            </div>
            {userData.location && (
                <div className="w-full">
                    <section className="flex justify-between items-center gap-2">
                        <FaLocationDot className="w-1/5" />
                        <div className="text-sm w-4/5">{userData.location}</div>
                    </section>
                </div>
            )}
            {userData.blog && (
                <div className="w-full">
                    <a
                        href={userData.blog}
                        className="flex justify-between items-center gap-2"
                    >
                        <FaLink className="w-1/5" />
                        <a
                            href={userData.blog}
                            className="text-sm w-4/5 hover:text-blue-500"
                        >
                            {userData.blog}
                        </a>
                    </a>
                </div>
            )}
            {userData.email && (
                <div className="w-full">
                    <a
                        href={`mailto:${userData.email}`}
                        className="flex justify-between items-center gap-2"
                    >
                        <MdAttachEmail className="w-1/5" />
                        <div className="text-sm w-4/5">{userData.email}</div>
                    </a>
                </div>
            )}
            <div className="w-full">
                <section className="flex justify-between items-center gap-2">
                    <FaUserGroup className="w-1/5" />
                    <div className="text-sm w-4/5">
                        {userData.followers}{" "}
                        <span className="pl-2 text-[#ededed]/60">Followers</span>
                    </div>
                </section>
            </div>
            <div className="w-full">
                <section className="flex justify-between items-center gap-2">
                    <FaPeopleGroup className="w-1/5" />
                    <div className="text-sm w-4/5">
                        {userData.following}{" "}
                        <span className="pl-2 text-[#ededed]/60">Followings</span>
                    </div>
                </section>
            </div>
            <div className="w-full">
                <section className="flex justify-between items-center gap-2">
                    <RiGitRepositoryCommitsFill className="w-1/5" />
                    <div className="text-sm w-4/5">
                        {userData.public_repos}{" "}
                        <span className="pl-2 text-[#ededed]/60">Public Repos</span>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default UserData;
