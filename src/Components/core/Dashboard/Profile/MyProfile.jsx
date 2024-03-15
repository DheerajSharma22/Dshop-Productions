import React from "react";
import IconBtn from "../../../common/IconBtn";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { VscEdit } from "react-icons/vsc";

const MyProfile = () => {
  const navigate = useNavigate();
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );

  if (profileLoading)
    return (
      <div className="h-screen w-screen">
        <div className="custom-loader"></div>
      </div>
    );

  return (
    <div className="px-5 lg:px-14 py-3 text-white">
      <h1 className="text-3xl font-semibold mb-10">My Profile</h1>

      {/* Section 1 */}
      <div className="w-full bg-richblack-800 rounded-md px-10 py-8 mb-10">
        <div className="flex items-center sm:flex-row justify-between flex-col-reverse gap-y-5">
          <div className="flex items-center gap-5 md:flex-row flex-col">
            <img
              src={user?.image}
              alt="profile"
              className="w-[90px] aspect-square rounded-full object-cover"
            />
            <div className="text-center lg:text-start">
              <p className="text-md sm:text-xl font-bold">
                {user?.firstName + " " + user?.lastName}
              </p>
              <p className="text-md sm:text-xl font-bold">{user?.email}</p>
            </div>
          </div>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
            customClasses="bg-yellow-50 rounded-md px-5 py-2 text-lg text-black font-semibold"
          >
            <VscEdit />
          </IconBtn>
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full bg-richblack-800 rounded-md px-10 py-8 mb-10">
        <div className="flex items-center sm:flex-row justify-between flex-col-reverse gap-y-5 mb-16">
          <p className="text-2xl font-semibold">About</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
            customClasses="bg-yellow-50 rounded-md px-5 py-2 text-lg text-black font-semibold"
          >
            <VscEdit />
          </IconBtn>
        </div>
        <p className="text-richblack-300 text-lg">
          {user?.additionalDetails?.about ?? "Write something about yourself."}
        </p>
      </div>

      {/* Section 3 */}
      <div className="w-full bg-richblack-800 rounded-md px-10 py-8 mb-10">
        <div className="flex items-center sm:flex-row justify-between flex-col-reverse gap-y-5 mb-8">
          <p className="text-2xl font-semibold">Personal Details</p>
          <IconBtn
            text="Edit"
            onClick={() => navigate("/dashboard/settings")}
            customClasses="bg-yellow-50 rounded-md px-5 py-2 text-lg text-black font-semibold"
          >
            <VscEdit />
          </IconBtn>
        </div>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-y-8">
          <div>
            <p className="text-lg text-richblack-500 mb-2">Firstname</p>
            <p>{user?.firstName}</p>
          </div>

          <div>
            <p className="text-lg text-richblack-500 mb-2">Email</p>
            <p>{user?.email}</p>
          </div>

          <div>
            <p className="text-lg text-richblack-500 mb-2">Gender</p>
            <p>{user?.additionalDetails?.gender ?? "Add Gender"}</p>
          </div>

          <div>
            <p className="text-lg text-richblack-500 mb-2">Lastname</p>
            <p>{user?.lastName}</p>
          </div>

          <div>
            <p className="text-lg text-richblack-500 mb-2">Phone Number</p>
            <p>
              {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
            </p>
          </div>

          <div>
            <p className="text-lg text-richblack-500 mb-2">Date Of Birth</p>
            <p>
              {user?.additionalDetails?.dateOfBirth ?? "Add date of birth."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
