import axios from 'axios';
import React, { useEffect } from 'react'
import { authDataContext } from './AuthContext.jsx'

export const adminDataContext = React.createContext();
function AdminContext({ children }) {
    let [adminData, setAdminData] = React.useState("")
    let {serverUrl} = React.useContext(authDataContext)

    const getAdminData = async () => {
     try {
       let result = await axios.get(serverUrl + "/api/user/getadmin",{withCredentials:true})
      setAdminData(result.data)
      console.log(result.data);
      
     } catch (error) {
      setAdminData(null)
      console.error("Error fetching admin data:", error);
     }
    }
    let value = {adminData, setAdminData, getAdminData} 
    useEffect(() => {
      getAdminData()
    }, [serverUrl])

  return (
    <div>
      <adminDataContext.Provider value={value}>
        {children}
      </adminDataContext.Provider>
    </div>
  )
}

export default AdminContext
