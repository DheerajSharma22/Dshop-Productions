import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "./PublishCourse/PublishCourse";

const steps = [
  { id: 1, name: "Course Information" },
  { id: 2, name: "Course Builder" },
  { id: 3, name: "Publish" },
];

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepsRef = useRef([]);

  const calculateProgress = () => ((step - 1) / (steps.length - 1)) * 100;


  useEffect(() => {
    setMargins({
      marginLeft: stepsRef?.current[0].offsetWidth / 2,
      marginRight: stepsRef?.current[steps.length - 1].offsetWidth / 2,
    });
  }, [stepsRef]);

  return (
    <>
      <div className="relative">
        <div className="w-full flex justify-between items-center">
          {steps.map((item, index) => {
            return (
              <div
                className="flex flex-col items-center gap-2 z-10"
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
              >
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${item.id === step
                    ? "bg-yellow-900 text-yellow-50 border border-yellow-50"
                    : "bg-richblack-800 text-richblack-300 border border-richblack-300"
                    }
                  ${item.id < step ? "bg-yellow-50 border-none" : ""}
                  `}
                >
                  {step > item.id ? (
                    <FaCheck className="text-black" />
                  ) : (
                    item.id
                  )}
                </span>
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>

        <div
          className="bg-richblack-300 absolute top-[25%] left-[0%] h-[2px]"
          style={{
            width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
            marginLeft: margins.marginLeft,
            marginRight: margins.marginRight,
          }}
        >
          <div
            className="bg-yellow-50 h-[100%] transition-width duration-300 ease-in"
            style={{ width: `${calculateProgress() + 1}%` }}
          ></div>
        </div>
      </div>
      {step === 1 && <CourseInformationForm />}
      {step === 2 && <CourseBuilderForm />}
      {step === 3 && <PublishCourse />}
    </>
  );
};

export default RenderSteps;
