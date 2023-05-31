import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import axios from "axios"
import { UserContext } from "../UserContext"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  async function handleLoginSubmit(e) {
    e.preventDefault()
    try {
      const response = await axios.post("/login", { email, password })
      setUser(response.data);
      alert("Login successful");

      const token = response.data.token
      localStorage.setItem("token", token)

      navigate("/")
    } catch (e) {
      alert("Login failed")
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
  );
};

export default LoginPage;
