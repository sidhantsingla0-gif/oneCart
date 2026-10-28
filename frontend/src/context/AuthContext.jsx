/* eslint-disable react-refresh/only-export-components */
import React, { createContext } from 'react'
export const authDataContext = createContext()
function AuthContext({children}) {
  const serverUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, '') ?? ''

  const value = {serverUrl}

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  )
}

export default AuthContext
