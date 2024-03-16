import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/Slice/userSlice";
import axios from "axios";
import BASE_URL from "../../BaseURL";

export const PublicRoutes = () => {
  const { token } = useSelector(state => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
      return;
    }
  }, []);


  return <Outlet />;
};

export const ProtectedRoute = () => {
  const { token } = useSelector(state => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (token === null || !token) {
      navigate("/public/register");
      return;
    }
  }, []);


  return <Outlet />;
};


export const AdminRoute = () => {
  const { token, user } = useSelector(state => state.userReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || !user) {
      navigate('/');
    }
  }, []);

  if (user && token && user.isAdmin) {
    return <Outlet />;
  }

};