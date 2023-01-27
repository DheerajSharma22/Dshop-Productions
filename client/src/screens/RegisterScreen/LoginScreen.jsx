import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "./RegisterScreen.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../redux/Slice/userSlice";

// import Alert from "../../Components/Alert/Alert";

const LoginScreen = ({ setLoginScreen }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      toast("Please Fill All The Fields...");
      return;
    }

    try {
      const res = await axios.post("/api/users/login", { email, password });
      const { data, status } = res;
      if (status === 200) {
        toast("LoggedIn Successfully...");
        dispatch(setUser(data));
        location.state ? navigate(location.state.from) : navigate("/");
      }
    } catch (err) {
      toast(err.response.data);
    }
  };

  return (
    <>
      <div className={Styles.container}>
        <ToastContainer pauseOnHover={false} />
        <div className={Styles.signUpContainer}>
          <h3>Sign in</h3>
          <form onSubmit={loginHandler}> 
            <input
              type="email"
              placeholder="Enter Your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Enter Your Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password"
            />
            <p className={Styles.responsiveToggle}>
              Not Registered?{" "}
              <span onClick={() => setLoginScreen(false)}>Register</span>
            </p>
            <button type="submit">sign in</button>
          </form>
        </div>

        <div className={Styles.rightOverlayContainer}>
          <div>
            <h3>Hello, Friend!</h3>
            <p>Enter your personal details and start journey with us</p>
            <button onClick={() => setLoginScreen(false)}>Sign up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
