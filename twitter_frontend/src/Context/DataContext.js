import { createContext } from "react";
import * as React from 'react'
export const DataContext = createContext(null);
const DataProvider = ({ children }) => {
  const [user, set_user] = React.useState()
  const [post_list, set_post_list] = React.useState([])
  const [new_posts, set_new_posts] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  return (
    <DataContext.Provider value={{ user, set_user, loading, setLoading, post_list, set_post_list, new_posts, set_new_posts }}>
      {children}
    </DataContext.Provider>
  );
}

export default DataProvider;


