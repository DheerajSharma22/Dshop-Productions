import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../../../Services/operations/categoryApi";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import TagsInput from "./TagsInput";
import UploadInput from "./UploadInput";
import RequirementField from "./RequirementField";
import IconBtn from "../../../../common/IconBtn";
import { FaChevronRight } from "react-icons/fa";
import toast from "react-hot-toast";
import { createNewCourse, editCourseHandler } from "../../../../../Services/operations/courseApi";
import { setStep } from "../../../../../Redux/Slices/courseSlice";

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCourseLanguage, setSelectedCourseLanguage] = useState(null);

  useEffect(() => {

    const getCategories = async () => {
      setLoading(true);
      try {
        const res = await getAllCategories();
        setCourseCategories(res);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    if (editCourse) {
      setLoading(true);
      setValue("courseTitle", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("courseCategory", course.category?._id);
      setValue("coursePrice", course.price);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseTags", course.tags);
      setValue("courseThumbnail", course?.thumbnail);
      setValue("courseRequirements", course.instructions);
      setSelectedCategory(course?.category?._id)
      setSelectedCourseLanguage(course?.language);
      setLoading(false);
    }

    getCategories();

    // eslint-disable-next-line
  }, []);

  const isFormUpdated = () => {
    const currentValue = getValues();
    return (
      currentValue.courseTitle !== course.courseName ||
      currentValue.courseDescription !== course.courseDescription ||
      currentValue.courseCategory !== course.category ||
      currentValue.coursePrice !== course.price ||
      currentValue.courseTags.toString() !== course.tags.toString() ||
      currentValue.courseBenefits.toString() !==
      course.whatYouWillLearn.toString() ||
      currentValue.courseRequirements.toString() !==
      course.instructions.toString()
    );
  };

  const submitHandler = async (e) => {

    const currentValue = getValues();
    const formData = new FormData();


    if (editCourse) {
      if (isFormUpdated()) {
        formData.append("courseId", course?._id);
        if (currentValue.courseTitle !== course.courseName)
          formData.append("courseName", currentValue.courseTitle);

        if (currentValue.courseDescription !== course.courseDescription)
          formData.append("courseDescription", currentValue.courseDescription);

        if (currentValue.courseCategory !== course.category?._id)
          formData.append("category", currentValue.courseCategory);

        if (currentValue.coursePrice !== course.price)
          formData.append("price", currentValue.coursePrice);

        if (currentValue.courseTags.toString() !== course.tags.toString())
          formData.append("tags", currentValue.courseTags);

        if (
          currentValue.courseBenefits.toString() !==
          course.whatYouWillLearn.toString()
        )
          formData.append("whatYouWillLearn", currentValue.courseBenefits);

        if (currentValue.courseLanguage !== course.language)
          formData.append("whatYouWillLearn", currentValue.courseLanguage);

        if (
          currentValue.courseRequirements.toString() !==
          course.instructions.toString()
        )
          formData.append(
            "courseRequirements",
            currentValue.courseRequirements
          );

        try {
          await dispatch(editCourseHandler(formData));
          dispatch(setStep(2));

        } catch (error) {
          console.log("Error in course edit or create", error);
        }
      } else {
        toast.error("No changes are made");
      }
      return;
    }

    console.log(currentValue.courseThumbnail);

    formData.append("courseName", currentValue.courseTitle);
    formData.append("courseDescription", currentValue.courseDescription);
    formData.append("category", currentValue.courseCategory);
    formData.append("price", currentValue.coursePrice);
    formData.append("tags", currentValue.courseTags);
    formData.append("whatYouWillLearn", currentValue.courseBenefits);
    formData.append("instructions", currentValue.courseRequirements);
    formData.append("status", "DRAFTED");
    formData.append("language", currentValue.courseLanguage);
    formData.append("thumbnail", currentValue.courseThumbnail);

    try {
      await dispatch(createNewCourse(formData));
    } catch (error) {
      console.log("Error in course edit or create", error);
    }
  };

  if (loading) return <div className="custom-loader"></div>

  return (

    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mt-10 bg-richblack-800 p-6 rounded-md border border-richblack-600 flex flex-col gap-7"
    >
      {/****************** Course Title *****************/}
      <div className="flex flex-col gap-2">
        <label htmlFor="courseTitle" className="text-md">
          Course Title <span className="text-pink-500">*</span>
        </label>
        <input
          className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
          type="text"
          id="courseTitle"
          name="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
        />
        {errors.courseTitle && (
          <span className="text-pink-300">Course title is required</span>
        )}
      </div>

      {/****************** Course Description *****************/}
      <div className="flex flex-col gap-2">
        <label htmlFor="courseDescription" className="text-md">
          Course Description <span className="text-pink-500">*</span>
        </label>
        <textarea
          className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full resize-none min-h-[140px]"
          type="text"
          id="courseDescription"
          name="courseDescription"
          placeholder="Enter Course Description"
          {...register("courseDescription", { required: true })}
        />
        {errors.courseDescription && (
          <span className="text-pink-300">Course Description is required</span>
        )}
      </div>

      {/****************** Course Price *****************/}
      <div className="flex flex-col gap-2 relative">
        <label htmlFor="coursePrice" className="text-md">
          Course Price <span className="text-pink-500">*</span>
        </label>
        <input
          className="pl-12 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
          type="text"
          id="coursePrice"
          name="coursePrice"
          placeholder="Enter Course Title"
          {...register("coursePrice", { required: true })}
        />
        <HiOutlineCurrencyRupee className="absolute top-[2.8rem] left-[1rem] text-richblack-300 text-2xl font-bold" />
        {errors.coursePrice && (
          <span className="text-pink-300">Course Price is required</span>
        )}
      </div>

      {/****************** Course Category *****************/}
      <div className="flex flex-col gap-2">
        <label htmlFor="courseCategory" className="text-md">
          Course Category <span className="text-pink-500">*</span>
        </label>
        <select
          className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
          id="courseCategory"
          name="courseCategory"
          {...register("courseCategory", { required: true })}
          defaultValue={selectedCategory}
        >

          <option value="" disabled>Choose a Category</option>
          {loading ? (
            <option className="custom-loader"></option>
          ) : (
            courseCategories.map((cat) => (
              <option value={cat?._id.toString()} key={cat?._id}>
                {cat?.name}
              </option>
            ))
          )}
        </select>

        {errors.courseCategory && (
          <span className="text-pink-300">Course category is required</span>
        )}
      </div>

      {/****************** Course Language *****************/}
      <div className="flex flex-col gap-2">
        <label htmlFor="courseLanguage" className="text-md">
          Course Language <span className="text-pink-500">*</span>
        </label>
        <select
          className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full"
          type="text"
          id="courseLanguage"
          name="courseLanguage"
          {...register("courseLanguage", { required: true })}
          defaultValue={selectedCourseLanguage}
        >
          <option value="" disabled>Choose a Language</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>

        {errors.courseLanguage && (
          <span className="text-pink-300">Course Language is required</span>
        )}
      </div>

      {/***************** Tags Component *******************/}
      <TagsInput
        name="courseTags"
        id="courseTags"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      {/******************* Image Upload *************/}
      <UploadInput
        name="courseThumbnail"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/******************** Course Benefits *********************/}
      <div className="flex flex-col gap-2">
        <label htmlFor="courseBenefits" className="text-md">
          Benefits Of The Course <span className="text-pink-500">*</span>
        </label>
        <textarea
          className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full resize-none min-h-[140px]"
          type="text"
          id="courseBenefits"
          name="courseBenefits"
          placeholder="Enter Course Benefits"
          {...register("courseBenefits", { required: true })}
        />
        {errors.courseBenefits && (
          <span className="text-pink-300">Course Benefits is required</span>
        )}
      </div>

      {/******************** Course Requirements/Instructions *********************/}
      <RequirementField
        name={"courseRequirements"}
        id={"courseRequirements"}
        errors={errors}
        register={register}
        getValues={getValues}
        setValue={setValue}
      />

      {/**************** Next Btn *******************/}
      <div className="flex items-center gap-3 self-end">
        {editCourse && (
          <button className="text-lg bg-richblack-700 px-6 py-3 rounded-md text-white font-semibold" onClick={() => dispatch(setStep(2))}>
            Continue Without Saving
          </button>
        )}
        <IconBtn
          text={!editCourse ? "Next" : "Save Changes"}
          customClasses="text-lg bg-yellow-50 px-6 py-3 rounded-md text-black font-semibold"
          type={"submit"}
        >
          <FaChevronRight className="text-sm" />
        </IconBtn>
      </div>
    </form>
  );
};

export default CourseInformationForm;
