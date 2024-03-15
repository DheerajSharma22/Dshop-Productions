import React, { useEffect, useState } from "react";
import RenderSteps from "./RenderSteps";
import { useDispatch } from "react-redux";
import { resetCourseState } from "../../../../Redux/Slices/courseSlice";

const AddCourse = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(resetCourseState());
    setLoading(false);
    // eslint-disable-next-line
  }, []);
  
  if (loading) return <div className="custom-loader"></div>

  return (
    <div className="px-5 lg:px-14 py-3 text-white">
      <div className="flex items-start gap-10">
        <div className="w-[100%]">
          <h1 className="text-3xl font-semibold mb-10">My Courses</h1>
          <RenderSteps />
        </div>

        <div className="bg-richblack-800 p-5 w-fit h-fit rounded-md xl:block hidden">
          <h4 className="text-xl mb-5">⚡Course Upload Tips</h4>
          <ul className="flex flex-col gap-3 px-8">
            <li className="text-[12px] list-disc w-auto">
              Set the Course Price option or make it free.
            </li>
            <li className="text-[12px] list-disc">
              Standard size for the course thumbnail is 1024x576.
            </li>
            <li className="text-[12px] list-disc">
              Video section controls the course overview video.
            </li>
            <li className="text-[12px] list-disc">
              Course Builder is where you create & organize a course.
            </li>
            <li className="text-[12px] list-disc">
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li className="text-[12px] list-disc">
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li className="text-[12px] list-disc">
              Make Announcements to notify any important
            </li>
            <li className="text-[12px] list-disc">
              Notes to all enrolled students at once.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
