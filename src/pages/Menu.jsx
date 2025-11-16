import React from "react";




import Delete from "../components/Delete";
// import CreateMenu from "../components/CreateMenu";
// import Edit from "../components/Edit";

// import Qr from "../components/Qr";
import { Search } from "lucide-react";
import EmptyMenu from "../components/EmptyMenu";
import { useFilledData } from "../services/pureLeafRequest";
import FilledMenu from "../components/FilledMenu";
import useAppContext from "../context/useAppContext";

const Menu = () => {
  
  const { data: cardData,  } = useFilledData();
  const { setFilterValue, setInputValue, inputValue } = useAppContext();
  const data = cardData || [];



 
  return (
    <div className="w-full gap-8">
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
          <Search onClick={() => setFilterValue(inputValue)} size={20} className="text-gray-500 cursor-pointer" />
          <input
            type="text"
            placeholder="Search menus"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
            className="outline-none placeholder-gray-500 text-base text-gray-900 "
          />
        </div>
      </div>
      {/* Empty menu */}
      {data.length === 0 ? <EmptyMenu /> :  <FilledMenu />}
     
      
    </div>
  );
};

export default Menu;
