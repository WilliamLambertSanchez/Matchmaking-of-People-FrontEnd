import axios from "axios"
import { useEffect, useState } from "react"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const SearchUser = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/users`)
        setUsers(response.data)
        console.log('response : ', response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
  
    getUsers();
  }, []);
  

  return (
    <>
      <div>Estos son los users : </div>
      {users.length > 0 ? (
        users.map(user => (
          <div key={user._id}>
            {user.name}
          </div>
        ))
      ) : (
  <div>Aucun utilisateur trouvé.</div>
  )}

      
    </>
  )
}