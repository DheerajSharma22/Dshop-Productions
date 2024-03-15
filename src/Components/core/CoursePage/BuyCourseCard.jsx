import React from "react";
import IconBtn from "../../common/IconBtn";
import { FaShare } from "react-icons/fa";

const BuyCourseCard = ({ course }) => {
  return (
    <div>
      <div className="bg-richblack-700 p-5 rounded-md flex flex-col gap-3">
        <div>
          <img
            src={course?.thumbnail}
            alt={"course thumbnail"}
            className="h-[500px] lg:h-[220px] rounded-md w-full"
          />
        </div>

        <p className="text-2xl font-bold">Rs. {course?.price}</p>

        <div className="flex flex-col gap-3">
          <button className="bg-yellow-50 text-black rounded-md py-2 font-semibold">
            Buy Now
          </button>
          <button className="bg-richblack-900 text-white rounded-md py-2 font-semibold">
            Add To Cart
          </button>
        </div>

        <p className="text-center text-sm">30-Day Money-Back Guarantee</p>

        <IconBtn
          text={"share"}
          customClasses={"flex-row-reverse text-yellow-50 self-center"}
        >
          <FaShare />
        </IconBtn>
      </div>
    </div>
  );
};

export default BuyCourseCard;
