import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { getFullCourseDetails } from "../Services/operations/courseApi";
import {
  setCompletedLectures,
  setCourseEntireData,
  setCourseSectionData,
  setTotalNoOfLectures,
} from "../Redux/Slices/viewCourseSlice";
import VideoDetailsSideBar from "../Components/core/ViewCourse/VideoDetailsSideBar";
import CourseReviewModal from "../Components/core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificationDetails = async () => {
      setLoading(true);
      const courseData = await getFullCourseDetails(courseId);
      dispatch(setCourseSectionData(courseData.courseContent));
      dispatch(setCourseEntireData(courseData));
      dispatch(setCompletedLectures(courseData.completedVideos || []));

      // Finding total lectures
      let totalLectures = courseData?.courseContent?.reduce(
        (acc, curr) => (acc += curr.SubSection.length),
        0
      );
      setLoading(false);
      dispatch(setTotalNoOfLectures(totalLectures));
    };

    setCourseSpecificationDetails();
    // eslint-disable-next-line
  }, []);

  if (loading) return <div className="custom-loader"></div>

  return (
    <>
      <div className="text-white">
        <VideoDetailsSideBar setReviewModal={setReviewModal} />
        <div>
          <Outlet />
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
