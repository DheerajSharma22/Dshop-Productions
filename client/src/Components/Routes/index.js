import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/Slice/userSlice";
import axios from "axios";

export const PublicRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkAuthorized = async () => {
    try {
      const res = await axios.get("/api/users/isAuthorized");
      const data = res.data;
      dispatch(setUser(data));
      navigate("/");
    } catch (error) {
      dispatch(setUser(null));
    }
  };

  useEffect(() => {
    checkAuthorized();
  }, []);
  return <Outlet />;
};

export const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAuthorized = async () => {
    try {
      const res = await axios.get("/api/users/isAuthorized");
      const data = res.data;
      dispatch(setUser(data));
    } catch (error) {
      dispatch(setUser(null));
      navigate('/public/register', {state: "Please Login to access this page..."});
    }
  };

  useEffect(() => {
    checkAuthorized();
  }, []);

  return <Outlet />;
};


export const AdminRoute = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkAuthorized = async () => {
    try {
      const res = await axios.get("/api/users/isAuthorized");
      const data = res.data;
      dispatch(setUser(data));
      if (data.isAdmin === false) {
        navigate('/', {state: "Only admin are allowed"});
      }
    } catch (error) {
      dispatch(setUser(null));
      navigate('/public/register', {state: "Please Login to access this page..."});
    }
  };

  useEffect(() => {
    checkAuthorized();
  }, []);

  return <Outlet />;
};