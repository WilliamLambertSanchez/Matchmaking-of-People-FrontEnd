import { useEffect, useState } from "react"
import activityApi from "../api/activityApi"
import Header from "../components/Header";

export const Home = () => {
  const [activities, setActivities] = useState([])


  useEffect(() => {
    const getActivity = async () => {
      try {
        const responseActivity = await activityApi.getActivity()
        console.log('response : ', responseActivity)
        setActivities(responseActivity)
      } catch (error) {
        console.error('Error fetching activity:', error)
      }
    }
    getActivity();
  }, []);

  const joinActivity = () => {
    
  }
  
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
    <Header />
    <h2>Explore the map and join activities</h2>

    <h3>*Integration of the map here*</h3>

    <ul>
      {activities && activities.length > 0 ? (
        activities.map(activity => (
          <li key={activity._id}>
            <p>{`Name of activity : ${activity.name}`}</p>
            <p>{`Description of activity : ${activity.description}`}</p>
            <p>{`Date of activity : ${formatDate(activity.date)}`}</p>
            <p>{`Author of activity : ${activity.username}`}</p>
            <p>{`Participants of activity : ${activity.participants}`}</p>
            <button onClick={() => joinActivity(activity._id)}>Join</button>
          </li>
        ))
        ) : (
        <div>Loading...</div>
      )}
    </ul>    
    </>
  )
}