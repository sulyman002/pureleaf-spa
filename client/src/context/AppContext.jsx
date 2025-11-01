import { createContext, useState } from "react";

export const AppContext = createContext({});


export const AppProvider = ({children}) => {
   const [createNew, setCreateNew] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [loginDetails, setLoginDetails] = useState(null);


  const store = {
    createNew,
    setCreateNew,
    userDetails,
    setUserDetails,
    loginDetails,
    setLoginDetails
  }

  return <AppContext.Provider value={store} >{children}</AppContext.Provider>
}