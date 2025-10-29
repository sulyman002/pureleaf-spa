import React, { useState } from "react";
import emptyState from "../assets/emptyState.png";
import { Plus } from "lucide-react";
import { tips } from "../data/data";
import useAppContext from "../context/useAppContext";
import Delete from "../components/Delete";
// import CreateMenu from "../components/CreateMenu";
// import Edit from "../components/Edit";
import QrUpdate from "../components/QrUpdate";
// import Qr from "../components/Qr";
import { Search } from "lucide-react";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { setCreateNew, createNew } = useAppContext();

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleCreateNew = () => {
    setCreateNew(!createNew);
  };
  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-6 flex-col md:flex-row px-4 md:px-8 py-8 border-b border-gray-200 shadow">
        <div className="flex flex-col gap-1">
          <h2 className="text-[30px] text-gray-900 tracking-[-2px] font-500 ">
            Menus
          </h2>
          <p className="font-400 text-base text-gray-500 ">
            Upload a PDF or image of your menu. We’ll generate a menu link and
            QR code automatically.
          </p>
        </div>
        <div className="flex items-center w-full md:w-auto gap-2 py-2.5 px-3.5 rounded-lg border border-gray-300 ">
          <Search size={20} className="text-gray-500 cursor-pointer" />
          <input
            type="text"
            placeholder="Search menus"
            className="outline-none placeholder-gray-500 text-base text-gray-900 "
          />
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 flex-col">
        <div className="">
          <img src={emptyState} alt="empty-state" />
        </div>
        <div className="flex items-center justify-center flex-col text-center gap-1">
          <p className="text-base font-semibold text-gray-900">No Menus Yet</p>
          <p className="font-400 text-gray-500 text-xs ">
            Upload your PDF or image menus and they'll be instantly available
            via QR codes. Max size: 10MB
          </p>
        </div>
        <div className="flex items-center gap-3 mt-12">
          <button
            onClick={handleCreateNew}
            className="text-base font-semibold flex items-center justify-center py-3.5 px-7 rounded-lg gap-2.5 text-white bg-[#5C2E1B] "
          >
            <Plus size={20} />
            <span>Upload my first menu</span>
          </button>
          {/* display create menu */}
          {createNew && (
            // <CreateMenu />
            // <Delete />
            // <Edit />
            // <Qr />
            <QrUpdate />
          )}

          <div className="relative group inline-block">
            <button
              onClick={handleOpen}
              className="text-base font-semibold text-[#404652] py-3.5 px-7 rounded-lg gap-2.5 border border-[#E2E8F0] bg-gray-50"
            >
              Tips
            </button>

            <div
              className={`absolute rounded-lg top-full left-0 min-w-[400px] mt-2 py-6 px-5  border border-gray-200 shadow hidden group-hover:flex ${
                open ? "flex" : "hidden"
              }`}
            >
              <ul className="list-disc space-y-5 px-4 gap-2.5 ">
                {tips.map((tip, index) => (
                  <li key={index}>
                    <b>{tip.heading}:</b> {tip.desc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
