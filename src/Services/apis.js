export const courseEndpoints = {
    GET_ALL_COURSES: "/api/course/getAllCourses",
    GET_FULL_COURSE_DETAILS: "/api/course/getFullCourseDetails",
    CREATE_NEW_COURSE: "/api/course/createCourse",
    UPDATE_COURSE: "/api/course/updateCourse",
    CREATE_NEW_SECTION: "/api/course/addSection",
    EDIT_SECTION: "/api/course/updateSection",
    DELETE_SECTION: "/api/course/deleteSection",
    CREATE_NEW_SUBSECTION: "/api/course/addSubSection",
    EDIT_SUBSECTION: "/api/course/updateSubSection",
    DELETE_SUBSECTION: "/api/course/deleteSubSection",
    GET_INSTRUCTOR_COURSES: "/api/course/getInstructorCourses",
    CREATE_RATING_API: "/api/course/createRating",
};

export const categoryEndpoints = {
    GET_CATEGORY_PAGE_DETAILS: "/api/course/getCategoryPageDetails",
    SHOW_ALL_CATEGORIES: "/api/course/showAllCategories",
}

export const authEndPoints = {
    RESET_PASSWORD_API: "/api/auth/reset-password",
    RESET_PASSWORD_TOKEN_API: "/api/auth/reset-password-token",
    LOGIN_API: "/api/auth/login",
    LOGOUT_API: "/api/auth/logout",
    SIGNUP_API: "/api/auth/signup",
    SEND_OTP: "/api/auth/sendOtp",
    IS_AUTHORIZED: "/api/auth/isAuthorized",
}

export const profileEndPoints = {
    UPDATE_PICTURE_API: "/api/profile/updateDisplayPicture",
    UPDATE_INFO_API: "/api/profile/updateProfile",
    DELETE_PROFILE_API: "/api/profile/deleteProfile",
    CHANGE_PASSWORD_API: "/api/auth/change-password"
}

export const paymentEndPoints = {
    CAPTURE_PAYMENT_API: "/api/payments/capturePayment",
    VERIFY_PAYMENT_API: "/api/payments/verifyPayment",
    SEND_PAYMENT_SUCCESS_MAIL_API: "/api/payments/sendPaymentSuccessMail",
}

