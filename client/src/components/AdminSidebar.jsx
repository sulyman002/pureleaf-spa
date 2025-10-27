import { SquarePen } from "lucide-react";
import { links } from "../data/data";
import * as Icons from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
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

        <div className="gap-1">
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
      <div className="px-5 ">
        <div className="flex py-4 border-t border-gray-200">
          <div className="flex-1 flex items-center gap-3 ">
            <img
              src=""
              alt="profile_icon"
              width="40"
              height="40"
              className="rounded-full"
            />
            <div className="flex flex-col gap-2 text-[14px] ">
              <p className="text-[#404652] font-500 ">Hotel Staff</p>
              <p className="text-[#404652] font-400">
                Staffsomething@clear.com
              </p>
            </div>
          </div>
          
          <Icons.EllipsisVertical size={20} className="text-gray-600" />

        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
