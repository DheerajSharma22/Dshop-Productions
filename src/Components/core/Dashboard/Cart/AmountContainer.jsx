import React from "react";

const AmountContainer = () => {
  
  return (
    <div className="bg-richblack-800 px-10 py-6 w-full h-fit mt-5 rounded-md flex flex-col gap-2">
      <p className="text-lg">Total</p>
      <p className="text-2xl text-yellow-50 font-bold">Rs. 4,500</p>
      <button className="bg-yellow-50 text-black font-semibold text-lg py-3 px-6 mt-3 rounded-md">
        Buy Now
      </button>
    </div>
  );
};

export default AmountContainer;
