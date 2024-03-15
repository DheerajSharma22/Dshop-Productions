import React, { useState } from "react";
import LoginScreen from "./LoginScreen";
import Styles from "./RegisterScreen.module.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from 'react-hot-toast';
import { setUser } from "../../redux/Slice/userSlice";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [loginScreen, setLoginScreen] = useState(false);

  const registerHandler = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !cPassword) {
      toast.error("Please fill all the fields!");
      return;
    }

    const toastId = toast.loading("Loading...");
    try {
      const res = await axios.post("/api/users/register", {
        name,
        email,
        password,
        cpassword: cPassword,
      });
      const { data, status } = res;

      if (status === 200) {
        toast.success("Registered Successfully....");
        if (status === 200) {
          dispatch(setUser(data));
          navigate(-1);
        }
      }
    } catch (error) {
      toast.error(error?.response?.data);
    }
    toast.dismiss(toastId);
  };

  return (
    <>
      {loginScreen ? (
        <LoginScreen setLoginScreen={setLoginScreen} />
      ) : (
        <>
          <div className={Styles.container}>
            <div className={Styles.leftOverlayContainer}>
              <div>
                <h3>Welcome Back!</h3>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button onClick={() => setLoginScreen(true)}>Sign in</button>
              </div>
            </div>
            <div className={Styles.signUpContainer}>
              <h3>Create Account</h3>
              <form onSubmit={registerHandler}>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
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
                <input
                  type="password"
                  placeholder="Enter Your Confirm Password"
                  name="cpassword"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  autoComplete="cpassword"
                />
                <p className={Styles.responsiveToggle}>
                  Already Have Account?{" "}
                  <span onClick={() => setLoginScreen(true)}>Please Login</span>
                </p>
                <button className={Styles.signUpBtn} type="submit">
                  sign up
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RegisterScreen;
