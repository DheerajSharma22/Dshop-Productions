import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { IoEyeOffOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../Services/operations/authApi";
import { setSignupData } from "../../../Redux/Slices/authSlice";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Student"
  });

  const changeHandler = (e) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setSignupData(formData));
    dispatch(sendOtp(formData.email, navigate));
  }

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={submitHandler}>
        {/* Role */}
        <div className="flex rounded-full bg-richblack-700 w-[60%] p-1 mb-5">
          <span
            className={`w-full text-center rounded-full py-2 cursor-pointer font-semibold text-lg ${formData.accountType === "Student"
              ? "bg-richblack-900 text-white"
              : "text-richblack-300"
              }`}
            onClick={() => setFormData(prev => { return { ...prev, accountType: "Student" } })}
          >
            Student
          </span>
          <span
            className={`w-full text-center rounded-full py-2 cursor-pointer font-semibold text-lg ${formData.accountType === "Instructor"
              ? "bg-richblack-900 text-white"
              : "text-richblack-300"
              }`}
            onClick={() => setFormData(prev => { return { ...prev, accountType: "Instructor" } })}
          >
            Instructor
          </span>
        </div>

        {/* Name */}
        <div className="flex items-center sm:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-2 text-white text-lg w-full">
            <label htmlFor="firstName">
              First Name <sup className="text-pink-500">*</sup>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="John"
              className="p-4 bg-richblack-700 rounded-md outline-none w-full"
              value={formData.firstName}
              onChange={changeHandler}
            />
          </div>

          <div className="flex flex-col gap-2 text-white text-lg w-full">
            <label htmlFor="lastName">
              Last Name <sup className="text-pink-500">*</sup>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Doe"
              className="p-4 bg-richblack-700 rounded-md w-full outline-none "
              value={formData.lastName}
              onChange={changeHandler}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 text-white text-lg w-full">
          <label htmlFor="email">
            Email Address <sup className="text-pink-500">*</sup>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            className="p-4 bg-richblack-700 rounded-md outline-none"
            value={formData.email}
            onChange={changeHandler}
          />
        </div>

        {/* Password */}
        <div className="flex items-center sm:flex-row flex-col gap-5 w-full">
          <div className="flex flex-col gap-2 text-white text-lg relative w-full">
            <label htmlFor="password">
              Password <sup className="text-pink-500">*</sup>
            </label>
            <div className="w-full relative">
              <input
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                name="password"
                placeholder="Enter password"
                className="p-4 bg-richblack-700 rounded-md outline-none w-full"
                value={formData.password}
                onChange={changeHandler}
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-[50%] translate-y-[-50%] right-[5%] text-xl cursor-pointer"
              >
                {!showPassword ? (
                  <MdOutlineRemoveRedEye />
                ) : (
                  <IoEyeOffOutline />
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-white text-lg relative w-full">
            <label htmlFor="cPassword">
              Confirm Password <sup className="text-pink-500">*</sup>
            </label>
            <div className="w-full relative">
              <input
                type={`${showCPassword ? "text" : "password"}`}
                name="confirmPassword"
                id="cPassword"
                placeholder="Confirm password"
                className="p-4 bg-richblack-700 rounded-md outline-none w-full"
                value={formData.confirmPassword}
                onChange={changeHandler}
              />

              <span
                onClick={() => setShowCPassword((prev) => !prev)}
                className="absolute top-[50%] translate-y-[-50%] right-[5%] text-xl cursor-pointer"
              >
                {!showCPassword ? (
                  <MdOutlineRemoveRedEye />
                ) : (
                  <IoEyeOffOutline />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Button */}
        <button className="bg-yellow-50 rounded-md py-3 font-semibold mt-5">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
