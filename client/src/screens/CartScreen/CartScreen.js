import React, { useEffect } from "react";
import "./CartScreen.css";
import { useSelector } from "react-redux";
import {
  addToCartHandler,
  removeFromCartHandler,
} from "../../redux/Slice/cartSlice";
import { useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const CartScreen = () => {
  const { products } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(addToCartHandler(id, location.search.split("=")[1]));
    }
  }, []);

  const removeFromCart = (productId) => {
    dispatch(removeFromCartHandler(productId));
  };

  const checkOutHandler = async (e) => {
    if (location.state) {
      navigate("/privateRoutes/payment", {state: location.state});
    }else {
      navigate("/privateRoutes/payment");
    }
  };

  return (
    <>
      <div className="mainCartContainer cart-page">
        <table>
          <thead>
            <tr>
              <th>Products</th>
              <th>Qty</th>
              <th>SubTotal</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="cart-info">
                        <img src={item.image} alt="cartImg" />
                        <div>
                          <p>{item.name}</p>
                          <small>₹{item.price}</small>
                          <br />
                          <button
                            onClick={() => removeFromCart(item.product_id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>
                      <select
                        className="productQuantity"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCartHandler(item.product_id, e.target.value)
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x}>{x + 1}</option>
                        ))}
                      </select>
                    </td>
                    <td>₹{item.price * item.qty}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>Cart is Empty...</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="totalPriceDiv">
          <table>
            <thead>
              <tr>
                <td>SubTotal</td>
                <td>₹{products.reduce((a, c) => a + c.price * c.qty, 0)}</td>
              </tr>
              <tr>
                <td>Shipping Price</td>
                <td>₹{products.length > 0 ? 10 : 0}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>
                ₹
                  {products.length > 0 ? (products.reduce((a, c) => a + c.price * c.qty, 0) / 100) *
                    2 : 0}
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>
                ₹
                  {products.length > 0 ? products.reduce((a, c) => a + c.price * c.qty, 0) +
                    10 +
                    (products.reduce((a, c) => a + c.price * c.qty, 0) / 100) *
                      2 : 0}
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {products.length ? (
                    <button className="checkOutBtn" onClick={checkOutHandler}>
                      Proceed to CheckOut
                    </button>
                  ) : (
                    <button
                      className="checkOutBtn"
                      onClick={checkOutHandler}
                      disabled
                    >
                      Proceed to CheckOut
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
