import { useContext, useState } from "react"
import { UserContext } from "../UserContext"
import { Navigate} from "react-router-dom"
import api from "../api/axios"

const ProfilePage = () => {
  const {loading, user, setUser} = useContext(UserContext)
  
  const [redirect, setRedirect] = useState(null)

  const logout = async () => {
    await api.post('/logout')
    setRedirect('/')
    setUser(null)
  }

  if (!loading) {
    return 'Loading...'
  }

  if (loading && !user && !redirect ) {
    return <Navigate to={'/login'} />
  }

  if (redirect) {
    return <Navigate to={redirect} /> 
  }

  return(
    <div> 
      <div className="text-center">
        <h5>Logged in as { user.name }</h5> 
        <button onClick={logout} className="primary max-w-sm mt-3"> Logout </button>
      </div>
    </div>
  )
}

export default ProfilePage
