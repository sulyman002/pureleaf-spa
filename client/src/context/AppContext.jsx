// import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "sonner";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [createNew, setCreateNew] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [loginDetails, setLoginDetails] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [selectedDeleteData, setSelectedDeleteData] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

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
    setOpenDeleteModal(!openDeleteModal);
  };

  const handleToggleEditModal = () => {
    setOpenEditModal(!openEditModal);
    console.log("you clicked this sulyman");
    console.log(openEditModal);
    
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
    setSelectedDeleteData,
    selectedDeleteData,
    setOpenDeleteModal,
    openDeleteModal,
    handleToggleDeleteModal,
    handleToggleEditModal
  };

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>;
};
