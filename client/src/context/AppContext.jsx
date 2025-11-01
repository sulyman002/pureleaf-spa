import axios from "axios";
import { createContext, useState } from "react";

export const AppContext = createContext({});


export const AppProvider = ({children}) => {
   const [createNew, setCreateNew] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [loginDetails, setLoginDetails] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("idle");

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
    uploadProgress
    
  }

  return <AppContext.Provider value={store} >{children}</AppContext.Provider>
}