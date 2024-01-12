import { FiLogIn } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/user";

const NavBar = () => {
    const { pathname } = useLocation();
    const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

    return (
        <div className="p-5 w-full flex items-center justify-between">
            <Link to="/" className="font-bold text-2xl text-[#ededed] select-none">RepoNex</Link>

            <div className="h-full flex gap-6">
                {authUser ? (
                    <>
                        <h1>{authUser}</h1>
                        <Link to="/chat" className={`
                            flex items-center gap-2 transition-colors ease-in-out hover:text-[#ededed]/80
                            ${pathname === '/chat' ? 'text-[#e1e7ef]' : 'text-[#ededed]/60'} 
                        `}>
                            <h1 className="text-[0.9375rem]">Chat</h1>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/login" className={`
                            flex items-center gap-2 transition-colors ease-in-out hover:text-[#ededed]/80
                            ${pathname === '/login' ? 'text-[#e1e7ef]' : 'text-[#ededed]/60'} 
                        `}>
                            <FiLogIn style={{ fontSize: "15px" }} />
                            <h1 className="text-[0.9375rem]">Login</h1>
                        </Link>
                        <Link to="/register" className={`
                            flex items-center gap-2 transition-colors ease-in-out hover:text-[#ededed]/80
                            ${pathname === '/register' ? 'text-[#e1e7ef]' : 'text-[#ededed]/60'} 
                        `}>
                            <IoPersonAddSharp style={{ fontSize: "15px" }} />
                            <span className="text-[0.9375rem]">Register</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default NavBar;
