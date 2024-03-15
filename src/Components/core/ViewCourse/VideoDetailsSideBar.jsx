import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaAngleDown, FaChevronCircleLeft } from "react-icons/fa";
import IconBtn from "../../common/IconBtn";

const VideoDetailsSideBar = ({ setReviewModal }) => {
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);
  const [activeSection, setActiveSection] = useState("");
  const [activeLecture, setActiveLecture] = useState("");

  const { sectionId, subSectionId } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData || !courseSectionData.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.SubSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.SubSection?.[
        currentSubSectionIndex
        ];

      setActiveSection(courseSectionData?.[currentSectionIndex]?._id);
      setActiveLecture(activeSubSectionId);
    };

    setActiveFlags();
    // eslint-disable-next-line
  }, [courseSectionData, courseEntireData, location.pathname]);

  // console.log(activeSection);
  return (
    <>
      <div className="fixed bg-richblack-800 lg:h-[100%] lg:w-[300px] lg:py-8 pt-8 pb-5 flex flex-col gap-5 w-full">
        {/* For buttons and headings */}
        <div className="flex lg:flex-col justify-between gap-8 lg:border-b lg:border-richblack-600 lg:pb-5 px-5">
          {/* For buttons */}
          <div className="flex items-center justify-between w-full">
            <button onClick={() => navigate("/dashboard/enrolled-courses")} className="text-richblack-300 text-2xl">
              <FaChevronCircleLeft />
            </button>
            <div className="lg:hidden sm:flex items-center gap-3 hidden">
              <p className="text-xl font-semibold mb-1">{courseEntireData?.courseName}</p>
              <p className="text-sm text-richblack-300">
                {completedLectures?.length} / {totalNoOfLectures}
              </p>
            </div>
            <div>
              <IconBtn text="Add Review" onClick={() => setReviewModal(true)} customClasses="bg-yellow-50 text-black font-semibold px-6 py-2 rounded-md">
                <></>
              </IconBtn>
            </div>
          </div>

          {/* For heading or title */}
          <div className="lg:block hidden">
            <p className="text-xl font-semibold mb-1">{courseEntireData?.courseName}</p>
            <p className="text-sm text-richblack-300">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* For sections and subsections */}
        <div className="lg:block hidden">
          {courseSectionData?.map((section, index) => (
            <div
              onClick={() => setActiveSection(section?._id)}
              key={section?._id}
            >
              {/* Section */}
              <div className="flex items-center justify-between bg-richblack-500 px-5 py-3">
                <p>{section?.sectionName}</p>
                <button>
                  <FaAngleDown />
                </button>
              </div>

              {/* SubSection */}
              <div>
                {activeSection === section?._id && (

                  <div>
                    {section?.SubSection?.map((subsection, index) => (

                      <div
                        className={`${activeLecture === subsection?._id
                          ? "bg-yellow-50"
                          : ""
                          } flex items-center px-5 py-3 gap-3`}
                        key={subsection?._id}
                        onClick={() => {
                          setActiveLecture(subsection?._id);
                          navigate(
                            `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${subsection?._id}`
                          );
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={completedLectures?.includes(subsection?._id)}
                        />
                        <span>{subsection?.title}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default VideoDetailsSideBar;
