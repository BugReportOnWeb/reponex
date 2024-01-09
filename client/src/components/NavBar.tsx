import React from "react";
import { FiLogIn } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const pathname = useLocation();

  return (
    <main className="w-full h-12 flex items-center justify-between">
      <section>
        <a href="/" className="font-extrabold text-2xl select-none">
          RepoNex
        </a>
      </section>
      <section className="h-full flex font-heading">
        <a
          href="/login"
          className={
            pathname.pathname === "/login"
              ? "underline text-white h-full flex items-center justify-center rounded-lg gap-2 px-2"
              : "h-full flex items-center justify-center rounded-lg gap-2 px-2 text-slate-300 hover:text-white"
          }
        >
          <span>
            <FiLogIn style={{ fontSize: "20px" }} />
          </span>
          <span className="h-full flex items-center text-sm">Login</span>
        </a>
        <a
          href="/register"
          className={
            pathname.pathname === "/register"
              ? "underline text-white h-full flex items-center justify-center rounded-lg gap-2 px-2"
              : "h-full flex items-center justify-center rounded-lg gap-2 px-2 text-slate-300 hover:text-white"
          }
        >
          <span>
            <IoPersonAddSharp style={{ fontSize: "20px" }} />
          </span>
          <span className="h-full flex items-center text-sm">Register</span>
        </a>
      </section>
    </main>
  );
};

export default NavBar;
