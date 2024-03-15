import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import frame from "../../../assets/Images/frame.png";

const Template = ({ title, description1, description2, image, formType }) => {
  return (
    <div>
      <div className="w-11/12 max-w-maxContent mx-auto flex items-center justify-between min-h-[calc(100vh-5rem)] gap-x-20 gap-y-10 lg:flex-row lg:items-start flex-col-reverse py-20">
        <div className="relative mx-auto w-11/12 lg:max-w-[500px] md:mx-0">
          <h3 className="text-3xl text-white font-semibold mb-5">{title}</h3>
          <div className="flex flex-col gap-1 font-bold text-white text-lg mb-5">
            <p>{description1}</p>
            <p className="italic font-mono text-blue-50">{description2}</p>
          </div>

          {formType === "login" ? <LoginForm /> : <SignupForm />}
        </div>
        <div className="flex items-center justify-center">
          <div className="relative">
            <img src={frame} alt="frame" className="w-full" />
            <img
              src={image}
              alt={`${formType}`}
              className="absolute top-[-5%] left-[-5%] w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
