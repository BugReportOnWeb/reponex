import { useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";
import { AuthUserContextType } from "../types/user";
import { userData } from "../localStore/userData";
import UserData from "../components/UserData";

const Dashboard = () => {
  const { authUser } = useContext(AuthUserContext) as AuthUserContextType;

  return (
    <main className='p-5 pb-20 w-full min-h-screen flex flex-col gap-3'>
      <h1 className="text-2xl text-white font-semibold">Hello, {userData.login}!</h1>
      <section className="w-full h-[75vh] grid grid-cols-4 grid-rows-2 gap-x-5 gap-y-3">
        <div className="flex col-span-2 border border-gray-700 hover:border-[#ededed]/60 rounded-lg w-full h-full">
          <div className="w-1/3 h-full p-3 flex flex-col gap-3 justify-center items-center00">
            <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
              <img src={userData.avatar_url} alt={userData.name} className="rounded-full" />
            </a>
          </div>
          <div className="w-2/3">
            <UserData userData={userData} />
          </div>
        </div>
        <div className="col-span-2 border border-gray-700 hover:border-[#ededed]/60 rounded-lg">4</div>
        <div className="border border-gray-700 hover:border-[#ededed]/60 rounded-lg">5</div>
        <div className="border border-gray-700 hover:border-[#ededed]/60 rounded-lg">6</div>
        <div className="col-span-2 border border-gray-700 hover:border-[#ededed]/60 rounded-lg">7</div>
      </section>
    </main>
  );
}

export default Dashboard;
