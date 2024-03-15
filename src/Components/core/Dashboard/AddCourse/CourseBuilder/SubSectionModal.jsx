import React, { useEffect } from "react";
import UploadInput from "../CourseInformation/UploadInput";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createSubSection, editSubSection } from '../../../../../Services/operations/courseApi';
import toast from "react-hot-toast";
import { setCourse } from "../../../../../Redux/Slices/courseSlice";

const SubSectionModal = ({ modalData, setModalData, add = false, edit = false, view = false }) => {
  const { register, setValue, handleSubmit, formState: { errors }, getValues } = useForm();
  const { course } = useSelector(state => state.course);

  const dispatch = useDispatch();

  const isFormUpdated = () => {
    const currentValues = getValues();
    if (edit) {
      if (currentValues.lectureTitle !== modalData?.title || currentValues.lectureDescription !== modalData?.description || currentValues.lectureVideo !== modalData?.videoUrl) return true;

      return false;
    }
  }

  const submitHandler = async () => {
    const currentValue = getValues();
    
    const formData = new FormData();
    formData.append("title", currentValue.lectureTitle);
    formData.append("description", currentValue.lectureDescription);
    formData.append("video", currentValue.lectureVideo);

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made");
        return;
      }
      formData.append("sectionId", modalData?.sectionId);
      formData.append("subSectionId", modalData?._id);

      const updatedSection = await dispatch(editSubSection(formData));
      const updatedCourseContent = course.courseContent?.map((section) => section?._id === updatedSection?._id ? updatedSection : section);
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    } else {
      formData.append("sectionId", modalData);

      const updatedSection = await dispatch(createSubSection(formData));
      
      const updatedCourseContent = course.courseContent?.map((section) => section?._id === updatedSection?._id ? updatedSection : section);
      const updatedCourse = {...course, courseContent : updatedCourseContent};
      dispatch(setCourse(updatedCourse));
    }

    setModalData(null);
  }

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData?.title);
      setValue("lectureDescription", modalData?.description);
      setValue("lectureVideo", modalData?.videoUrl);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm py-10">
      <div className="rounded-md bg-richblack-800 sm:w-[500px] w-[90%] mx-auto">
        <div className="p-5 rounded-tl-md rounded-tr-md bg-richblack-600 flex items-center justify-between">
          <span className="text-lg font-semibold">{add ? "Adding" : view ? "Viewing" : "Editing"} Lecture</span>
          <span className="text-2xl cursor-pointer" onClick={() => setModalData(null)}>&times;</span>
        </div>
        <form className="p-5 flex flex-col gap-5" onSubmit={handleSubmit(submitHandler)}>
          {/****************** Lecture Video *****************/}

          <UploadInput
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/****************** Lecture Title *****************/}
          <div className="flex flex-col gap-2">
            <label htmlFor="lectureTitle" className="text-md">
              Lecture Title <span className="text-pink-500">*</span>
            </label>
            <input
              className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
              type="text"
              id="lectureTitle"
              name="lectureTitle"
              placeholder="Enter Course Title"
              disabled={view}
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && (
              <span className="text-pink-300">Lecture title is required</span>
            )}
          </div>

          {/****************** Lecture Description *****************/}
          <div className="flex flex-col gap-2">
            <label htmlFor="lectureDescription" className="text-md">
              Lecture Description <span className="text-pink-500">*</span>
            </label>
            <textarea
              className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full resize-none min-h-[140px]"
              type="text"
              id="lectureDescription"
              name="lectureDescription"
              disabled={view}
              placeholder="Enter Course Description"
              {...register("lectureDescription", { required: true })}
            />
            {errors.lectureDescription && (
              <span className="text-pink-300">Lecture Description is required</span>
            )}
          </div>

          {!view &&
            <button className="px-6 py-3 bg-yellow-50 text-black font-semibold self-end rounded-md" type="submit">{add ? "Save" : "Save Changes"}</button>
          }
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
