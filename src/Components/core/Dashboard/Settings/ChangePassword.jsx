import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changePasswordHandler } from '../../../../Services/operations/profileApi';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { IoEyeOffOutline } from 'react-icons/io5';

const ChangePassword = () => {
    const [showCurrPassword, setShowCurrPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [currPassword, setCurrPassword] = useState();
    const [newPassword, setNewPassword] = useState();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div>
            <div className="w-full bg-richblack-800 rounded-md px-10 py-8 mb-10">
                <div className="flex items-center sm:flex-row justify-between flex-col-reverse gap-y-5 mb-10">
                    <p className="text-xl font-semibold">Change Password</p>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
                    <div className="flex flex-col gap-2 text-white text-lg relative">
                        <label htmlFor="password">
                            Current Password <sup className="text-pink-500">*</sup>
                        </label>
                        <div className="w-full relative">
                            <input
                                type={`${showCurrPassword ? "text" : "password"}`}
                                id="password"
                                value={currPassword}
                                onChange={(e) => setCurrPassword(e.target.value)}
                                placeholder="Enter Current Password"
                                className="p-4 bg-richblack-700 rounded-md outline-none w-full"
                                autoComplete="current-password"
                            />

                            <span
                                onClick={() => setShowCurrPassword((prev) => !prev)}
                                className="absolute top-[50%] translate-y-[-50%] right-[5%] text-xl cursor-pointer"
                            >
                                {!showCurrPassword ? (
                                    <MdOutlineRemoveRedEye />
                                ) : (
                                    <IoEyeOffOutline />
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-white text-lg relative">
                        <label htmlFor="newPassword">
                            New Password <sup className="text-pink-500">*</sup>
                        </label>
                        <div className="w-full relative">
                            <input
                                type={`${showNewPassword ? "text" : "password"}`}
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter New Password"
                                className="p-4 bg-richblack-700 rounded-md outline-none w-full"
                                autoComplete="current-password"
                            />

                            <span
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute top-[50%] translate-y-[-50%] right-[5%] text-xl cursor-pointer"
                            >
                                {!showNewPassword ? (
                                    <MdOutlineRemoveRedEye />
                                ) : (
                                    <IoEyeOffOutline />
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section 3 Buttons */}
            <div className="flex items-center justify-end gap-5 mb-10">
                <button
                    className="px-6 py-3 bg-richblack-700 rounded-md cursor-pointer"
                    onClick={() => navigate("/dashboard/my-profile")}
                >
                    Cancel
                </button>
                <button
                    className="px-6 py-3 bg-yellow-50 rounded-md cursor-pointer text-black font-bold"
                    onClick={() =>
                        dispatch(changePasswordHandler(currPassword, newPassword))
                    }
                >
                    Update
                </button>
            </div>
        </div>
    )
}

export default ChangePassword
