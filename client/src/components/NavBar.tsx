import React from "react";

const NavBar = () => {
  return (
    <main className="w-full h-12 px-10 fixed flex items-center justify-between bg-opacity-75 backdrop-blur-md z-10 border-2 border-red-500">
      <section>
        <span className="font-extrabold text-xl select-none">RepoNex</span>
      </section>
      <section>register.login</section>
    </main>
  )
}

export default NavBar;
