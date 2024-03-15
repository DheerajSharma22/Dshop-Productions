import React from "react";
import AmountContainer from "./AmountContainer";
import { useSelector } from "react-redux";
import CartCard from "./CartCard";

const MyCart = () => {
  const { cart, totalItems } = useSelector(state => state.cart);

  return (
    <div className="px-5 lg:px-14 py-3 text-white lg:mb-0 mb-10">
      <h1 className="text-3xl font-semibold mb-10">My Cart</h1>

      <div>
        <p>{totalItems} Courses in cart</p>
        <hr />
        {!cart ? (
          <div className="w-full min-h-[400px] flex items-center justify-center">
            <div className="custom-loader"></div>
          </div>
        ) : !cart.length ? (
          <p>Your Cart is Empty</p>
        ) : (
          <div className="flex md:flex-row flex-col-reverse items-start gap-5">
            <div className="w-[100%] md:w-[65%]">
              <div className="flex flex-col gap-5 mt-5">
                {cart.map((item, index) => {
                  return (
                    <CartCard item={item} key={index} />
                  );
                })}
              </div>
            </div>
            <div className="w-[100%] md:w-[35%]">
              <AmountContainer />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;
