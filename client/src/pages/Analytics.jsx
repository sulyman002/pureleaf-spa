import React, { useState } from "react";
import emptyState from "../assets/emptyState.png";
import { Plus } from "lucide-react";
import { tips } from "../data/data";

const Analytics = () => {
    const [openTips, setOpenTips] = useState(false);

    const handleOpenTips = () => {
        setOpenTips(!openTips);
    }
  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-3 flex-col">
        <div className="">
          <img src={emptyState} alt="empty-state" />
        </div>
        <div className="flex items-center justify-center flex-col text-center gap-1">
          <p className="text-base font-semibold text-gray-900">No Menus Yet</p>
          <p className="font-400 text-gray-500 text-xs ">
            Upload your PDF or image menus and they’ll be instantly available
            via QR codes. Max size: 10MB
          </p>
        </div>
        <div className="flex items-center gap-3 mt-12">
            <button className="text-base font-semibold flex items-center justify-center py-3.5 px-7 rounded-lg gap-2.5 text-white bg-[#5C2E1B] ">
                <Plus size={20} />
                <span>Upload my first menu</span>
            </button>
            <button onClick={handleOpenTips} className="relative group text-base font-semibold text-[#404652] py-3.5 px-7 rounded-lg gap-2.5 border border-[#E2E8F0] bg-gray-50 ">
                Tips

                <div className={`absolute rounded-lg py-6 px-4 gap-2.5 border border-gray-200 shadow  -bottom-2.5 hidden group-hover:flex ${openTips? "flex" : "hidden"}`}>
                    <ul className=" list-disc  w-full ">
                        {tips.map((tip, index) => (
                            <li key={index} className="">
                                <b>{tip.heading}:</b> {tip.desc}
                            </li>
                        ))}
                    </ul>
                </div>
            </button>

            
        </div>
      </div>
    </div>
  );
};

export default Analytics;
