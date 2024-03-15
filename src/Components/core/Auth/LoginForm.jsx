import React, { useState } from "react";
import { IoEyeOffOutline } from "react-icons/io5";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../Services/operations/authApi";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="w-full">
      <form className="w-full flex flex-col gap-5" onSubmit={submitHandler}>
        <div className="flex flex-col gap-2 text-white text-lg">
          <label htmlFor="email">
            Email Address <sup className="text-pink-500">*</sup>
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="p-4 bg-richblack-700 rounded-md outline-none "
            autoComplete="username"
          />
        </div>
        <div className="flex flex-col gap-2 text-white text-lg relative">
          <label htmlFor="password">
            Password <sup className="text-pink-500">*</sup>
          </label>
          <div className="w-full relative">
            <input
              type={`${showPassword ? "text" : "password"}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="p-4 bg-richblack-700 rounded-md outline-none w-full"
              autoComplete="current-password"
            />

            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-[50%] translate-y-[-50%] right-[5%] text-xl cursor-pointer"
            >
              {!showPassword ? <MdOutlineRemoveRedEye /> : <IoEyeOffOutline />}
            </span>
          </div>
          <Link
            to="/forgot-password"
            className="absolute top-[100%] right-[2%] mt-2 text-sm text-blue-100 font-medium cursor-pointer"
          >
            Forget Password
          </Link>
        </div>

        <button
          className="bg-yellow-50 rounded-md py-3 font-semibold mt-10"
          type="submit"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
