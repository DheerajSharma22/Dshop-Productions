import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { HiChevronDown, HiMenu } from "react-icons/hi";
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { useSelector } from "react-redux";
import { getAllCategories } from "../../Services/operations/categoryApi";

const menuLinks = [
  {
    title: "home",
    link: "/",
  },
  {
    title: "about",
    link: "/about",
  },
  {
    title: "catalog",
    // link: "",
  },
  {
    title: "contact",
    link: "/contact",
  },
];


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const { user } = useSelector(state => state.profile);
  const [categorySubLinks, setCategorySubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const res = await getAllCategories();
      if (res) {
        setCategorySubLinks(res);
      }
      setLoading(false);
    }

    fetchCategories();
  }, []);

  if (loading) return <div className="custom-loader"></div>

  return (
    <header className="w-full fixed z-10 border-b-richblack-500 border bg-richblack-900">
      <div className="w-11/12 max-w-maxContent mx-auto h-14 flex items-center justify-between">
        {/* Logo */}
        <div>
          <NavLink to="/">
            <img src={logo} alt="" width={200} height={60} />
          </NavLink>
        </div>

        {/* Menu */}
        <nav>
          <ul
            className={`flex lg:relative lg:flex-row lg:top-0 lg:h-auto lg:w-auto lg:py-0 lg:transition-none lg:opacity-100 gap-x-6 gap-y-8 absolute top-[5rem] left-0 flex-col items-center py-10 h-[100vh] bg-richblack-900  text-richblack-50 capitalize text-lg z-10 ${openMenu ? "w-[100vw] sm:w-[40%]" : "opacity-0 w-[0%]"
              } transition-width duration-500`}
          >
            {menuLinks.map((menuElm, index) => {
              return menuElm.title === "catalog" ? (
                <li className="flex flex-col items-center cursor-pointer relative group hover:text-yellow-50" key={index}>
                  <div
                    className={`flex items-center gap-1 ${openCategoryMenu ? "mb-4" : ""} lg:m-0`}
                    onClick={() => setOpenCategoryMenu((prev) => !prev)}
                  >
                    {menuElm.title}
                    <HiChevronDown />
                  </div>

                  <div className="invisible group-hover:visible transition-all duration-200">
                    <div className="absolute lg:top-[100%] lg:left-[55%] lg:translate-x-[50%] lg:block hidden bg-white h-8 w-8 rotate-45"></div>
                    <ul
                      className={`lg:absolute lg:top-[150%] lg:left-[0%] lg:translate-x-[-25%] lg:w-[300px] lg:bg-white lg:text-richblack-900 lg:flex flex-col w-full text-center lg:px-7 lg:py-5 rounded-md ${!openCategoryMenu ? "hidden" : "flex"
                        }`}
                    >
                      {categorySubLinks.map((elm, index) => (
                        <Link to={`/catalog/${elm?.name.split(" ").join('-').toLowerCase()}`} className="w-full"
                          key={elm?._id}
                        >
                          <li onClick={() => setOpenMenu(false)}
                            className="hover:bg-richblack-100 hover:text-richblack-900 p-3 rounded-md w-full"
                          >
                            {elm?.name}
                          </li>
                        </Link>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li
                  className={`${location.pathname === menuElm.link ? "text-yellow-50" : ""
                    } hover:text-yellow-50`}
                  key={index}
                  onClick={() => setOpenMenu(false)}
                >
                  <Link to={menuElm.link}>{menuElm.title}</Link>
                </li>
              );
            })}

            {/* Login/Signup/Dashboard */}
            {user ? <div className="sm:hidden block"> <ProfileDropDown /></div> : (
              <div className="sm:hidden flex flex-col items-center gap-3">
                <Link to="/login">
                  <button className="bg-richblack-800 py-2 px-4 rounded-md text-richblack-50 text-lg ">
                    Log In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="bg-richblack-800 py-2 px-4 rounded-md text-richblack-50 text-lg ">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}

          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {/* Login/Signup/Dashboard */}
          {user ? (<>
            <div className="hidden sm:block">
              <ProfileDropDown />
            </div>
          </>) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/login">
                <button className="bg-richblack-800 py-2 px-4 rounded-md text-richblack-50 text-lg ">
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-richblack-800 py-2 px-4 rounded-md text-richblack-50 text-lg ">
                  Sign Up
                </button>
              </Link>
            </div>)}

          {/* Hamburger */}
          <div
            className="text-richblack-50 text-3xl cursor-pointer lg:hidden"
            onClick={() => setOpenMenu((prev) => !prev)}
          >
            {openMenu ? <span>&times;</span> : <HiMenu />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
