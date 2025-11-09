import {
  Briefcase,
  ChevronDown,
  Clock4,
  CloudUpload,
  Mail,
  Phone,
} from "lucide-react";
import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import { openingHours } from "../../data/data";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { updateBusinessProfile } from "../../services/pureLeafRequest.js";

const Profile = () => {
  const [openHour, setOpenHour] = useState(openingHours[0]);
  const { mutate: updateBusiness } = updateBusinessProfile();


  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleOnDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setValue("profile", [file]);
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("businessName", data.businessName);
    formData.append("type", data.type);
    formData.append("number", data.number);
    formData.append("email", data.email);
    formData.append("profile", data.profile?.[0]);
    formData.append("openingHours", JSON.stringify(openHour));
    formData.append("shortDesc", data.shortDesc);

    updateBusiness(formData);
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 pb-4">
        <p className=" font-500 text-lg text-gray-900 ">Profile</p>
        <p className=" font-400 text-sm text-gray-500 ">
          Update details shown to guests and on the short link preview.
        </p>
      </div>
      <hr className="border border-gray-200" />
      <div className="px-4 space-y-5">
        <div className="flex flex-col gap-5">
          <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200 pb-4 ">
            <p className="w-[280px]  text-sm font-500 text-gray-700 ">
              Business Name
            </p>
            <input
              type="text"
              {...register("businessName", { required: true, maxLength: 100 })}
              placeholder="Crestabel inc"
              className={`md:w-lg w-full text-gray-900 rounded-lg py-2.5 px-3.5 border shadow outline-none ${errors.businessName ? "border-red-500" : "border-gray-300"} `}
            />
          </div>

          <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200 pb-4">
            <p className="w-[280px] text-sm font-500 text-gray-700 ">Type</p>
            <input
              type="text"
              {...register("type", { required: true, maxLength: 50 })}
              placeholder="Restaurant"
              className={`md:w-lg w-full text-gray-900 rounded-lg py-2.5 px-3.5 border shadow outline-none ${errors.type ? "border-red-500" : "border-gray-300"} `}
            />
          </div>
          <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200 pb-4 ">
            <p className="w-[280px] text-sm font-500 text-gray-700 ">
              Phone Number
            </p>
            <div className={` flex items-center gap-2 w-full md:w-lg rounded-lg py-2.5 px-3.5 border ${errors.number ? "border-red-500" : "border-gray-300"}  shadow "`}>
              <Phone size={20} className="text-gray-500" />
              <input
                type="number"
                {...register("number", {
                  required: true,
                  maxLength: {
                    value: 15,
                  },
                })}
                placeholder="+234 700 000 0000"
                className="w-full  outline-0 text-gray-900"
              />
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200 pb-4  ">
            <p className="w-[280px] text-sm font-500 text-gray-700 ">
              Email address
            </p>
            <div className={` flex items-center gap-2 w-full md:w-lg rounded-lg py-2.5 px-3.5 border ${errors.email ? "border-red-500" : "border-gray-300"} `}>
              <Mail size={20} className="text-gray-500" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required. ",
                  validate: (value) => {
                    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    return (
                      pattern.test(value) ||
                      "Please enter a valid email address. "
                    );
                  },
                })}
                placeholder="support@crestsomething.com"
                className="w-full outline-0 text-gray-900"
              />
            </div>
          </div>
        </div>
        <div className="flex  gap-8">
          <div className="w-[280px] flex flex-col">
            <p className=" font-500 text-xs text-gray-900 ">Profile</p>
            <p className=" font-400 text-xs text-gray-500 ">
              This will be displayed on your profile.
            </p>
          </div>
          <div className="w-lg flex gap-5">
            <div className="h-16 w-16 rounded-full bg-[#F0ECEB] flex items-center justify-center">
              <Briefcase size={28} className="text-[#5C2E1B]" />
            </div>
            <div
              onDragOver={handleDragOver}
              onDrop={handleOnDrop}
              className={`flex flex-col items-center justify-center py-4 px-6 gap-3 shadow border ${errors.profile ? "border-red-500" : "border-gray-300"}  w-full rounded-lg`}
            >
              <div className="h-10 w-10 rounded-full border-[6px] border-gray-50 bg-[#F2F4F7] flex items-center justify-center">
                <CloudUpload size={20} className="text-gray-600" />
              </div>
              <div className="flex flex-col gap-1 text-xs text-center text-gray-500">
                <div>
                  {/* Hidden input */}
                  <input
                    type="file"
                    id="profile"
                    className="hidden"
                    accept="image/svg+xml, image/png, image/jpeg, image/gif"
                    {...register("profile", {
                      required: true,
                    })}
                    // onChange={(e) => {
                    //   handleFileUpload(e);
                    //   setCreateNew(true);
                    // }}
                  />

                  {/* Custom upload button */}
                  <label htmlFor="profile" className="text-sm">
                    <b className="text-[#5C2E1B] font-500 cursor-pointer">
                      Click to upload{" "}
                    </b>
                  </label>
                  <span> or drag and drop</span>
                </div>

                <p>SVG, PNG, JPG or GIF (max. 800x400px)</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200 pb-4 ">
          <p className="w-[280px] text-sm font-500 text-gray-700 ">Address</p>
          <div className="md:w-lg w-full flex flex-col gap-4">
            <div className="w-full">
              <input
                type="text"
                {...register("address", {
                  required: true,
                  maxLength: 100,
                })}
                placeholder="Abuja"
                className={`w-full text-gray-900 rounded-lg py-2.5 px-3.5 border ${errors.address ? "border-red-500" : "border-gray-300"}  shadow outline-none `}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="address"
                id="address"
                className=" accent-[#5C2E1B] bg-[#F0ECEB] "
              />
              <p className="text-sm text-gray-700 font-500">
                I have a physical address
              </p>
            </div>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-2 md:gap-8 border-b border-gray-200 pb-4  ">
          <p className="w-[280px] text-sm font-500 text-gray-700 ">
            Opening Hours
          </p>

          <div className="relative">
            <Listbox value={openHour} onChange={setOpenHour}>
              <Listbox.Button className="gap-12 md:w-lg w-full flex border border-gray-300 shadow items-center justify-between text-gray-900 rounded-lg py-2.5 px-3.5">
                <div className=" flex gap-2">
                  <div className="flex items-center gap-2">
                    <Clock4 size={20} className="text-gray-500" />
                    <p className="text-base text-gray-900 ">(WAT)</p>
                  </div>
                  <p className="text-base font-400 text-gray-500">
                    {openHour.zone} - {openHour.from.toFixed(2)} -{" "}
                    {openHour.to.toFixed(2)}PM
                  </p>
                </div>
                <div className="">
                  <ChevronDown size={20} className=" text-gray-500" />
                </div>
              </Listbox.Button>

              <Listbox.Options className="absolute left-0 top-full mt-2 w-full  bg-white border-gray-200 rounded-lg z-50 shadow">
                {openingHours.map((item) => (
                  <Listbox.Option
                    value={item}
                    className="hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <div
                      key={item.id}
                      className=" flex gap-2 rounded-lg py-2.5 px-3.5"
                    >
                      <div className="flex items-center gap-2">
                        <Clock4 size={20} className="text-gray-500" />
                        <p className="text-base text-gray-900 ">(WAT)</p>
                      </div>
                      <p className="text-base font-400 text-gray-500">
                        {item.zone} - {item.from.toFixed(2)} -{" "}
                        {item.to.toFixed(2)}PM
                      </p>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Listbox>
          </div>
        </div>

        <div className="w-full max-w-md border-b border-gray-200 pb-4 ">
          <Controller
            name="shortDesc"
            control={control}
            render={({ field }) => (
              <ReactQuill
                {...field}
                value={field.value}
                onChange={field.onChange}
                theme="snow"
                placeholder="Elegant, touch-free fine dining for guests."
              />
            )}
          />
        </div>
        <div className="flex w-full justify-end">
          <div className="flex items-center gap-3 mt-4">
            <button className=" text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-3.5 px-7 border border-[#E2E8F0] bg-gray-50 ">
              Cancel
            </button>
            <button
              type="submit"
              className=" cursor-pointer text-base font-semibold text-white flex items-center justify-center rounded-lg py-3.5 px-7 bg-[#5C2E1B]"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Profile;
