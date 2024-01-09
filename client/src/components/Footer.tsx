import React from "react";
import { FaGithub } from "react-icons/fa";
import { githubRepo, copyrightYear } from "../utils/config";

const Footer = () => {
  const handleMouseEnter = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.currentTarget.style.color = "white";
  };

  const handleMouseLeave = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.currentTarget.style.color = "grey";
  };

  return (
    <main className="w-full h-28 flex items-center justify-center font-heading">
      <a href={githubRepo} target="_blank">
        <FaGithub
          style={{
            fontSize: "26px",
            color: "grey",
            transition: "color 0.3s ease-in-out",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </a>
      <span className="text-slate-300 mx-2">&copy; {copyrightYear} .</span>
      <span className="text-slate-300">All rights reserved .</span>
      <span className="text-slate-300 mx-2">Made with ❤️.</span>
    </main>
  );
};

export default Footer;
