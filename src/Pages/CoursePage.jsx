// import React, { useEffect, useState } from "react";
// import RatingStars from "../Components/common/RatingStars";
// import { MdLanguage, MdTimer } from "react-icons/md";
// import BuyCourseCard from "../Components/core/CoursePage/BuyCourseCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../Services/operations/studentsFeatureApi";
// import { getFullCourseDetails } from "../Services/operations/courseApi";
// import formattedDate from "../Utils/dateFormatter";

const CoursePage = () => {
  // const [courseDetails, setCourseDetails] = useState({});
  const { courseId } = useParams();
  const {user} = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuy = async () => {
    try {
      await dispatch(buyCourse([courseId], navigate, user));
    } catch (error) {
      
    }
  }

  return (
    <div className="text-white relative p-10">
      <button className="bg-yellow-50 text-black text-lg rounded-md px-6 py-2 font-semibold" onClick={handleBuy}>
        Buy
      </button>
      {/* Header */}
      {/* <div className="bg-richblack-800 py-20">
        <div className="max-w-maxContent w-11/12 mx-auto">
          <div className="max-w-maxContentTab w-11/12 flex flex-col gap-5">
            <h3 className="text-3xl font-bold">{courseDetails?.courseName}</h3>
            <p className="text-md text-richblack-100 font-medium">
              {courseDetails?.courseDescription?.length > 200
                ? courseDetails?.courseDescription?.substr(0, 200) + "..."
                : courseDetails?.courseDescription}
            </p>
            <div className="flex gap-x-2 items-center text-lg">
              <span>{0}</span>
              <RatingStars Review_Count={0} />
              <span>{courseDetails?.ratingAndReviews?.length} Ratings</span>
            </div>
            <p className="text-lg">
              Created By{" "}
              {courseDetails?.instructor?.firstName +
                " " +
                courseDetails?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-1 text-lg">
                <MdTimer />
                <p>
                  Created at{" "}
                  <span>{formattedDate(courseDetails?.createdAt)}</span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-lg">
                <MdLanguage />
                <p>{courseDetails?.language}</p>
              </div>
            </div>
          </div>
          <div className="lg:absolute top-[50%] xl:left-[65%] left-[62%] translate-y-[-35%]">
            <BuyCourseCard course={courseDetails} />
          </div>
        </div>
      </div> */}

      {/* What You'll Learn */}

      {/* Course Content */}

      {/* Author */}

      {/* Reviews */}

      {/* More Courses */}
    </div>
  );
};

export default CoursePage;
