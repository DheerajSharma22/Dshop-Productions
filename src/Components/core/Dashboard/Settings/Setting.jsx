import React from "react";
import UpdateProfilePic from "./UpdateProfilePic";
import UpdateProfileInfo from "./UpdateProfileInfo";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const Setting = () => {

  return (
    <div className="px-5 lg:px-14 py-3 text-white">
      <h1 className="text-3xl font-semibold mb-10">Edit Profile</h1>

      {/* Section 1 */}
      <UpdateProfilePic />

      {/* Section 2 */}
      <UpdateProfileInfo />

      {/* Section 3 */}
      <ChangePassword />

      {/* Section 4 */}
      <DeleteAccount />
    </div>
  );
};

export default Setting;
