// import React, { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";
import { useState } from "react";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const EnrolledCourses = () => {
  const { user } = useSelector((state) => state.profile);
  const [progressCount, setProgressCount] = useState(50);
  
  return (
    <div className="px-5 lg:px-20 py-3 text-white">
      <h1 className="text-4xl font-semibold mb-10">Enrolled Courses</h1>

      <div className="border border-t-0 border-richblack-700 rounded-md">
        <Table>
          <Thead>
            <Tr className="grid grid-cols-5 bg-richblack-700 rounded-tl-md rounded-tr-md border border-richblack-700 place-items-start gap-x-10 px-5 py-3">
              <Th className="col-span-3">Courses</Th>
              <Th>Duration</Th>
              <Th>Progress</Th>
            </Tr>
          </Thead>
          <Tbody>
            {user?.courses?.length === 0 ? (
              <Tr className="flex items-center justify-center border border-richblack-800 border-t-0 px-5 py-3">
                <Td className="text-lg font-semibold text-richblack-300">
                  No Courses Found
                </Td>
              </Tr>
            ) : (
              user?.courses?.map((course, index) => (
                <Link
                  to={`/view-course/${course._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.SubSection?.[0]?._id}`}
                  key={course?._id + "" + index}
                >
                  <Tr
                    className={`grid grid-cols-5 gap-x-10 items-center px-5 py-3 myTR ${
                      index != user?.courses?.length - 1
                        ? "border-b border-richblack-700"
                        : ""
                    }`}
                  >
                    <Td className="col-span-3">
                      <div className="flex items-start gap-3 sm:flex-row flex-col">
                        <img
                          src={course?.thumbnail}
                          alt="Course Thumbnail"
                          className="w-[150px] h-[100px] object-fit rounded-md"
                        />
                        <div>
                          <p className="font-semibold text-lg mb-2">
                            {course?.courseName}
                          </p>
                          <p className="text-sm text-richblack-300">
                            {course?.courseDescription?.length > 100
                              ? course?.courseDescription?.substr(0, 100) +
                                "..."
                              : course?.courseDescription}
                          </p>
                        </div>
                      </div>
                    </Td>
                    <Td className="sm:my-0 my-5">2hr 30mins</Td>
                    <Td className="flex flex-col gap-2">
                      <label htmlFor="progress" className="sm:block hidden">
                        Progress: {progressCount}%
                      </label>
                      <ProgressBar
                        completed={progressCount}
                        maxCompleted={100}
                        height="15px"
                        width="100%"
                        customLabel={`${progressCount}%`}
                      />
                    </Td>
                  </Tr>
                </Link>
              ))
            )}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default EnrolledCourses;
