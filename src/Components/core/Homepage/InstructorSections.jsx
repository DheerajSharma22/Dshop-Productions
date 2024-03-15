import React from "react";
import InstructorImage from "../../../assets/Images/Instructor.png";
import HighlightText from "./HighlightText";
import Button from "./Button";
import { FaArrowRight } from "react-icons/fa";

const InstructorSections = () => {
  return (
    <div className="flex gap-20 lg:flex-row flex-col items-center justify-center w-full py-24">
      <div className="lg:w-[50%]">
        <img
          src={InstructorImage}
          alt="Instructor"
          className="shadow-[-20px_-20px_white]"
        />
      </div>
      <div className="lg:w-[50%] flex flex-col items-start">
        <p className="text-4xl font-bold lg:w-[50%]">
          Become an <HighlightText text={"Instructor"} />
        </p>
        <p className="text-richblack-300 text-lg font-medium lg:w-[90%] my-14">
          Instructors from around the world teach millions of students on
          StudyNotion. We provide the tools and skills to teach what you love.
        </p>
        <Button active={true} linkTo={"/signup"}>
          <div className="flex items-center gap-3 text-lg">
            Start Teaching Today <FaArrowRight />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default InstructorSections;
