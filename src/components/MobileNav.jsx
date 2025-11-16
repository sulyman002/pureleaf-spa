import { X } from "lucide-react";
import React, { useState } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { links } from "../data/data";
import * as Icons from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../context/useAuth.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuthProfile } from "../services/pureLeafRequest.js";


const MobileNav = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const location = useLocation();
  const [openNav, setOpenNav] = useState(false);
   const {data: profileData} = useAuthProfile();
    console.log(profileData?.businessProfile.logoUrl);
    const profilePics = profileData?.businessProfile.logoUrl;

  const text = user ? user.email : "";
    // console.log(user);
    
    const position = text.indexOf("@");
  
    const shortText =
      text.length > 10 ? text.slice(0, position + 1) + "..." : text;
    
  


  const handleToggleNav = () => {
    setOpenNav(!openNav);
  };
  return (

   
    <div className=" flex md:hidden border-b border-[#F0ECEB] shadow py-4 px-4 items-center justify-between ">
      {/* logo */}
      <div className="">logo</div>
      <div onClick={handleToggleNav} className="cursor-pointer">
        <CgMenuLeftAlt size={24} className="text-gray-500 " />
      </div>

      {/* Mobile Nav display */}

      {openNav && (
        <div className="fixed inset-0 bg-[#34405499] min-h-full flex backdrop-blur-2xl z-99 ">
          <div className=" flex flex-col h-screen w-4/5 bg-white transition-all duration-300 ">
            <div className="flex-1 flex py-4 px-3 gap-5 flex-col  ">
              <div className="">logo</div>
              <div className="gap-1">
                {links.map((link, index) => {
                  const Icon = Icons[link.icon];
                  return (
                    <Link
                      key={index}
                      to={link.path}
                      onClick={() => setOpenNav(false)}
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
            {/* setting menu */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col px-5 gap-2">
                <div className="cursor-pointer flex items-center gap-4 font-500 text-base text-gray-700 ">
                  <Icons.Settings size={22} className="text-gray-500" />
                  <span>Support</span>
                </div>
                <div
                  onClick={ () => {
                    navigate("/admin/settings")
                    setOpenNav(false);
                  }}
                  className="cursor-pointer flex items-center gap-4 font-500 text-base text-gray-700 "
                >
                  <Icons.Settings size={22} className="text-gray-500" />
                  <span>Settings</span>
                </div>
                <div
                  onClick={async () => {
                    await new Promise((resolve) => {
                      setTimeout(resolve, 500);
                    });
                    logout();
                    setOpenNav(false);
                    toast.success("Logged out successfully");
                  }}
                  className="cursor-pointer flex items-center gap-4 font-500 text-base text-red-700 "
                >
                  <Icons.LogOut size={22} className="" />
                  <span>Log out</span>
                </div>
              </div>
              <div className="px-5 ">
                <div className="flex py-4 border-t border-gray-200">
                  <div className="flex-1 flex items-center gap-3 ">
                    <img
                      src={profilePics}
                      alt="profile_icon"
                      width="40"
                      height="40"
                      className="rounded-full"
                    />
                    <div className="flex flex-col gap-2 text-[14px] ">
                      <p className="text-[#404652] font-500 ">{profileData?.name}</p>
                      <p className="text-[#404652] font-400">
                       {shortText}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            onClick={handleToggleNav}
            className="flex cursor-pointer justify-end w-1/5 p-4"
          >
            <X size={24} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
