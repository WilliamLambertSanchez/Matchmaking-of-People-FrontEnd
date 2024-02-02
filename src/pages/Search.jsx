import axios from "axios"
import { useEffect, useState } from "react"

const BASE_URL = import.meta.env.VITE_BASE_URL

export const Search = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const getActivity = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/activities`)
       setActivities(response.data)
        console.log('response : ', response.data)
      } catch (error) {
        console.error('Error fetching activity:', error)
      }
    }
  
    getActivity();
  }, []);

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
      <h2>Search activities</h2>

      <div>This is the list of activities : </div>
      {activities.length > 0 ? (
        activities.map(activity => (
          <li key={activity._id}>
            <p>{`Name of activity : ${activity.name}`}</p>
            <p>{`Description of activity : ${activity.description}`}</p>
            <p>{`Date of activity : ${formatDate(activity.date)}`}</p>
          </li>
        ))
      ) : (
      <div>No activities found.</div>
      )}     
    </>
  )
}