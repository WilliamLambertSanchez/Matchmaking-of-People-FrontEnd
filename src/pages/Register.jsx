import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

export const Register = () => {

  const [username, setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();


  const onClickRegister = async (e) => {
    e.preventDefault();
    try {
      await api.register(username, email, password);
      navigate('/');
    } catch (e) {
      console.log('error', e);
    }
  };


  
  return (
    <>
      <div>Esta es la pagina de Register</div>
      <form onSubmit={onClickRegister}>
        <label htmlFor="username">Username</label>
        <input 
          type="username" 
          name="username" 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username"/>

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

        <input type="submit" value="register" />
      </form>
   </>
  )
}