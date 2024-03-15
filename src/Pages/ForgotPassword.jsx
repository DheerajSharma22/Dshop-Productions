import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../Services/operations/authApi";
import HighlightText from '../Components/core/Homepage/HighlightText';

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    console.log("Submit");
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };

  return (
    <div
      className="flex items-center justify-center w-full text-semibold text-white"
      style={{ height: "calc(100vh - 3rem)" }}
    >
      {loading ? (
        <div className="custom-loader"></div>
      ) : (
        <div className="flex flex-col gap-5 sm:max-w-[500px] w-full mx-auto max-w-[90%]">
          <h1 className="text-4xl capitalize font-semibold">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>
          <p className="text-xl w-full text-richblack-100 font-semibold">
            {!emailSent
              ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to`}
              {emailSent && <HighlightText text={email} />}
          </p>
          <form onSubmit={submitHandler}>
            {!emailSent ? (
              <div className="flex flex-col gap-2 mb-8">
                <label htmlFor="email" className="text-lg">
                  Email Adress <sup className="text-pink-500">*</sup>
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  required
                  name="email"
                  id="email"
                  autoComplete="true"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-4 bg-richblack-700 rounded-md outline-none w-full text-lg"
                />
              </div>
            ) : (
              <></>
            )}
            <button
              type="submit"
              className={`text-center text-lg px-6 py-3 rounded-md font-medium capitalize bg-yellow-50 text-black`}
            >
              {!emailSent ? "Reset password" : "Resend email"}
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

export default ForgotPassword;
