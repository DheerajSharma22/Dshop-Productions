import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../Utils/avgRating";
import RatingStars from '../../common/RatingStars';


const Course_Card = ({ course, height }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews);
    setAvgReviewCount(count);
  }, [course]);
  
  return (
    <div className="w-auto">
      <Link to={`/courses/${course?._id}`}>
        <div className="flex flex-col gap-3">
          <div>
            <img
              src={course?.thumbnail}
              alt="Course Thumnail"
              className={`w-full rounded-xl object-fit h-[${height}]`}
            />
          </div>
          <div className="flex flex-col gap-2 px-2">
            <p className="text-lg font-semibold">{course?.courseName}</p>
            <p className="text-sm text-richblack-300">
              {course?.instructor?.firstName +
                " " +
                course?.instructor?.lastName}
            </p>
            <div className="flex gap-x-2 items-center">
              <span>{avgReviewCount || 0}</span>
              <RatingStars Review_Count={avgReviewCount}/>
              <span>{course?.ratingAndReviews?.length} Ratings</span>
            </div>
            <p>Rs {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Course_Card;
