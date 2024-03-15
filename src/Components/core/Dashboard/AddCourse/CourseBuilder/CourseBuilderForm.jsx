import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { FaArrowAltCircleRight, FaPlusCircle } from "react-icons/fa";
import DisplaySections from "./DisplaySections";
import { useDispatch, useSelector } from "react-redux";
import { createNewSection, editSection } from "../../../../../Services/operations/courseApi";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../Redux/Slices/courseSlice";
import toast from "react-hot-toast";

const CourseBuilderForm = () => {
  const { course } = useSelector((state) => state.course);
  const [editSectionName, setEditSectionName] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async () => {
    try {
      if (editSectionName) {
        const updatedSection = await dispatch(
          editSection(
            getValues().sectionName,
            editSectionName,
            course?._id
          )
        );
        const updatedCourseContent = course.courseContent.map((section, index) => section._id === editSectionName ? updatedSection : section)
        
        const updatedCourse = {...course, courseContent: updatedCourseContent};
        dispatch(setCourse(updatedCourse));
        setEditSectionName(false);
      }
      else {
        await dispatch(createNewSection(getValues().sectionName, course?._id));
      }
      setValue("sectionName", "");
    } catch (error) {
      console.log(error);
    }
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };
  const goToNext = () => {
    if (course.courseContent && course.courseContent.length === 0) {
      toast.error("Please add atleast one section");
      return;
    }
    let courseSubsections = course.courseContent.filter(
      (section) => section.SubSection.length > 0
    );
    if (courseSubsections.length <= 0) {
      toast.error("Please add atleast one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  };

  return (
    <div className="p-8 bg-richblack-800 mt-10 rounded-md">
      <h3 className="text-2xl font-semibold">Course Builder</h3>

      {/* Create Section Div */}
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="border border-richblack-700 rounded-md p-5 mt-10 flex flex-col gap-5 items-start"
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="sectionName" className="text-md">
            Section Name <span className="text-pink-500">*</span>
          </label>
          <input
            className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
            type="text"
            id="sectionName"
            name="sectionName"
            placeholder="Enter Section Name"
            {...register("sectionName", { required: true })}
          />
          {errors.sectionName && (
            <span className="text-pink-300">Section Name is required</span>
          )}
        </div>

        <div className="flex items-end gap-3">
          <IconBtn
            text={editSectionName ? "Edit Section" : "Create Section"}
            type={"submit"}
            customClasses={
              "px-6 py-2 rounded-md outline outline-yellow-50 text-yellow-50 border-none gap-2"
            }
          >
            <FaPlusCircle />
          </IconBtn>
          {editSectionName && (
            <button
              className="text-richblack-300 underline text-sm"
              onClick={() => {
                setEditSectionName(false);
                setValue("sectionName", "");
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {course?.courseContent.length > 0 && <DisplaySections setValue={setValue} setEditSectionName={setEditSectionName} />}

      <div className="flex items-center gap-3 mt-5 justify-end">
        <button
          className={
            "bg-richblack-300 py-2 px-6 rounded-md font-semibold text-black"
          }
          onClick={goBack}
        >
          Back
        </button>
        <IconBtn
          onClick={goToNext}
          text={"Next"}
          customClasses={
            "bg-yellow-50 py-2 px-6 rounded-md font-semibold text-black"
          }
        >
          <FaArrowAltCircleRight />
        </IconBtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
