import axios from "axios"
import { createContext, useEffect, useState } from "react"
import baseURL from "./config/ApiConfig"

export const UserContext = createContext({})

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const token = localStorage.getItem("token")
          if (!token) {
            setLoading(true)
            return
          }

          const response = await axios.get(`${baseURL}/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          setUser(response.data)
          setLoading(true)
        } catch (error) {
          console.log(error)
          setLoading(true)
        }
      }
    };

    fetchUser()
  }, [user])

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  )
}
