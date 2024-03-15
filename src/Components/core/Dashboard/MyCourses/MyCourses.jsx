import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../../Services/operations/courseApi";
import IconBtn from "../../../common/IconBtn";
import { FaPlus } from "react-icons/fa";
import CourseTable from "./CourseTable";
// import { setEditCourse } from "../../../../Redux/Slices/courseSlice";
// import { useDispatch } from "react-redux";

const MyCourses = () => {
  const navigate = useNavigate();
//   const dispatch = useDispatch();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const results = await fetchInstructorCourses();
      if (results) {
        setCourses(results);
      }
    };

    fetchCourses();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="px-5 lg:px-14 py-3 text-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">My Courses</h1>
        <IconBtn
          text={"Add Course"}
          customClasses="bg-yellow-50 text-black px-6 py-3 rounded-md gap-3 font-semibold"
          onClick={() => {
            navigate("/dashboard/add-course")
          }}
        >
          <FaPlus />
        </IconBtn>
      </div>

      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};

export default MyCourses;
