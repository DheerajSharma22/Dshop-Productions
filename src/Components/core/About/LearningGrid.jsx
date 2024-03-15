import React from "react";
import Button from "../Homepage/Button";
import HighlightText from "../Homepage/HighlightText";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
    <div>
      <div className="w-11/12 max-w-maxContent mx-auto py-20">
        <div className="grid grid-cols-1 lg:grid-cols-4">
          {LearningGridArray.map((item, index) => (
            <div
              key={index}
              className={`${index === 0 && "lg:col-span-2"} ${index & 1
                  ? "bg-richblack-700"
                  : index !== 0 && "bg-richblack-800"
                }
              ${item.order === 3 ? "lg:col-start-2" : ""}`}
            >
              {index === 0 ? (
                <div className="w-full flex flex-col items-start gap-4 lg:mb-0 mb-10">
                  <h2 className="text-white text-3xl lg:text-4xl font-bold lg:w-[90%]">
                    {item.heading} <HighlightText text={item.highlightText} />
                  </h2>

                  <p className="text-richblack-300 lg:text-lg">
                    {item.description}
                  </p>
                  <Button active={true} linkTo={item.BtnLink}>
                    {item.BtnText}
                  </Button>
                </div>
              ) : (
                <div className="p-8 flex flex-col text-richblack-5 gap-8 lg:min-h-[300px]">
                  <h2 className="text-xl">{item.heading}</h2>
                  <p className="text-richblack-300 font-semibold">
                    {item.description}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningGrid;
