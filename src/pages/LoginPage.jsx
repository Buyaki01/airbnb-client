import React, { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import api from "../api/axios"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  async function handleLoginSubmit(e) {
    e.preventDefault()

    try {
      const response = await api.post(
        '/login',
        { email, password },
        { withCredentials: true }
      )
      setUser(response.data)

      if (response.data.accessToken) {
        localStorage.setItem("accessToken", response.data.accessToken)
        alert("Login successful")
        navigate("/")
      } else {
        alert("Login failed")
      }
    } catch (error) {
      console.log(error)
      alert("An error occurred during login")
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md max-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary mt-2"> Login </button>
          <div className="text-center mt-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              {" "}
              Register now{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
