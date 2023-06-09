import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import baseURL from "../config/ApiConfig"

const RegisterPage = () => {
  const [name, setName] = useState('') 
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  async function registerUser (e) {
    e.preventDefault()
    try{
      await axios.post(`${baseURL}/register`, {
        name,
        email,
        password
      })
      alert('Registration successful. Now you can log in')
      navigate("/login")
    } catch(e) {
      alert('Registration failed. Please try again later')
    }
  }

  return(
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md max-auto" onSubmit={registerUser}>
          <input type="text" placeholder="John Doe" value={name} onChange={ e => setName(e.target.value) } />
          <input type="email" placeholder="your@email.com" value={email} onChange={ e => setEmail(e.target.value) } />
          <input type="password" placeholder="password" value={password} onChange={ e => setPassword(e.target.value) } />
          <button className="primary mt-2"> Register </button>
          <div className="text-center mt-2 text-gray-500">
            Have an account? <Link className="underline text-black" to={'/login'}> Login </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage
