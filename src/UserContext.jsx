import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export const UserContextProvider = ({children}) => {
  const [user,setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        const response = await axios.get('/profile')
        setUser(response.data)
        setLoading(true)
      }
    }
    fetchUser()
  }, [])
  return(
    <UserContext.Provider value={{user, setUser, loading}}>
      {children}
    </UserContext.Provider>
  )
}
