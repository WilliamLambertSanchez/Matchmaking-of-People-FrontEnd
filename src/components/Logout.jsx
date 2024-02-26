import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export const Logout = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.localStorage.removeItem('token')
    navigate('/')
    window.location.reload();
  }, [])
  

  return (
    <>
      <div>Cerrando session</div>
    </>
    )
}

