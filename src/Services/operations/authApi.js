import { setLoading } from "../../Redux/Slices/authSlice";
import { apiConnector } from "../apiconnector";
import { authEndPoints } from "../apis";
import { setUser } from '../../Redux/Slices/profileSlice'
import toast from "react-hot-toast";


export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            const res = await apiConnector("POST", authEndPoints.SEND_OTP, { email });

            if (!res.data.success) throw new Error(res.data.message);

            toast.success(res?.data?.message);
            navigate("/verify-email");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const signup = (firstName, lastName, email, password, confirmPassword, accountType, otp, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            const res = await apiConnector("POST", authEndPoints.SIGNUP_API, { firstName, lastName, email, password, confirmPassword, accountType, otp, navigate });

            if (!res?.data?.success) throw new Error(res?.data?.message);

            toast.success(res?.data?.message);
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}


export const login = (email, password, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");

        try {
            const response = await apiConnector("POST", authEndPoints.LOGIN_API, { email, password });

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            dispatch(setUser(response?.data?.User));
            toast.success(response?.data?.message);
            navigate("/dashboard/my-profile");
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const logout = (navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");

        try {
            const res = await apiConnector("GET", authEndPoints.LOGOUT_API);
            dispatch(setUser(null));
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const getPasswordResetToken = (email, setEmailSent) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", authEndPoints.RESET_PASSWORD_TOKEN_API, { email });

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            toast.success(response?.data?.message);
            setEmailSent(true);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        dispatch(setLoading(false));
    }
}

export const resetPassword = (password, confirmPassword, token) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const response = await apiConnector("POST", authEndPoints.RESET_PASSWORD_API, { password, confirmPassword, token });

            if (!response?.data?.success) {
                throw new Error(response?.data?.message);
            }

            toast.success(response?.data?.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
        }
        dispatch(setLoading(false));
    }
}

export const checkLoggedIn = () => {
    return async (dispatch) => {
        try {
            const res = await apiConnector("GET", authEndPoints.IS_AUTHORIZED);
            dispatch(setUser(res?.data?.User));
            return true;
        } catch (error) {
            return false;
        }
    }
}