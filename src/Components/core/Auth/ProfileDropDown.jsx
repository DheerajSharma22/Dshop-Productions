import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoIosExit } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { logout } from "../../../Services/operations/authApi";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const [showDropDown, setShowDropDown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => setShowDropDown((prev) => !prev)}
        >
          <img src={user.image} alt="" className="rounded-full w-12 h-12" />
          {showDropDown ? (
            <FaCaretUp className="text-richblack-300 text-xl" />
          ) : (
            <FaCaretDown className="text-richblack-300 text-xl" />
          )}
        </div>

        {showDropDown && (
          <div
            className={`absolute top-[100%] right-0 flex flex-col bg-richblack-800  text-richblack-200 rounded-md`}
          >
            <Link
              to="/dashboard/my-profile"
              className="flex items-center gap-2 rounded-md py-3 px-5 hover:bg-richblack-500"
            >
              <MdDashboard />
              Dashboard
            </Link>
            <hr className="text-richblack-600" />
            <button className="flex items-center gap-2 rounded-md py-3 px-5 hover:bg-richblack-500" onClick={() => dispatch(logout(navigate))}>
              <IoIosExit />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDropDown;
