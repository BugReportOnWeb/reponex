import { FiLogIn } from "react-icons/fi";
import { IoPersonAddSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { isTokenValid } from "../lib/isTokenValid";

const NavBar = () => {
  const { pathname } = useLocation();
  const [isValidSession, setIsValidSession] = useState(false);
  const [authUser, setAuthUser] = useState('');

  useEffect(() => {
    // Validating user jwt token and fetching username
    const fetchData = async () => {
      const isTokenExist = localStorage.getItem("token");
      if (isTokenExist == null) {
        return;
      }

      try {
        const data = await isTokenValid();
        setIsValidSession(data.valid);
        if (data.valid) {
          setAuthUser(data.username);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-5 w-full flex items-center justify-between">
      <Link to="/" className="font-bold text-2xl text-[#ededed] select-none">RepoNex</Link>

      {isValidSession ? (
        <div>{authUser}</div>
      ) : (

        <div className="h-full flex gap-6">
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
        </div>
      )}
    </div>
  )
}

export default NavBar;
