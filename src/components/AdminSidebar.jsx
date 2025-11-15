import { SquarePen } from "lucide-react";
import { links } from "../data/data";
import * as Icons from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { toast } from "sonner";
import useAuth from "../context/useAuth.js";
import { useEffect } from "react";

const AdminSidebar = () => {
  const { user, logout } = useAuth();

  const location = useLocation();
  const text = user ? user.email : "";
  // console.log(user);
  
  const position = text.indexOf("@");

  const shortText =
    text.length > 10 ? text.slice(0, position + 1) + "..." : text;
  const [useMenu, setUserMenu] = useState(false);

  const modalRef = useRef(null);

  useEffect(() => {
    const handleCLickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleCLickOutside);

    return () => {
      document.removeEventListener("mousedown", handleCLickOutside)
    };
  }, []);

  const handleUSerMenu = () => {
    setUserMenu(!useMenu);
  };
  return (
    <aside className="w-70 h-screen hidden md:flex flex-col shadow border-r border-gray-300 ">
      <div className="flex-1 flex flex-col pt-8 px-5 gap-6">
        <div className="flex items-center gap-4.5 ">
          <p className="flex items-center justify-center bg-[#F0ECEB] rounded-full w-10 h-10 text-base font-500 text-center text-[#5C2E1B] font-medium  ">
            CE
          </p>
          <div className="flex flex-col gap-2 text-xs ">
            <p className="text-[#667085] ">Name of software here</p>
            <div className="gap-1 flex items-center text-sm font-500 text-gray-900 ">
              <span>Clear Essence</span>
              <SquarePen size={11.74} className="text-gray-900" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {links.map((link, index) => {
            const Icon = Icons[link.icon];
            return (
              <Link
                key={index}
                to={link.path}
                className={`flex items-center py-2.5 px-3 rounded-md gap-3 text-base font-500 transition-colors  ${
                  location.pathname === link.path
                    ? " bg-[#5C2E1B] text-white "
                    : " text-gray-500 "
                }`}
              >
                <Icon
                  size={24}
                  className={` ${
                    location.pathname === link.path
                      ? "text-white"
                      : "text-gray-500"
                  } `}
                />
                <p className="">{link.title}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* profile */}

      <div className="flex py-4 border-t border-gray-200 px-5">
        <div className="flex-1 flex items-center gap-3 w-4/5 ">
          <img
            src=""
            alt="profile_icon"
            width="40"
            height="40"
            className="rounded-full"
          />
          <div className="flex flex-col gap-2 text-[14px] ">
            <p className="text-[#404652] font-500 ">{user?.name}</p>
            <p className="text-[#404652] font-400">{shortText}</p>
          </div>
        </div>

        <div
          onClick={handleUSerMenu}
          className="cursor-pointer w-1/5 flex justify-end relative group "
        >
          <Icons.EllipsisVertical size={20} className="text-gray-600" />

          {useMenu && (
            <div ref={modalRef} className="px-5 gap-3 absolute flex flex-col left-full bottom-0 ml-3 w-64 bg-white shadow-lg rounded-lg z-999 p-4 ">
              <div className="flex ">
                <div className="flex-1 flex items-center gap-3 ">
                  <img
                    src=""
                    alt="profile_icon"
                    width="40"
                    height="40"
                    className="rounded-full"
                  />
                  <div className="flex flex-col gap-2 text-[14px] ">
                    <p className="text-[#404652] font-500 ">{user?.name}</p>
                    <p className="text-[#404652] font-400 ">{shortText}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-ful">
                <div className="cursor-pointer flex items-center gap-4 font-500 text-base text-gray-700 ">
                  <Icons.Settings size={22} className="text-gray-500" />
                  <span>Support</span>
                </div>
                <Link
                  to="/admin/settings"
                  className="cursor-pointer flex items-center gap-4 font-500 text-base text-gray-700 "
                >
                  <Icons.Settings size={22} className="text-gray-500" />
                  <span>Settings</span>
                </Link>
                <div
                  onClick={async () => {
                    await new Promise((resolve) => {
                      setTimeout(resolve, 500);
                    });
                    logout();
                    setUserMenu(false);
                    toast.success("Logged out successfully");
                  }}
                  className="cursor-pointer flex items-center gap-4 font-500 text-base text-red-700 "
                >
                  <Icons.LogOut size={22} className="" />
                  <span>Log out</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
