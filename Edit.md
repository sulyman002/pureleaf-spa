import {
  ChevronRight,
  Minus,
  Plus,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import useAppContext from "../context/useAppContext";
import { useUpdateData } from "../services/pureLeafRequest";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import MenuUpload from "./MenuUpload";

const Edit = ({ menuData, onClose }) => {
  const { mutate: updateData } = useUpdateData();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      menuName: menuData?.name || "",
      review: menuData?.reviewUrl || "",
      foodMenuFile: menuData?.foodMenuFileUrl || "",
      drinkMenuFile: menuData?.drinkMenuFileUrl || "",
      spaMenuFile: menuData?.spaMenuFileUrl || "",
    },
  });

  const {
    toggleExpand,
    expanded,

    // uploads & progress
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

  // register file fields
  useEffect(() => {
    register("foodMenuFile");
    register("drinkMenuFile");
    register("spaMenuFile");
  }, [register]);

  // watches
  const foodFile = watch("foodMenuFile");
  const drinkFile = watch("drinkMenuFile");
  const spaFile = watch("spaMenuFile");

  // if files come from server (string URLs), mark upload as complete
  useEffect(() => {
    if (typeof foodFile === "string") {
      setFoodStatus("completed");
      setFoodProgress(100);
    }
    if (typeof drinkFile === "string") {
      setDrinkStatus("completed");
      setDrinkProgress(100);
    }
    if (typeof spaFile === "string") {
      setSpaStatus("completed");
      setSpaProgress(100);
    }
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      const fd = new FormData();
      fd.append("name", data.menuName || "");
      fd.append("reviewUrl", data.review || "");

      // If user replaced the file, File object will exist
      // If user kept original, it's a string URL — don't append
      if (data.foodMenuFile instanceof File) {
        fd.append("foodMenuFile", data.foodMenuFile);
      }
      if (data.drinkMenuFile instanceof File) {
        fd.append("drinkMenuFile", data.drinkMenuFile);
      }
      if (data.spaMenuFile instanceof File) {
        fd.append("spaMenuFile", data.spaMenuFile);
      }

      updateData(
        { id: menuData.id, payload: fd },
        {
          onSuccess: () => {
            toast.success("Menu updated");
            onClose();
          },
          onError: (error) => {
            toast.error(error.message);
            console.error(error);
          },
        }
      );
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
        
        {/* Header */}
        <div className="border-b border-gray-200 px-5">
          <div className="mb-4">
            <div className="flex items-center justify-between py-6">
              <p className="font-semibold text-2xl text-gray-900">
                Edit Menu
              </p>
              <div onClick={onClose} className="cursor-pointer">
                <X size={24} className="text-[#202020]" />
              </div>
            </div>
            <p className="text-base text-gray-600">
              Update menu details or replace uploaded files.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-8 pt-6 pb-8 px-5"
        >
          <div className="flex flex-col gap-8 overflow-y-auto">

            {/* Menu Name */}
            <div className="flex flex-col gap-3">
              <label className="text-base text-[#101828]">Menu Name</label>
              <input
                type="text"
                {...register("menuName", {
                  required: true,
                  minLength: 3,
                  maxLength: 50,
                })}
                className="py-3 px-3.5 outline-none border rounded-lg"
              />
            </div>

            {/* Restaurant Menus */}
            <div className="flex flex-col gap-6 pb-5 border-b">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium">Restaurant Menus</p>
                <div onClick={() => toggleExpand("restaurant")}>
                  {expanded.includes("restaurant") ? (
                    <Minus size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </div>
              </div>

              {expanded.includes("restaurant") && (
                <div className="flex gap-6">
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

            {/* Spa */}
            <div className="flex flex-col gap-6 pb-5 border-b">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium">Spa Menu</p>
                <div onClick={() => toggleExpand("spa")}>
                  {expanded.includes("spa") ? (
                    <Minus size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </div>
              </div>

              {expanded.includes("spa") && (
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
              )}
            </div>

            {/* Review Link */}
            <div className="flex flex-col gap-6 pb-5 border-b">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium">Review Link</p>
                <div onClick={() => toggleExpand("review")}>
                  {expanded.includes("review") ? (
                    <Minus size={24} />
                  ) : (
                    <Plus size={24} />
                  )}
                </div>
              </div>

              {expanded.includes("review") && (
                <input
                  type="text"
                  {...register("review")}
                  className="py-3 px-3.5 outline-none border rounded-lg"
                  placeholder="Add a review link"
                />
              )}
            </div>

          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 border rounded-lg bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaveDisabled}
              className={`w-full py-3 rounded-lg text-white ${
                isSaveDisabled
                  ? "bg-[#5C2E1B]/50 cursor-not-allowed"
                  : "bg-[#5C2E1B]"
              }`}
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
