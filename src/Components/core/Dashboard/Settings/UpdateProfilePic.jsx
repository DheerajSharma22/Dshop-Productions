import React, { useEffect, useState } from 'react'
import IconBtn from '../../../common/IconBtn'
import { VscCloudUpload } from 'react-icons/vsc'
import { uploadImageHandler } from '../../../../Services/operations/profileApi';
import { useDispatch, useSelector } from 'react-redux';


const UpdateProfilePic = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.profile);

    const [profileImg, setProfileImg] = useState({
        file: null,
        name: "",
    });

    const fileChangeHandler = (e) => {
        setProfileImg({
            file: e.target.files[0],
            name: URL.createObjectURL(e.target.files[0]),
        });
    };

    useEffect(() => {
        setProfileImg({
            file: null,
            name: user?.image,
        });
    }, [user]);

    return (
        <div>
            <div className="w-full bg-richblack-800 rounded-md px-10 py-8 mb-10">
                <div className="flex items-center sm:flex-row justify-between flex-col-reverse gap-y-5">
                    <div className="flex items-center gap-5 sm:flex-row flex-col">
                        <img
                            src={profileImg.name}
                            alt="profile"
                            className="w-[90px] aspect-square rounded-full object-cover"
                        />
                        <div className="text-center lg:text-start">
                            <p className="text-md sm:text-lg font-semibold">
                                Change Profile Picture
                            </p>
                            <div className="flex items-center gap-3 mt-3 flex-wrap justify-center">
                                <label
                                    htmlFor="browse"
                                    className="px-6 py-3 bg-richblack-700 rounded-md cursor-pointer"
                                >
                                    Select
                                </label>
                                <input
                                    className="hidden"
                                    id="browse"
                                    accept="image/png, image/gif, image/jpeg"
                                    type="file"
                                    onChange={fileChangeHandler}
                                />

                                <IconBtn
                                    text="Upload"
                                    onClick={() => dispatch(uploadImageHandler(profileImg))}
                                    customClasses="bg-yellow-50 rounded-md px-5 py-2 text-lg text-black font-semibold"
                                >
                                    <VscCloudUpload />
                                </IconBtn>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfilePic
