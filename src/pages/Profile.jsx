import axios from "axios"
import { useEffect, useState } from "react"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const Profiles = () => {
  const [users, searchUsers] = useState([])

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/users/users`)
        searchUsers(response.data)
        console.log('response : ', response.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
  
    getUsers();
  }, []);

  // Formating de date
const formatDate = (dateString) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
  return formattedDate;
};
  

  return (
    <>
      <h2>Configure your profile</h2>
        <div>This is the list of users : </div>
        {users.length > 0 ? (
          users.map(user => (
            <li key={user._id}>
              <p>{`Username : ${user.username}`}</p>
              <p>{`Rank : ${user.rank}`}</p>
              <p>{`Activities joined : ${user.activitiesJoined}`}</p>
              <p>{`Member since : ${formatDate(user.createdAt)}`}</p>
            </li>
          ))
        ) : (
      <div>Aucun utilisateur trouvé.</div>
      )}
    </>
  )
}
