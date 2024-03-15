import React from "react";
import { useSelector } from "react-redux";
import Sidebar from "../Components/core/Dashboard/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { loading: profileLoading } = useSelector((state) => state.profile);
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading)
    return (
      <div className="w-screen h-screen">
        <div className="custom-loader"></div>
      </div>
    );

  return (
    <div className="relative flex min-h-[calc(100vh-5rem)] w-screen">

        <Sidebar />

      <div className="lg:ml-[250px] w-full py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
