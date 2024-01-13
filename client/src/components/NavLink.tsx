import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

type NavLinkProps = {
    href: string
    children: ReactNode;
}

const NavLink = ({ children, href }: NavLinkProps) => {
    const { pathname } = useLocation();

    return (
        <Link to={href} className={`
            flex items-center gap-2 transition-colors ease-in-out hover:text-[#ededed]/80
            ${pathname === href ? 'text-[#e1e7ef]' : 'text-[#ededed]/60'} 
        `}>
            {children}
        </Link>
    )
}

export default NavLink;
