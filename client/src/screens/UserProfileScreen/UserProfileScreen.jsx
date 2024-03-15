import React, { useEffect } from "react";
import styles from "./UserProfileScreen.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slice/userSlice";
import { fetchOrders } from "../../redux/Slice/AdminSlice/adminSlice"
import Loading from '../../Components/LoadingComponent/Loading';

const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const {orders} = useSelector((state) => state.adminReducer);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [])

  const handler = (orderId) => {
    navigate(`/privateRoutes/ordersummary?order_id=${orderId}`);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.status === 200) {
        dispatch(setUser(null));
        navigate("/public/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.userProfileWrapper}>
        <div className={styles.leftSide}>
          <p>{user.name}</p>
          <p>{user.isAdmin ? "Admin User" : ""}</p>
          <p>{user.email}</p>
          <button onClick={logoutHandler}>Logout</button>
        </div>
        <div className={styles.rightSide}>
          <h3>Order History</h3>
          <div className={styles.ordersDiv}>
            <table>
              <thead>
                <tr>
                  <th>order</th>
                  <th>date</th>
                  <th>payment status</th>
                  <th>total</th>
                </tr>
              </thead>
              <tbody>
              {console.log(orders)}
                {orders
                  ? orders.map((curElem, index) => {
                      return (
                        <tr
                          onClick={() => handler(curElem.order_id)}
                          key={index}
                        >
                          <td>{curElem.order_id}</td>
                          <td>{curElem.createdAt}</td>
                          <td>{curElem.isPaid ? <span>paid</span> : "due"}</td>
                          <td>₹{curElem.totalPrice}</td>
                        </tr>
                      );
                    })
                  : ""}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileScreen;
