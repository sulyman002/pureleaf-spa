import React from "react";
import AdminSidebar from "../components/AdminSidebar";

import { Outlet } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import { Search } from "lucide-react";
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
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row px-4 md:px-8 py-8 border-b border-gray-200 shadow">
            <div className="flex flex-col gap-1">
              <h2 className="text-[30px] text-gray-900 tracking-[-2px] font-500 ">
                Menus
              </h2>
              <p className="font-400 text-base text-gray-500 ">
                Upload a PDF or image of your menu. We’ll generate a menu link
                and QR code automatically.
              </p>
            </div>
            <div className="flex items-center w-full md:w-auto gap-2 py-2.5 px-3.5 rounded-lg border border-gray-300 ">
              <Search size={20} className="text-gray-500 cursor-pointer" />
              <input type="text" placeholder="Search menus" className="outline-none placeholder-gray-500 text-base text-gray-900 " />
            </div>
          </div>

          <main className="flex-1 overflow-y-auto px-4 md:px-8 pt-8">
            <Outlet />
          </main>
        </div>

        {/* <div className="w-full flex-1  h-screen bg-[#F5F5F5]"></div> */}
      </div>
    </div>
  );
};

export default AdminLayout;
