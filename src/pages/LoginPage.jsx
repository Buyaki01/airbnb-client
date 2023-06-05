import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../UserContext"
import api from "../api/axios"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState('')
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    setErrMsg('');
  }, [email, password])

  async function handleLoginSubmit(e) {
    e.preventDefault()

    try {
      const response = await api('/login',
        JSON.stringify({ email, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )

      console.log(JSON.stringify(response?.data))
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken
      // setAuth({ email, password, accessToken })
      setUser(response.data)
      setEmail('');
      setPassword('');
      
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <p>{errMsg}</p>
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
