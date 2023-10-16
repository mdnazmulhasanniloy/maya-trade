import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNav from "../../Pages/Shared/Header/DashboardNav/DashboardNav";
import SideBar from "../SideBar";

const Dashboard = () => {
  return (
    <>
      <div className="md:grid md:grid-cols-12 p-3 md:gap-3">
        <DashboardNav />
        <div className="md:col-span-10 md:ml-32">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
