import React from "react";
import Button from "../Components/core/Homepage/Button";
import { FaArrowLeft } from "react-icons/fa";

const Error = ({ message }) => {
  return (
    <div className="flex flex-col text-center items-center justify-center w-full text-3xl text-semibold text-white" style={{ height: "calc(100vh - 3rem)" }}>
      <p>{message}</p>
      <div className="flex items-center gap-5 mt-5 sm:flex-row flex-col">
        <Button active={true} linkTo={"/"}>
          <div className="flex items-center gap-2 font-medium">
            <FaArrowLeft />
            Back To Home
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Error;
