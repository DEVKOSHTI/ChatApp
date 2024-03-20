import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react'

const LoginContext = createContext()

const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const fetchUser = async () => {
        const uid = await AsyncStorage.getItem('UID');
        if (uid != null) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </LoginContext.Provider>
    )
}

export const useLogin = () => useContext(LoginContext)

export default LoginProvider;