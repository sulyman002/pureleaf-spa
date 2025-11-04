
import { OctagonAlert } from "lucide-react";
import useAppContext from "../context/useAppContext";
import {  useDeleteData } from "../services/pureLeafRequest";
import { toast } from "sonner";


const Delete = () => {
  const { handleToggleDeleteModal, selectedDeleteData, setOpenDeleteModal } = useAppContext();
    const { mutate: deleteData } = useDeleteData();

  return (
    <div className="fixed flex items-center justify-center z-99 inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white w-[400px] rounded-xl flex flex-col gap-2 px-6  py-8">
       
        <div className="flex items-center justify-center gap-5 flex-col ">
            <div className="rounded-full h-12 w-12 flex items-center justify-center bg-[#FEE4E2] border-8 border-[#FEF3F2] ">
                <OctagonAlert size={20} className="text-red-500" />
            </div>
            <div className="flex items-center justify-center flex-col gap-2 ">
                <p className="text-lg font-500 text-gray-900 text-center ">Delete menu</p>
                <div className="text-center flex flex-col gap-4 text-sm font-400 text-gray-500">
                    <p>Are you sure you want to delete the <b className="text-gray-900">‘{selectedDeleteData?.name}’</b> menu?</p>
                    <p>This action will remove the menu and its QR link.</p>
                </div>
            </div>
        </div>

        <div className="flex items-center w-full gap-3 mt-4">
          <button onClick={() => {
            handleToggleDeleteModal();
          }} className="cursor-pointer w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-2.5 px-7 border border-[#E2E8F0] bg-gray-50 ">
            Cancel
          </button>
            <button onClick={() => {
              deleteData(selectedDeleteData?.id);
              setOpenDeleteModal(false);
              toast.success(`${selectedDeleteData?.name}Menu deleted successfully!`);
            }} className="cursor-pointer w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-2.5 px-7 bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
