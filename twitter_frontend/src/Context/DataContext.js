import { FC, createContext, useState } from "react";
import * as React from 'react'
export const DataContext = createContext(null);
const DataProvider = ({ children }) => {
  const [user, set_user] = React.useState()
  return (
    <DataContext.Provider value={{ user, set_user }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;


