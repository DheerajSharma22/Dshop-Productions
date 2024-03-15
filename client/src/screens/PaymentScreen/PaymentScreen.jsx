import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PaymentScreen.module.css";
import PaymentProcess from '../../Components/PaymentProcess/PaymentProcess';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    states: "",
    postalCode: "",
    country: "",
  });
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (state) {
      setShippingAddress(state);
    }
  }, [])

  useEffect(() => {
    const {
      fullName,
      address,
      city,
      states,
      postalCode,
      country,
    } = shippingAddress;

    if (
      fullName === "" ||
      address === "" ||
      city === "" ||
      states === "" ||
      postalCode === "" ||
      country === ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [shippingAddress]);

  const submitHandler = () => {
    navigate(`/privateRoutes/orderScreen`, {
      state: {
        shippingAddress: shippingAddress,
      },
    });
  };

  return (
    <>
    <PaymentProcess process={2}/>
      <div className={styles.container}>
        <h3>Shipping Address</h3>
        <div className={styles.formWrapper}>
          <div>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              id="name"
              name="fullName"
              value={shippingAddress.fullName}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  fullName: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Enter Address"
              id="address"
              name="address"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="city">City</label>
            <input
              type="text"
              placeholder="Enter City"
              id="city"
              name="city"
              value={shippingAddress.city}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, city: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="state">State</label>
            <input
              type="text"
              placeholder="Enter State"
              id="state"
              name="state"
              value={shippingAddress.states}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  states: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="postal_code">Postal Code</label>
            <input
              type="text"
              placeholder="Enter Postal Code"
              id="postal_code"
              name="postalCode"
              value={shippingAddress.postalCode}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  postalCode: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              placeholder="Enter Country"
              id="country"
              name="country"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
            />
          </div>
          <button
            className={styles.submitBtn}
            onClick={submitHandler}
            disabled={disabled ? true : false}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentScreen;
