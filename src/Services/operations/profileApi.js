import toast from "react-hot-toast";
import { apiConnector } from '../apiconnector';
import { profileEndPoints } from "../apis";

export const uploadImageHandler = (profileImg) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const formData = new FormData();
            formData.append("image", profileImg.file);
            const res = await apiConnector("PUT", profileEndPoints.UPDATE_PICTURE_API, formData);
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
};

export const updateInfoHandler = (profileInfo) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        console.log(profileInfo);
        try {
            const res = await apiConnector("PUT", profileEndPoints.UPDATE_INFO_API, profileInfo);
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const deleteProfileHandler = () => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const res = await apiConnector("DELETE", profileEndPoints.DELETE_PROFILE_API);
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}

export const changePasswordHandler = (currPassword, newPassword) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const res = await apiConnector("PUT", profileEndPoints.CHANGE_PASSWORD_API, { currPassword, newPassword });
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        toast.dismiss(toastId);
    }
}