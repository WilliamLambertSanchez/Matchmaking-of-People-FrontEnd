import axios from "axios"
import { useEffect, useState } from "react"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const Home = () => {
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
    <h2>Explore the map and join activities</h2>

    <h3>*Integration of the map here*</h3>

    <div>This is the list of activities : </div>
      {activities.length > 0 ? (
        activities.map(activity => (
          <div key={activity._id}>
            {activity.name}
            {activity.description}
            {activity.date}
          </div>
        ))
      ) : (
      <div>No activities found.</div>
      )}     
    </>
  )
}