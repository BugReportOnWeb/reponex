import { FaGithub } from "react-icons/fa";
import { copyrightYear, githubRepo } from "../lib/config";

const Footer = () => {
    return (
        <div className="absolute bottom-0 w-full p-5 flex items-center justify-center text-sm text-[#ededed]/60">
            <a href={githubRepo} target="_blank" className='mr-1.5'>
                <FaGithub className='text-base transition-colors hover:text-[#ededed]/80' />
            </a>
            &copy; {copyrightYear} RepoNex. All rights reserved. Made with ❤️
        </div>
    )
}

export default Footer;
