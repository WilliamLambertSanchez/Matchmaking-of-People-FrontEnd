import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

export const Login = ({ setToken }) => {
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();


   const login = async (e) => {
    e.preventDefault()
    try {
      const loginData = await api.login(email, password)
      setToken(loginData.token)
      navigate('/home')
      console.log('setToken : ', setToken)
    } catch (err) {
      console.log(err)
    }
  }

  
  return (
    <>
      <div>Esta es la pagina de Login</div>
      <form onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email"/>

        <label htmlFor="password">Password</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password"/>

        <input type="submit" value="Login" />
      </form>

      {/* <div>Don't have an account? <Link to="/register">Register</Link></div> */}

    </>

  )
}
