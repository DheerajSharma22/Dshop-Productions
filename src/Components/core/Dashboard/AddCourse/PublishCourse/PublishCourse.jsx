import React, { useEffect, useState } from "react";
import IconBtn from "../../../../common/IconBtn";
import {
  resetCourseState,
  setStep,
} from "../../../../../Redux/Slices/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { COURSE_STATUS } from "../../../../../Utils/constants";
import { editCourseHandler } from "../../../../../Services/operations/courseApi";
import { useNavigate } from "react-router-dom";

const PublishCourse = () => {
  const [loading, setLoading] = useState();
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, getValues } = useForm();

  const goBack = () => {
    dispatch(setStep(2));
  };

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    // If there is no updates
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("publishCourse") === true) ||
      (course?.status === COURSE_STATUS.DRAFTED &&
        getValues("publishCourse") === false)
    ) {
      goToCourses();
      return;
    }
    
    const formData = new FormData();
    formData.append("courseId", course?._id);
    formData.append(
      "status",
      getValues("publishCourse")
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFTED
    );

    setLoading(true);
    const result = await dispatch(editCourseHandler(formData));

    if (result) {
      goToCourses();
    }

    setLoading(false);
  };

  const submitHandler = (e) => {
    handleCoursePublish();
  };

  useEffect(() => {
    setValue("publishCourse", course?.status === COURSE_STATUS.PUBLISHED);
  }, [course?.status, setValue]);

  return (
    <div className="p-8 bg-richblack-800 mt-10 rounded-md">
      <h3 className="text-2xl font-semibold">Publish Settings</h3>

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="my-7 flex items-center gap-3 text-lg">
          <input
            type="checkbox"
            name="publishCourse"
            id="publishCourse"
            {...register("publishCourse")}
          />

          <label htmlFor="publishCourse">Make this course as public</label>
        </div>
        <div className="flex items-center gap-3 mt-5 justify-end">
          <button
            className={
              "bg-richblack-300 py-2 px-6 rounded-md font-semibold text-black"
            }
            onClick={goBack}
            disabled={loading}
          >
            Back
          </button>
          <IconBtn
            // onClick={goToNext}
            type={"submit"}
            disabled={loading}
            text={"Save Changes"}
            customClasses={
              "bg-yellow-50 py-2 px-6 rounded-md font-semibold text-black"
            }
          >
            <></>
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default PublishCourse;
