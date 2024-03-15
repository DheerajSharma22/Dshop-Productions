import React from "react";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="flex flex-col gap-5 w-fit h-fit px-8 py-6 bg-richblack-800 text-white rounded-md border border-richblack-500">
        <p className="font-bold text-2xl">{modalData?.text1}</p>
        <p className="">{modalData?.text2}</p>

        <div className="flex items-center gap-3">
          <IconBtn
            onClick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
            customClasses="bg-yellow-50 px-6 py-3 text-black font-semibold rounded-md"
          >
            <></>
          </IconBtn>
          <button onClick={modalData?.btn2Handler}
          className="bg-richblack-100 px-6 py-3 text-black font-semibold rounded-md">
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
