import React from 'react'

export const authDataContext = React.createContext();
function AuthContext({children}) {
        let serverUrl = "https://onecart-backend-e8c4.onrender.com";
        let value = {serverUrl};

  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
