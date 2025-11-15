import React from "react";
import AdminSidebar from "../components/AdminSidebar";

import { Outlet } from "react-router-dom";
import MobileNav from "../components/MobileNav";

// import useAppContext from "../context/useAppContext";

const AdminLayout = () => {
  // const { adminTitle, setAdminTitle } = useAppContext();
  // const navigate = useNavigate();
  return (
    <div>
      {/* Admin sections */}
      <div className="flex flex-col md:flex-row h-screen bg-gray-50 ">
        {/* Admin Tabs */}

        <AdminSidebar />
        {/* Mobile nav */}

        <MobileNav />

        <div className="flex-1 flex flex-col overflow-hidden">
          

          <main className="flex-1 overflow-y-auto ">
            <Outlet />
          </main>
        </div>

        {/* <div className="w-full flex-1  h-screen bg-[#F5F5F5]"></div> */}
      </div>
    </div>
  );
};

export default AdminLayout;
