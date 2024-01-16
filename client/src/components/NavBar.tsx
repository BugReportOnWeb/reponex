// Core
import { useContext } from "react";
import { Link } from "react-router-dom";

// Context
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/auth";
import { MessageLogsContext } from "../context/MessageLogsContext";
import { MessageLogsContextType } from "../types/message";

// Icons
import { FiLogIn } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { IoCodeWorking } from "react-icons/io5";

// Extras
import NavLink from "./NavLink";
import socket from "../socket/socket";

const NavBar = () => {
  const { authUser, setAuthUser } = useContext(
    AuthUserContext,
  ) as AuthUserContextType;
  const { setMessageDataLogs } = useContext(
    MessageLogsContext,
  ) as MessageLogsContextType;

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("reposData");
    localStorage.removeItem("eventsData");
    socket.disconnect();

    setAuthUser("");
    setMessageDataLogs([]);
  };

  return (
    <div className="p-5 w-full flex items-center justify-between">
      <Link to="/" className="font-bold text-2xl text-[#ededed] select-none">
        RepoNex
      </Link>
      <div className="h-full flex gap-6">
        {authUser ? (
          <>
            <NavLink href="/chat">
              <BsGlobe2 style={{ fontSize: "15px" }} />
              <h1 className="text-[0.9375rem]">Chat</h1>
            </NavLink>
            <NavLink href="/actions">
              <IoCodeWorking style={{ fontSize: "15px" }} />
              <h1 className="text-[0.9375rem]">Actions</h1>
            </NavLink>
            <button
              onClick={logoutUser}
              className="flex items-center gap-2 text-[#ededed]/60 transition-colors ease-in-out hover:text-[#ededed]/80"
            >
              <CiLogout style={{ fontSize: "15px" }} />
              <h1 className="text-[0.9375rem]">Logout</h1>
            </button>
          </>
        ) : (
          <>
            <NavLink href="/login">
              <FiLogIn style={{ fontSize: "15px" }} />
              <h1 className="text-[0.9375rem]">Login</h1>
            </NavLink>
            <NavLink href="/register">
              <IoPersonAddSharp style={{ fontSize: "15px" }} />
              <span className="text-[0.9375rem]">Register</span>
            </NavLink>
          </>
        )}
        <div className="border border-white/40"></div>
        <NavLink href="/rules">
          <IoBookOutline style={{ fontSize: "15px" }} />
          <h1 className="text-[0.9375rem]">Rules</h1>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
