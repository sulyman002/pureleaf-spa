import React from "react";
// import bar_code from "../assets/bar_code.png";
import useAppContext from "../context/useAppContext";
import { X } from "lucide-react";
import { toast } from "sonner";
import QrUpdate from "../components/QrUpdate.jsx";
import { useEffect } from "react";

const Qr = () => {
  const {
    handleOpenQr,
    data: qrData,
    loading,
    qr,
    handleOpenQrUpdate,
    openQrUpdate,
    handleCopy,
    convertToQrCode,
     setOpenQr
  } = useAppContext();

  const link = qrData?.imageUrl;
  const cleanLink = link?.replace(/^https?:\/\//, "");

  useEffect(() => {
    if (qr) {
      const container = document.getElementById("qr-container");

      if (container) {
        container.innerHTML = "";
        qr.append(container);
      }
    }
  }, [qr]);
  console.log(qr);

  return (
    <div className="fixed flex items-center justify-center z-99 inset-0 bg-[#34405499]/60 backdrop-blur-[2px]">
      <div className="bg-white px-5 mx-5 md:mx-0 w-[644px] rounded-xl flex flex-col gap-2   py-8">
        <div className="border-b border-gray-200">
          <div className="flex items-center justify-between py-6 border-b border-gray-200">
            <p className="font-600 font-semibold text-2xl text-gray-900 ">
              QR Code for Breakfast Menu
            </p>
            <div onClick={handleOpenQr} className="cursor-pointer ">
              <X />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 w-full py-6 px-10">
          <div className="flex items-center justify-center w-full py-1 px-10">
            {loading && (
              <div className="animate-pulse w-full flex items-center justify-center">
                <p className="">Generating QR-Code...</p>
              </div>
            )}

            {qr && !loading && (
              <div className="flex items-center justify-center w-full">
                <div
                  id="qr-container"
                  className="flex items-center justify-center p-2"
                  style={{
                    width: "100%",
                    maxWidth: "320px",
                    minHeight: "200px",
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-sm text-center ">{cleanLink}</p>

        <div className="flex items-center w-full gap-3 mt-5">
          <button
            onClick={() => {
              handleCopy(link);
              toast.success("link copied.");
            }}
            className="cursor-pointer w-full text-base font-semibold text-[#404652] flex items-center justify-center rounded-lg py-2.5 px-4.5 border border-[#E2E8F0] bg-gray-50 "
          >
            Copy link
          </button>
          <button
            onClick={async () => {
              handleOpenQrUpdate();
              setOpenQr(false);
              await convertToQrCode(qrData);
            }}
            className="cursor-pointer w-full text-base font-semibold text-white flex items-center justify-center rounded-lg py-2.5 px-4.5 bg-[#5C2E1B] border border-[#7F56D9]"
          >
            Download PNG
          </button>
        </div>
      </div>

      {openQrUpdate && <QrUpdate />}
    </div>
  );
};

export default Qr;
