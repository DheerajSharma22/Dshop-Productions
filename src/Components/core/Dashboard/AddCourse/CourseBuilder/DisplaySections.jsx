import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { RxDropdownMenu } from "react-icons/rx";
import { IoMdArrowDropdownCircle } from "react-icons/io";
// import { FaPlus } from "react-icons/fa";
// import AddLectureModal from "./AddLectureModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteSection, deleteSubSection } from "../../../../../Services/operations/courseApi";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { FaPlus, FaVideo } from "react-icons/fa";
import SubSectionModal from "./SubSectionModal";
import { setCourse } from "../../../../../Redux/Slices/courseSlice";

const DisplaySections = ({ setEditSectionName, setValue }) => {
  const { course } = useSelector(state => state.course);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);

  const dispatch = useDispatch();

  const deleteSectionHandler = async (sectionId) => {
    try {
      await dispatch(deleteSection(sectionId, course?._id));
    } catch (error) {
      console.log(error);
    }
    setConfirmationModal(null);
  }

  const deleteSubSectionHandler = async (subSectionId, sectionId) => {
    try {
      const updatedSection = await dispatch(deleteSubSection(subSectionId, sectionId));
      const updatedCourseContent = course.courseContent?.map((section) => section?._id === updatedSection?._id ? updatedSection : section);
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    } catch (error) {
      console.log(error);
    }

    setConfirmationModal(null);
  }

  return (
    <div className="bg-richblack-700 p-8 mt-8 rounded-md flex flex-col gap-5">
      {course && course.courseContent?.map((section, index) => (
        <details key={index} open={false}>
          {/* Section */}
          <summary className="flex items-center justify-between border-b-2 pb-3 border-richblack-500 cursor-pointer">

            <div className="flex items-center gap-2">
              <RxDropdownMenu className="text-2xl cursor-pointer" />
              <span className="text-lg capitalize">{section.sectionName}</span>
            </div>
            <div className="flex items-center gap-2 text-richblack-300 text-xl">
              <button className="cursor-pointer" onClick={() => {
                setValue("sectionName", section?.sectionName);
                setEditSectionName(section?._id);
              }}>
                <FiEdit2 />
              </button>
              <button className="cursor-pointer" onClick={() => setConfirmationModal({
                text1: "Delete this section",
                text2: "All the lectures in this section will be deleted",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => deleteSectionHandler(section?._id),
                btn2Handler: () => setConfirmationModal(null),
              })}>
                <FiTrash2 />
              </button>
              <span>|</span>
              <IoMdArrowDropdownCircle className="cursor-pointer" />
            </div>
          </summary>

          {/* Sub Section */}
          <div className="px-6 py-3">
            {section?.SubSection?.map((subSection, index) => {
              return (
                <div key={index} className="mb-3" onClick={() => setViewSubSection(subSection)}>
                  <div className="flex items-center justify-between border-b-2 pb-3 border-richblack-500">
                    <div className="flex items-center gap-5 cursor-pointer">
                      <FaVideo className="text-2xl cursor-pointer" />
                      <span className="text-lg capitalize">{subSection.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-richblack-300 text-xl" onClick={(e) => e.stopPropagation()}>
                      <button className="cursor-pointer" onClick={() => setEditSubSection({ ...subSection, sectionId: section._id })}>
                        <FiEdit2 />
                      </button>
                      <button className="cursor-pointer" onClick={() => setConfirmationModal({
                        text1: "Delete this sub section",
                        text2: "Current lecture in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => deleteSubSectionHandler(subSection?._id, section?._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })}>
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <button className="flex items-center gap-2 text-yellow-50" onClick={() => setAddSubSection(section?._id)}>
              <FaPlus /> Add Lecture
            </button>
          </div>
        </details>
      ))}

      {
        addSubSection ? <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} /> :
          viewSubSection ? <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} /> :
            editSubSection ? <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} /> :
              <div></div>
      }

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default DisplaySections;
