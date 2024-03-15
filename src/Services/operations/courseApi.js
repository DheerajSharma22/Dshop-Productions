import toast from "react-hot-toast";
import { setCourse, setStep } from "../../Redux/Slices/courseSlice";
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis";

export const createNewCourse = (formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        try {
            const res = await apiConnector(
                "POST",
                courseEndpoints.CREATE_NEW_COURSE,
                formData
            );
            dispatch(setCourse(res.data.newCourse))
            dispatch(setStep(2));
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const editCourseHandler = (formData) => {
    let results = [];
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const res = await apiConnector("put", courseEndpoints.UPDATE_COURSE, formData);
            dispatch(setCourse(res?.data?.updatedCourse));
            toast.success(res?.data?.message);
            results = res?.data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId);
        return results;
    }
}

export const deleteCourse = async (courseId) => {
    const toastId = toast.loading("Loading");
    try {
        const res = await apiConnector("delete", `/api/course/deleteCourse/${courseId}`);
        toast.success(res.data.message);
    } catch (error) {
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

export const getFullCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading");
    try {
        const res = await apiConnector("POST", `/api/course/getCourseDetails`, { courseId });
        toast.dismiss(toastId);
        return { ...res.data.courseDetails, completedVideos: res.data.completedVideos };
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
}

export const createNewSection = (sectionName, courseId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const res = await apiConnector("POST", courseEndpoints.CREATE_NEW_SECTION, { sectionName, courseId });
            dispatch(setCourse(res.data.courseDetails));
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const editSection = (sectionName, sectionId, courseId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");

        try {
            const res = await apiConnector("PUT", courseEndpoints.EDIT_SECTION, { sectionName, sectionId, courseId });
            toast.success(res.data.message);
            toast.dismiss(toastId);

            return res.data?.updatedSection;
        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const deleteSection = (sectionId, courseId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const res = await apiConnector("delete", courseEndpoints.DELETE_SECTION, { sectionId, courseId });
            dispatch(setCourse(res.data.courseDetails));
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const createSubSection = (formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const res = await apiConnector("post", courseEndpoints.CREATE_NEW_SUBSECTION, formData);
            toast.dismiss(toastId);
            toast.success(res.data.message);
            return res.data.updatedSection;
        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const editSubSection = (formData) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const res = await apiConnector("put", courseEndpoints.EDIT_SUBSECTION, formData);
            toast.dismiss(toastId);
            toast.success(res.data.message);
            return res.data.updatedSection;
        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const deleteSubSection = (subSectionId, sectionId) => {
    return async (dispatch) => {
        const toastId = toast.loading("Loading");
        try {
            const res = await apiConnector("delete", courseEndpoints.DELETE_SUBSECTION, { subSectionId, sectionId });
            toast.dismiss(toastId);
            toast.success(res.data.message);
            return res.data?.updatedSection;
        } catch (error) {
            toast.error(error.response.data.message);
        }
        toast.dismiss(toastId);
    }
}

export const fetchInstructorCourses = async () => {
    const toastId = toast.loading("Loading...");
    try {
        const res = await apiConnector("get", courseEndpoints.GET_INSTRUCTOR_COURSES);
        toast.dismiss(toastId);
        return res.data.courses;
    } catch (error) {
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);

}