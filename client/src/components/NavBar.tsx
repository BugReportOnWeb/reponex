import { FiLogIn } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/user";
import NavLink from "./NavLink";

const NavBar = () => {
    const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

    return (
        <div className="p-5 w-full flex items-center justify-between">
            <Link to="/" className="font-bold text-2xl text-[#ededed] select-none">RepoNex</Link>
            <div className="h-full flex gap-6">
                {authUser ? (
                    <NavLink href='/chat'>
                        <h1 className="text-[0.9375rem]">Globe</h1>
                    </NavLink>
                ) : (
                    <>
                        <NavLink href='/login'>
                            <FiLogIn style={{ fontSize: "15px" }} />
                            <h1 className="text-[0.9375rem]">Login</h1>
                        </NavLink>
                        <NavLink href='/register'>
                            <IoPersonAddSharp style={{ fontSize: "15px" }} />
                            <span className="text-[0.9375rem]">Register</span>
                        </NavLink>
                    </>
                )}
                <NavLink href='/rules'>
                    <h1 className="text-[0.9375rem]">Rules</h1>
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar;
