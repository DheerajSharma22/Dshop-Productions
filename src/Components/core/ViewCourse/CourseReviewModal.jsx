import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import IconBtn from "../../common/IconBtn";
import ReactStars from "react-rating-stars-component";
import { createRating } from "../../../Services/operations/viewCourseApi";
import { RxCrossCircled } from "react-icons/rx";
import toast from "react-hot-toast";

const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { courseEntireData } = useSelector((state) => state.viewCourse);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm();

  const submitHandler = async () => {
    const currentValues = getValues();
    if (!currentValues || !currentValues.courseRating) {
      toast.error("Please rate this course out of 5");
      return;
    }
    
    await createRating({
      courseId: courseEntireData?._id,
      rating: currentValues?.courseRating,
      review: currentValues?.courseExperience
    });
    setReviewModal(false);

  };

  const ratingChange = (newRating) => {
    setValue("courseRating", newRating);
  };

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="flex flex-col gap-5 w-fit h-fit bg-richblack-800 text-white rounded-md border border-richblack-500 sm:min-w-[600px] min-w-[90%]">

        {/* Header */}
        <div className="flex items-center text-white justify-between bg-richblack-600 px-3 sm:px-8 py-5 text-lg font-semibold w-full">
          <p>Add Review</p>
          <button onClick={() => setReviewModal(false)}> <RxCrossCircled /> </button>
        </div>

        <div className="px-3 sm:px-8 pb-5 flex flex-col items-center w-full">
          <div className="flex items-center gap-5">
            <img
              src={user?.image}
              alt="user pic"
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div>
              <p>{user?.firstName + " " + user?.lastName}</p>
              <p>Posting Publicly</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="mt-6 flex flex-col items-center gap-5 w-full"
          >
            <ReactStars
              count={5}
              onChange={ratingChange}
              size={24}
              activeColor="#ffc700"
            />
            <div className="flex flex-col gap-2 w-full">
              <label htmlFor="courseExperience">Add your experience</label>
              <textarea
                name="courseExperience"
                id="courseExperience"
                placeholder="Add your experience here"
                {...register("courseExperience", { required: true })}
                className="px-3 py-3 bg-richblack-700 rounded-md outline-none border-none shadow-[0_1px_1px_rgba(255,255,255,0.6)] w-full resize-none min-h-[130px]"

              ></textarea>
              {errors.courseExperience && <span className="text-pink-500">Please add your experience</span>}
            </div>

            <div className="flex items-center justify-end self-end gap-5">
              <button onClick={() => setReviewModal(false)} className="bg-richblack-600 px-6 py-2 rounded-md text-black font-semibold">Cancel</button>
              <IconBtn text="Save" customClasses="bg-yellow-50 px-6 py-2 rounded-md text-black font-semibold">
                <></>
              </IconBtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseReviewModal;
