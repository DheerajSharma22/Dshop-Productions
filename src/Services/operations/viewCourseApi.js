import toast from "react-hot-toast"
import { apiConnector } from '../apiconnector';
import { courseEndpoints } from '../apis';

export const createRating = async (data) => {
    const toastId = toast.loading("Loading...");
    try {
        const res = await apiConnector("POST", courseEndpoints.CREATE_RATING_API, data);
        toast.success(res.data.message);
    } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
}