import {
  ChevronRight,
  CircleCheck,
  CloudUpload,
  Minus,
  Plus,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useAppContext from "../context/useAppContext";
import { useCreateData } from "../services/pureLeafRequest";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MenuUpload from "./MenuUpload";

const CreateMenu = () => {
  const { mutate: createData } = useCreateData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm();

  const {
    setCreateNew,
    toggleExpand,
    expanded,

    // uploads & status from context
    uploadFoodToServer,
    uploadDrinkToServer,
    uploadSpaToServer,

    foodStatus,
    foodProgress,
    setFoodProgress,
    setFoodStatus,

    drinkStatus,
    drinkProgress,
    setDrinkProgress,
    setDrinkStatus,

    spaStatus,
    spaProgress,
    setSpaProgress,
    setSpaStatus,
  } = useAppContext();

  useEffect(() => {
    register("foodMenuFile");
    register("drinkMenuFile");
    register("spaMenuFile");
  }, [register]);

  const foodMenuFile = watch("foodMenuFile");
  const drinkMenuFile = watch("drinkMenuFile");
  const spaMenuFile = watch("spaMenuFile");

  const foodFile = foodMenuFile || null;
  const drinkFile = drinkMenuFile || null;
  const spaFile = spaMenuFile || null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("name", data.menuName || "");
      fd.append("reviewUrl", data.review || "");

      if (data.foodMenuFile) fd.append("foodMenuFile", data.foodMenuFile);
      if (data.drinkMenuFile) fd.append("drinkMenuFile", data.drinkMenuFile);
      if (data.spaMenuFile) fd.append("spaMenuFile", data.spaMenuFile);

      createData(fd, {
        onSuccess: () => {
          toast.success("Menu created");
          setCreateNew(false);
        },
        onError: (error) => {
          toast.error(error.message);
          console.error(error);
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const uploadsInProgress =
    foodStatus === "uploading" ||
    drinkStatus === "uploading" ||
    spaStatus === "uploading";

  const isSaveDisabled = isSubmitting || uploadsInProgress;

  return (
    <div className="fixed flex items-center justify-center z-50 inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white mx-8 w-[644px] rounded-xl flex flex-col gap-2 px-6 py-6">
        <div className="border-b border-gray-200 px-5">
          <div className="mb-4">
            <div className="flex items-center justify-between py-6">
              <p className="font-semibold text-2xl text-gray-900">
                Create New Menu
              </p>
              <div
                onClick={() => setCreateNew(false)}
                className="cursor-pointer"
              >
                <X size={24} className="text-[#202020]" />
              </div>
            </div>
            <p className="text-base font-400 text-gray-600">
              Upload single or multiple menus. We'll generate a single QR code
              that directs customers accordingly.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 pt-6 pb-8 px-5"
        >
          <div className="flex flex-col gap-8 overflow-y-auto h-100 scrollbar-thin scrollbar-right scrollbar-thumb-red-400 scrollbar-track-gray-50 scrollbar-thumb-inset text-gray-100">
            {/* Menu Name */}
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="menuName" className="text-base text-[#101828]">
                Menu Name
              </label>
              <input
                type="text"
                id="menuName"
                {...register("menuName", {
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                })}
                placeholder="Enter menu name"
                className="py-3 px-3.5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500"
              />
            </div>

            {/* Restaurant Menus */}
            <div className="flex flex-col gap-6 pb-5 border-b-3 border-gray-100">
              <div className="flex items-center gap-6">
                <p className="text-[#101828] text-base font-medium flex-1">
                  Restaurant Menus
                </p>

                <div
                  onClick={() => toggleExpand("restaurant")}
                  className="cursor-pointer"
                >
                  {expanded.includes("restaurant") ? (
                    <Minus size={24} className="text-gray-900" />
                  ) : (
                    <Plus size={24} className="text-gray-900" />
                  )}
                </div>
              </div>

              {expanded.includes("restaurant") && (
                <div className="flex items-center justify-center gap-6">
                  <MenuUpload
                    label="Food Menu"
                    fieldName="foodMenuFile"
                    file={foodFile}
                    progress={foodProgress}
                    status={foodStatus}
                    setValue={setValue}
                    setProgress={setFoodProgress}
                    setStatus={setFoodStatus}
                    onUpload={uploadFoodToServer}
                  />

                  <MenuUpload
                    label="Drink Menu"
                    fieldName="drinkMenuFile"
                    file={drinkFile}
                    progress={drinkProgress}
                    status={drinkStatus}
                    setValue={setValue}
                    setProgress={setDrinkProgress}
                    setStatus={setDrinkStatus}
                    onUpload={uploadDrinkToServer}
                  />
                </div>
              )}
            </div>

            {/* Spa Menu */}
            <div className="flex flex-col gap-6 pb-5 border-b-3 border-gray-100">
              <div className="flex items-center gap-6">
                <p className="text-[#101828] text-base font-medium flex-1">
                  Spa Menu
                </p>

                <div
                  onClick={() => toggleExpand("spa")}
                  className="cursor-pointer"
                >
                  {expanded.includes("spa") ? (
                    <Minus size={24} className="text-gray-900" />
                  ) : (
                    <Plus size={24} className="text-gray-900" />
                  )}
                </div>
              </div>

              {expanded.includes("spa") && (
                <div className="flex items-center justify-center gap-6">
                  <MenuUpload
                    fieldName="spaMenuFile"
                    file={spaFile}
                    progress={spaProgress}
                    status={spaStatus}
                    setValue={setValue}
                    setProgress={setSpaProgress}
                    setStatus={setSpaStatus}
                    onUpload={uploadSpaToServer}
                  />
                </div>
              )}
            </div>

            {/* Review Link */}
            <div className="flex flex-col gap-6 pb-5 border-b-3 border-gray-100">
              <div className="flex items-center gap-6">
                <p className="text-[#101828] text-base font-medium flex-1">
                  Review Link
                </p>

                <div
                  onClick={() => toggleExpand("review")}
                  className="cursor-pointer"
                >
                  {expanded.includes("review") ? (
                    <Minus size={24} className="text-gray-900" />
                  ) : (
                    <Plus size={24} className="text-gray-900" />
                  )}
                </div>
              </div>

              {expanded.includes("review") && (
                <div className="w-full flex flex-col gap-3">
                  <input
                    type="text"
                    {...register("review", {
                      pattern: {
                        value: /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[^\s]*)?$/i,
                        message: "Please enter a valid URL",
                      },
                    })}
                    placeholder="Add a link to receive feedback from your customers"
                    className="py-3 px-3.5 mb-5 outline-none text-gray-900 border-[0.6px] border-[#C8C8C8] rounded-lg placeholder-gray-500"
                  />
                  <div className="flex items-center gap-1 text-xs text-[#5C2E1B] cursor-pointer ">
                    <span>Create your survey in Incite360</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center w-full gap-3">
            <button
              type="button"
              onClick={() => setCreateNew(false)}
              className="w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-3 px-7 border border-[#E2E8F0] bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaveDisabled}
              className={`w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-3 px-7 ${
                isSaveDisabled
                  ? "cursor-not-allowed bg-[#5C2E1B]/50"
                  : "bg-[#5C2E1B]"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMenu;
