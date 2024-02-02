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
    <h2>Explore the map and join activities</h2>

    <h3>*Integration of the map here*</h3>

    <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            <p>{`Name of activity : ${activity.name}`}</p>
            <p>{`Description of activity : ${activity.description}`}</p>
            <p>{`Date of activity : ${formatDate(activity.date)}`}</p>
            <button onClick={() => deleteActivity(activity._id)}>Delete</button>
            <button onClick={() => updateMode(activity._id, activity.name, activity.description, activity.date)}>
              Update
            </button>
          </li>
        ))}
      </ul>    
    </>
  )
}