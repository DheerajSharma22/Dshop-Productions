import React from "react";
import styles from "./PlaceOrderScreen.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentProcess from "../../Components/PaymentProcess/PaymentProcess";
import { setNewOrder } from "../../redux/Slice/paymentSlice";
import { clearCart } from "../../redux/Slice/cartSlice";

const PlaceOrderScreen = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.cartReducer);
  const { order, isSuccess } = useSelector((state) => state.paymentReducer);
  const [shippingAddress, setShippingAddress] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      products.reduce((a, c) => a + c.price * c.qty, 0) +
      10 +
      (products.reduce((a, c) => a + c.price * c.qty, 0) / 100) * 2
    );

    if (state && state.shippingAddress) {
      setShippingAddress(state.shippingAddress);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearCart());
      navigate("/privateRoutes/paymentsuccess", { state: order });
    }
  }, [isSuccess]);

  const editShippingAddressHandler = () => {
    navigate("/privateRoutes/payment", { state: shippingAddress });
  };

  const editOrderItemHandler = () => {
    navigate("/cart", { state: shippingAddress });
  };

  const placeOrderHandler = async (e) => {
    e.preventDefault();

    try {
      const Tax = (products.reduce((a, c) => a + c.price * c.qty, 0) / 100) * 2;
      const totalAmount = parseInt(total) * 100;
      const res = await fetch("/api/payment/placeOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalAmount,
        }),
      });
      const { order } = await res.json();

      const options = {
        key: "rzp_test_XylOqflbrVjbEm",
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        handler: function (res) {
          dispatch(
            setNewOrder({
              order_id: res.razorpay_order_id,
              payment_id: res.razorpay_payment_id,
              razorpay_signature: res.razorpay_signature,
              orderItems: products,
              shippingAddress: shippingAddress,
              paymentMethod: "Razorpay",
              shippingPrice: 10,
              taxPrice: Tax,
              totalPrice: total,
              isPaid: true,
            })
          );
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error);
    }

  };

  return (
    <>
      <PaymentProcess process={3} />
      <div className={styles.mainContainer}>
        <div className={styles.orderScreenContainer}>
          <div className={styles.labelWrapper}>
            <h3>Order Confirmation</h3>
            <div>
              <p>
                Order Total: <span>₹ {total}</span>
              </p>
              <button onClick={placeOrderHandler}>Place Order</button>
            </div>
          </div>
          <div className={styles.innerContainer}>
            <div>
              <div className={styles.headWrapper}>
                <h4>Sipping Adress</h4>
                <button onClick={editShippingAddressHandler}>Edit</button>
              </div>
              <div className={styles.shippingAddressDiv}>
                {shippingAddress ? (
                  <>
                    <p>{shippingAddress.fullName}</p>
                    <p>{shippingAddress.address}</p>
                    <p>
                      {shippingAddress.city}, {shippingAddress.states}
                    </p>
                    <p>{shippingAddress.country}</p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div>
              <div className={styles.headWrapper}>
                <h4>Payment</h4>
                <button>Edit</button>
              </div>
              <div className={styles.paymentMethodDiv}>
                <p>
                  <span>Method:</span> Paypal
                </p>
              </div>
            </div>
            <div>
              <div className={styles.headWrapper}>
                <h4>Order Items</h4>
                <button onClick={editOrderItemHandler}>Edit</button>
              </div>
              {products.map((curElem, index) => {
                return (
                  <div className={styles.orderItemsDiv} key={index}>
                    <img src={curElem.image} alt="" />
                    <p>{curElem.name}</p>
                    <p>
                      {curElem.qty} x ₹{curElem.price} = ₹
                      {curElem.qty * curElem.price}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
