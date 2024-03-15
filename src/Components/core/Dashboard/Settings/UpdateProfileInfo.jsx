import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateInfoHandler } from '../../../../Services/operations/profileApi';

const UpdateProfileInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);
    const [profileInformation, setProfileInformation] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        about: "",
    });
    
    useEffect(() => {
        setProfileInformation({
            firstName: user?.firstName,
            lastName: user?.lastName,
            gender: user?.additionalDetails?.gender,
            contactNumber: user?.additionalDetails?.contactNumber,
            dateOfBirth: user?.additionalDetails?.dateOfBirth,
            about: user?.additionalDetails?.about,
        });
    }, [user]);

    const infoChangeHandler = (e) => {
        setProfileInformation((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };

    return (
        <>
            <div className="w-full bg-richblack-800 rounded-md px-10 py-8 mb-10">
                <div className="flex items-center sm:flex-row justify-between flex-col-reverse gap-y-5 mb-10">
                    <p className="text-xl font-semibold">Profile Information</p>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    <div>
                        <p className="text-lg text-richblack-5 mb-2">Firstname</p>
                        <input
                            type="text"
                            value={profileInformation?.firstName}
                            name="firstName"
                            className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
                            onChange={infoChangeHandler}
                        />
                    </div>

                    <div>
                        <p className="text-lg text-richblack-5 mb-2">Lastname</p>
                        <input
                            name="lastName"
                            type="text"
                            value={profileInformation?.lastName}
                            className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
                            onChange={infoChangeHandler}
                        />
                    </div>

                    <div>
                        <p className="text-lg text-richblack-5 mb-2">Date Of Birth</p>
                        <input
                            name="dateOfBirth"
                            type="date"
                            value={profileInformation?.dateOfBirth}
                            className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
                            onChange={infoChangeHandler}
                        />
                    </div>

                    <div>
                        <p className="text-lg text-richblack-5 mb-2">Gender</p>
                        <select
                            name="gender"
                            value={profileInformation?.gender}
                            onChange={infoChangeHandler}
                            className="px-3 py-4 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>

                    <div>
                        <p className="text-lg text-richblack-5 mb-2">Contact Number</p>
                        <input
                            name="contactNumber"
                            type="text"
                            placeholder="Enter Your Contact Number"
                            value={profileInformation?.contactNumber}
                            className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
                            onChange={infoChangeHandler}
                        />
                    </div>

                    <div>
                        <p className="text-lg text-richblack-5 mb-2">About</p>
                        <input
                            name="about"
                            type="text"
                            placeholder="Enter Bio Details"
                            value={profileInformation?.about}
                            className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
                            onChange={infoChangeHandler}
                        />
                    </div>
                </div>
            </div>

            {/* Section 2 Buttons */}
            <div className="flex items-center justify-end gap-5 mb-10">
                <button
                    className="px-6 py-3 bg-richblack-700 rounded-md cursor-pointer"
                    onClick={() => navigate("/dashboard/my-profile")}
                >
                    Cancel
                </button>
                <button
                    className="px-6 py-3 bg-yellow-50 rounded-md cursor-pointer text-black font-bold"
                    onClick={() => dispatch(updateInfoHandler(profileInformation))}
                >
                    Save
                </button>
            </div>
        </>
    )
}

export default UpdateProfileInfo
