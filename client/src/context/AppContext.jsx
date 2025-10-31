import { createContext, useState } from "react";

export const AppContext = createContext({});


export const AppProvider = ({children}) => {
   const [createNew, setCreateNew] = useState(false);
  const [userDetails, setUserDetails] = useState({});


  const store = {
    createNew,
    setCreateNew,
    userDetails,
    setUserDetails
  }

  return <AppContext.Provider value={store} >{children}</AppContext.Provider>
}