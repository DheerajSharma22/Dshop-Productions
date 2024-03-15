import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../Services/operations/authApi";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const {firstName, lastName, email, password, confirmPassword, accountType} = signupData;
    dispatch(signup(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate));
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
          <h1 className="text-4xl capitalize font-semibold">Verify Email</h1>
          <p className="text-2xl w-full text-richblack-100 font-semibold">
            A verfication code has been sent to you. Enter the code below
          </p>

          <form onSubmit={submitHandler}>
            <div className="w-full">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span> </span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="bg-richblack-800 outline-none border-none rounded-md text-lg py-5 text-center w-full"
                    placeholder="-"
                    style={{
                      appearance: "none",
                      boxShadow: "rgba(255, 255, 255, 0.18) 0px -1px 0px inset",
                    }}
                  />
                )}
                containerStyle={{
                  appearance: "none",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: ".3rem",
                }}
              />
            </div>

            <button
              type="submit"
              className={`text-center text-lg mt-6 w-full px-6 py-3 rounded-md font-medium capitalize bg-yellow-50 text-black`}
            >
              Verify Email
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

export default VerifyEmail;
