import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import MobileNav from "../components/MobileNav";
import bellIcon from "../assets/bell.svg";

import { Outlet, useNavigate } from "react-router-dom";
import useAppContext from "../context/useAppContext";

// import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const { adminTitle, setAdminTitle } = useAppContext();
  const navigate = useNavigate();
  return (
    <div>
      {/* Admin sections */}
      <div className="flex flex-col md:flex-row h-screen bg-gray-50 ">
        {/* Admin Tabs */}

        <AdminSidebar />
        {/* Mobile nav */}

        <MobileNav />

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="pt-[48px] hidden md:flex pb-[24px] px-[32px] items-center justify-between bg-white shadow-lg">
            <h2 className="text-[24px] font-semibold font-600 text-gray-700">
              {adminTitle}
            </h2>
            <div
              onClick={() => {
                
                setAdminTitle("Profile Info");
                
                navigate("profile-info");
              }}
              className=""
            >
              <img src={bellIcon} alt="" className="w-[24px] h-[24px]" />
            </div>
          </div>

          <main className="flex-1 overflow-y-auto p-3">
            <Outlet />
          </main>
        </div>

        {/* <div className="w-full flex-1  h-screen bg-[#F5F5F5]"></div> */}
      </div>
    </div>
  );
};

export default AdminLayout;
