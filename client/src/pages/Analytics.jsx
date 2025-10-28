import React, { useState } from "react";
import emptyState from "../assets/emptyState.png";
import { Plus } from "lucide-react";
import { tips } from "../data/data";
import useAppContext from "../context/useAppContext";
import CreateMenu from "../components/CreateMenu";

const Analytics = () => {
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
            <CreateMenu />
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

export default Analytics;
