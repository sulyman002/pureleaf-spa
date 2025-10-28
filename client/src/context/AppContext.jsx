import { createContext, useState } from "react";

export const AppContext = createContext({});


export const AppProvider = ({children}) => {
   const [createNew, setCreateNew] = useState(false);


  const store = {
    createNew,
    setCreateNew
  }

  return <AppContext.Provider value={store} >{children}</AppContext.Provider>
}