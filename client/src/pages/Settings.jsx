import React from "react";
import { settingOptions } from "../data/data";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Settings = () => {
  const location = useLocation();
  return (
    <div className="w-full">
      <div className="my-5 flex flex-col gap-8 px-6">
        <div className="flex flex-col gap-6">
          <h2 className="text-[30px] text-gray-900 font-500 ">Settings</h2>
          <div className="flex gap-2 items-center ">
            {settingOptions.map((option, index) => (
              <Link
                to={option.path}
                key={index}
                className={`font-500 text-sm py-2 px-3 ${location.pathname === option.path ? "rounded-md border border-[#5C2E1B] text-[#5C2E1B] bg-[#F0ECEB] " : "text-gray-500"}`}
              >{option.name}</Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <Outlet />
        </div>
      </div>
      {/* <div className="flex items-start justify-between gap-6 flex-col md:flex-row px-4 md:px-8 py-8 border-b border-gray-200 shadow">
            
            
          </div> */}
    </div>
  );
};

export default Settings;
