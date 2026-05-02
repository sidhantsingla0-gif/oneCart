import axios from 'axios';
import React, { createContext, useState, useEffect, useContext } from 'react'
import { authDataContext } from './authContext.jsx';

export const userDataContext = createContext()
function UserContext({children}) {
    const [userData, setUserData] = useState(null)
    const { serverUrl } = useContext(authDataContext)

    const getCurrentUser = async () => {
        if (!serverUrl) return
        try {
            const result = await axios.get(serverUrl + '/api/user/getCurrentUser', { withCredentials: true })
            setUserData(result.data?.user ?? null)
            if (result.data?.user) console.log('User logged in:', result.data.user)
        } catch (error) {
            setUserData(null)
            // Silently handle 401 errors - user not authenticated yet
            if (error.response?.status === 401) return
            // Only log other errors
            console.error('User fetch error:', error.message)
        }
    }

    useEffect(() => {
        if (serverUrl) getCurrentUser()
    }, [serverUrl])

    const value = {
        userData,
        setUserData,
        getCurrentUser
    }

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext
