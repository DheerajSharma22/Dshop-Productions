import { apiConnector } from "../apiconnector"
import toast from "react-hot-toast";
import { categoryEndpoints } from "../apis";

export const getAllCategories = async () => {
    const toastId = toast.loading("loading...");
    try {
        const res = await apiConnector("get", categoryEndpoints.SHOW_ALL_CATEGORIES);
        toast.dismiss(toastId);
        return res.data.allCategories;
    } catch (error) {
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

export const getCatalogPageData = async (categoryId) => {
    const toastId = toast.loading("loading...");
    try {
        const res = await apiConnector("POST", categoryEndpoints.GET_CATEGORY_PAGE_DETAILS, {categoryId});
        toast.dismiss(toastId);
        return res.data.data;
    } catch (error) {
        console.log(error?.response.data);
    }
    toast.dismiss(toastId);
}