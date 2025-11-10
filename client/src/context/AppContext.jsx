// import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "sonner";
import QRCode from "qrcode";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [createNew, setCreateNew] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [loginDetails, setLoginDetails] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [data, setData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openQr, setOpenQr] = useState(false);
  const [qr, setQr] = useState("");
  const [loading, setLoading] = useState(false);
  const [openQrUpdate, setOpenQrUpdate] = useState(false);

  const uploadToServer = async (file) => {
    if (!file) return;
    setUploadStatus("uploading");

    for (let i = 0; i <= 100; i += 5) {
      await new Promise((r) => setTimeout(r, 150));
      setUploadProgress(i);
    }

    setUploadStatus("completed");
  };

  //   const uploadToServer = async (file) => {
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     try {
  //         setUploadStatus("uploading");
  //         await axios.post("https://api.example.com/upload", formData, {
  //             headers: {
  //                 "Content-Type": "multipart/form-data"
  //             },
  //             onUploadProgress: (progressEvent) => {
  //                 const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
  //                 setUploadProgress(percentCompleted);
  //              },
  //         });
  //         setUploadStatus("completed");
  //     } catch (error) {
  //         console.error("Upload failed:", error);
  //         setUploadStatus("failed");
  //     }
  //   }

  const handleOpenQr = () => {
    setOpenQr(!openQr);
  };

  const handleOpenQrUpdate = () => {
    setOpenQrUpdate((prev) => !prev);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isPDF = file.type === "application/pdf";

    if (isPDF) {
      setUploadFile(file);
      uploadToServer(file);
    } else {
      toast.error("Please upload a valid PDF file.");
    }
  };

  const handleToggleDeleteModal = () => {
    setOpenDeleteModal((prev) => !prev);
  };

  const handleOpenEdit = () => {
    setEdit((prev) => !prev);
    console.log("you clicked this sulyman");
    console.log(edit);
  };

  const convertToQrcode = async (qrData) => {
    setLoading(true);
    setQr("");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const imageUrl = qrData?.imageUrl || qrData;

    try {
      const qrCodeData = await QRCode.toDataURL(imageUrl);
      setQr(qrCodeData);
    } catch (error) {
      console.log("Error generating QR:", error);
      toast.error("Error generating QR");
    }

    setLoading(false);
  };

  const handleCopy = async (qrData) => {
    const imageUrl = qrData?.imageUrl || qrData;
    try {
      await navigator.clipboard.writeText(imageUrl);
      console.log("Copied!");
    } catch (err) {
      console.log("Failed to copy", err);
    }
  };

  const store = {
    createNew,
    setCreateNew,
    userDetails,
    setUserDetails,
    loginDetails,
    setLoginDetails,
    setUploadFile,
    uploadFile,
    uploadToServer,
    setUploadStatus,
    uploadStatus,
    setUploadProgress,
    uploadProgress,
    handleFileUpload,
    setData,
    data,
    setOpenDeleteModal,
    openDeleteModal,
    handleToggleDeleteModal,
    handleOpenEdit,
    edit,
    handleOpenQr,
    openQr,
    setQr,
    setLoading,
    qr,
    loading,
    convertToQrcode,
    handleOpenQrUpdate,
    openQrUpdate,
    handleCopy,
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
