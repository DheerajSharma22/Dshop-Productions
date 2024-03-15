import React from 'react'
import * as Icons from 'react-icons/vsc';
import { CiSettings } from "react-icons/ci";
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLinks = ({ link, iconName }) => {
    const location = useLocation();
    const Icon = iconName === "CiSettings" ? CiSettings : Icons[iconName];

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <NavLink to={link.path} className={`relative px-4 lg:px-8 w-full py-3 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-600" : ""}`}>
            {matchRoute(link.path) ? <span className='absolute w-1 left-0 top-0 h-full bg-yellow-50'></span> : ""}
            <div className={`flex items-center gap-2 ${!matchRoute(link.path) ? "text-richblack-300" : "text-yellow-50"}`}>
                <Icon className=" text-2xl lg:text-lg" />
                <span className='lg:block hidden'>{link.name}</span>
            </div>
        </NavLink>
    )
}

export default SidebarLinks;
