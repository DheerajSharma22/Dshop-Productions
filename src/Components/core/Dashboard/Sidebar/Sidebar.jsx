import React, { useState } from "react";
import { sidebarLinks } from "../../../../data/dashboard-links";
import { logout } from "../../../../Services/operations/authApi";
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../../common/ConfirmationModal';

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState();

  if (profileLoading || authLoading)
    return (
      <div className="w-screen h-screen">
        <div className="custom-loader"></div>
      </div>
    );

  const settingLink = {
    id: 1,
    name: "Settings",
    path: "/dashboard/settings",
    icon: "CiSettings",
  };

  return (
    <>
      <div className="fixed left-0 w-screen lg:top-[3.5rem] bottom-0 lg:h-[100vh] lg:w-[250px]">
        <div className="flex flex-row lg:flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 lg:py-10 h-full flex-wrap gap-3">
          <div className="flex lg:flex-col lg:items-start flex-row items-center gap-1">
            {sidebarLinks.map((item) => {
              if (item.type && user?.accountType !== item.type) return null;
              return (
                <SidebarLinks key={item.id} link={item} iconName={item.icon} />
              );
            })}
          </div>
          <div className="max-w-maxContent w-10/12 h-[1px] bg-richblack-700 mx-auto hidden lg:block"></div>

          <div className="flex lg:flex-col lg:items-start flex-row items-center gap-1">
            <SidebarLinks
              link={settingLink}
              iconName={settingLink.icon}
            />
            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are You Sure ?",
                  text2: "You will be logged out of your account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="px-4 lg:px-8 py-3 text-sm font-medium"
            >
              <div className={`flex items-center gap-2 text-richblack-300`}>
                <VscSignOut className="text-lg" />
                <span className="lg:block hidden">Logout</span>
              </div>
            </button>
          </div>
        </div>

      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default Sidebar;
