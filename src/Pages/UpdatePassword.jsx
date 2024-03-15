import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaCircleCheck, FaCircleMinus } from "react-icons/fa6";
import { resetPassword } from "../Services/operations/authApi";

const UpdatePassword = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const passwordStrengthMeasures = [
    {
      exp: /\d/,
      text: "atleast one number",
    },
    {
      exp: /\W/,
      text: "one special character",
    },
    {
      exp: /[a-z]/,
      text: "one lowercase character",
    },
    {
      exp: /[A-Z]/,
      text: "one uppercase character",
    },
    {
      cond: password.length >= 8,
      text: "minimum 8 characters",
    },
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div
      className="flex items-center justify-center w-full text-semibold text-white py-10"
      style={{ minHeight: "calc(100vh - 3rem)" }}
    >
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <div className="flex flex-col gap-6 sm:max-w-[500px] w-full mx-auto max-w-[90%]">
          <h1 className="text-4xl capitalize font-semibold">
            Choose new Password
          </h1>
          <p className="text-2xl w-full text-richblack-100 font-semibold">
            Almost done. Enter your new password and youre all set.
          </p>

          <form onSubmit={submitHandler}>
            <div className="flex flex-col gap-2 text-white text-lg relative w-full mb-6">
              <label htmlFor="password">
                New Password <sup className="text-pink-500">*</sup>
              </label>
              <div className="w-full relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-4 bg-richblack-800 rounded-md outline-none w-full"
                  autoComplete="true"
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

            <div className="flex flex-col gap-2 text-white text-lg relative w-full mb-6">
              <label htmlFor="cPassword">
                Confirm Password <sup className="text-pink-500">*</sup>
              </label>
              <div className="w-full relative">
                <input
                  type={`${showCPassword ? "text" : "password"}`}
                  name="cPassword"
                  id="cPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="p-4 bg-richblack-800 rounded-md outline-none w-full"
                  autoComplete="true"
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

            <div className="w-full flex flex-wrap gap-5 items-center justify-start mb-5">
              {passwordStrengthMeasures.map((measure, index) => (
                <div
                  className={`flex items-center gap-2 text-lg ${
                    measure.exp
                      ? password.match(measure.exp)
                        ? "text-caribbeangreen-300"
                        : "text-pink-300"
                      : measure.cond
                      ? "text-caribbeangreen-300"
                      : "text-pink-300"
                  } sm:w-[48%] `}
                  key={index}
                >
                  {measure.exp ? (
                    password.match(measure.exp) ? (
                      <FaCircleCheck />
                    ) : (
                      <FaCircleMinus />
                    )
                  ) : measure.cond ? (
                    <FaCircleCheck />
                  ) : (
                    <FaCircleMinus />
                  )}
                  {measure.text}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className={`text-center text-lg w-full px-6 py-3 rounded-md font-medium capitalize bg-yellow-50 text-black`}
            >
              Reset password
            </button>
          </form>
          <Link to="/login">
            <div className="flex items-center gap-2 cursor-pointer">
              <FaArrowLeft />
              Back to login
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
