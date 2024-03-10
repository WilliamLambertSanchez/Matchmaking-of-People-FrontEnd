import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { TokenContext } from "../main"

const BASE_URL = import.meta.env.VITE_BASE_URL
// import { TokenContextProvider } from "../context/TokenContext"


export const SearchActivity = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const getActivity = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/activities`)
       setActivities(response.data)
        console.log('response : ', response.data)
      } catch (error) {
        console.error('Error fetching activity:', error)
        // Gérer l'erreur ici (affichage d'un message d'erreur, etc.)
      }
    }
  
    getActivity();
  }, []);
  

  return (
    <>
      <div>Estos son los activities : </div>
      {activities.length > 0 ? (
        activities.map(activity => (
          <div key={activity._id}>
            {activity.name}
          </div>
        ))
      ) : (
  <div>No users found.</div>
)}

      
    </>
  )
}