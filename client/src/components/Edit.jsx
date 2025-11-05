import { X } from "lucide-react";
import React, { useState } from "react";
import useAppContext from "../context/useAppContext";
import { useUpdateData } from "../services/pureLeafRequest";

const Edit = () => {
  const { handlOpenEdit, data: editData } = useAppContext();
  const { mutate: updateData } = useUpdateData();
  const [formData, setFormData] = useState({
    menuName: "",
    location: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(editData);
  const handleSubmit = (e) => {
    e.preventDefault();

    
  }
  

  // const fileData = new FormData();

  // fileData.append('file', uploadFile)

  return (
    <div className="fixed flex items-center justify-center z-[999] inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white w-[644px] rounded-xl flex flex-col gap-2   py-8">
        <div className="border-b border-gray-200">
          <div className="flex items-center px-5 justify-between py-6 border-b border-gray-200">
            <p className="font-600 font-semibold text-2xl text-gray-900 ">
              Edit 'Breakfast'
            </p>
            <div onClick={() => handlOpenEdit()} className="cursor-pointer ">
              <X />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8.5 pt-6 pb-8 px-5 ">
          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Menu Name
            </label>
            <input
              type="text"
              name="menuName"
              onChange={handleChange}
              value={formData?.menuName}
              placeholder="Enter menu name"
              className="py-3 px-3.5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500 "
            />
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Location
            </label>
            <select
              name="location"
              onChange={handleChange}
              value={formData?.location}
              id=""
              className="py-3 px-3.5 outline-none border-[0.6px] border-[#C8C8C8] rounded-lg"
            >
              <option value="" defaultValue="Select location">
                Select location
              </option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </select>
          </div>

          <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Type
            </label>
            <select
              name="type"
              onChange={handleChange}
              value={formData?.type}
              id=""
              className="py-3 px-3.5 outline-none border-[0.6px] border-[#C8C8C8] rounded-lg"
            >
              <option value="" defaultValue="Select location">
                Food
              </option>
              <option value="a">a</option>
              <option value="b">b</option>
              <option value="c">c</option>
            </select>
          </div>

          {/* Upload layout */}
          {/* <div className="flex flex-col gap-3 w-full ">
            <label htmlFor="menuName" className="text-base text-[#101828] ">
              Upload Menu
            </label>
            <div className="rounded-lg  border border-[#AD968C] p-4 flex w-full  ">
              <div className="flex gap-4 w-full ">
                <div className="">Image here</div>

                <div className="flex gap-1 flex-col w-full">
                  <div className="text-gray-700 text-sm font-500">
                    <span>{uploadFile.name}</span>
                    <br />
                    <span className="text-gray-500 font-400">
                      {Math.round(uploadFile.size / 1024)} KB
                    </span>
                  </div>

                  <div className="w-full flex items-center gap-3 py-1">
                    <div className="h-2 rounded-full w-full bg-[#F9F5FF] ">
                      <div
                        className="h-2 rounded-full bg-[#5C2E1B] transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm font-500 text-gray-700">
                      {uploadProgress}%
                    </p>
                  </div>

                  <div
                    onClick={() => {
                      setUploadFile("");
                      setUploadProgress(0);

                      document.getElementById(fileInputId).value = "";
                    }}
                  >
                    <input
                      type="file"
                      id={fileInputId}
                      className="hidden"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                    />

                    <label
                      htmlFor={fileInputId}
                      className="cursor-pointer flex items-center gap-1 font-500 text-[#5C2E1B] text-sm "
                    >
                      <RotateCw size={16} />
                      <span>Replace image</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="">
                {uploadProgress === 100 ? (
                  <CircleCheck size={16} className="text-[#5C2E1B] " />
                ) : (
                  <Trash2
                    size={20}
                    className="cursor-pointer text-gray-500 hover:text-red-500 transition"
                  />
                )}
              </div>
            </div>
          </div> */}
          {/* Upload layout ends here */}
          <div className="flex items-center w-full gap-3">
            <button className="w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-3 px-7 border border-[#E2E8F0] bg-gray-50 ">
              Cancel
            </button>
            <button type="submit" className="w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-3 px-7 bg-[#5C2E1B]">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
