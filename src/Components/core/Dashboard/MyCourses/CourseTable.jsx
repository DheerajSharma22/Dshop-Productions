import React, { useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import formattedDate from "../../../../Utils/dateFormatter";
import { COURSE_STATUS } from "../../../../Utils/constants";
import { MdDrafts } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../Services/operations/courseApi";
import { useNavigate } from "react-router-dom";

const CourseTable = ({ courses, setCourses }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const deleteCourseHandler = async (courseId) => {
    setLoading(true);
    await deleteCourse(courseId);
    const result = await fetchInstructorCourses();
    setCourses(result);
    setLoading(false);
    setConfirmationModal(null);
  };

  return (
    <div className="mt-10">
      <Table>
        <Thead>
          <Tr className="grid grid-cols-8 place-items-start gap-5 px-8 py-2 border border-richblack-800">
            <Th className="col-span-5 font-medium">Courses</Th>
            <Th className="font-medium">Duration</Th>
            <Th className="font-medium">Price</Th>
            <Th className="font-medium">Actions</Th>
          </Tr>
        </Thead>

        <Tbody>
          {courses.length === 0 ? (
            <Tr className="flex items-center justify-center border border-richblack-800 border-t-0 p-8">
              <Td className="text-lg font-semibold text-richblack-300">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id}
                className="grid grid-cols-8 place-items-start gap-5 border border-richblack-800 p-8 border-t-0"
              >
                <Td className="flex gap-x-4 items-start col-span-5">
                  <img
                    src={course?.thumbnail}
                    alt="couse thumbnail"
                    className="h-[150px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-lg">
                      {course?.courseName}
                    </p>
                    <p className="text-sm text-richblack-300">
                      {course?.courseDescription.length > 80
                        ? course?.courseDescription.substr(0, 80) + "..."
                        : course?.courseDescription}
                    </p>
                    <p className="text-sm">
                      Created: {formattedDate(course?.createdAt)}
                    </p>
                    {course?.status === COURSE_STATUS.DRAFTED ? (
                      <p className="flex items-center gap-x-2 px-4 py-1 bg-richblack-800 text-pink-50 rounded-full w-fit text-[12px]">
                        <MdDrafts />
                        <span>{course?.status}</span>
                      </p>
                    ) : (
                      <p className="flex items-center gap-x-2 px-4 py-1 bg-richblack-800 text-yellow-50 rounded-full w-fit text-[12px]">
                        <FaCheckCircle />
                        <span>{course?.status}</span>
                      </p>
                    )}
                  </div>
                </Td>

                <Td>2hr 30min</Td>
                <Td>₹{course?.price}</Td>
                <Td className="flex items-center gap-x-5">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course?._id}`);
                    }}
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Do you want to delete this course",
                        text2:
                          "All The data related to This course will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => deleteCourseHandler(course?._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <FiTrash2 />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default CourseTable;
