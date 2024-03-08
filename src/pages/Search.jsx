import { useEffect, useState } from "react"
import activityApi from "../api/activityApi";
import Header from "../components/Header";

export const Search = () => {
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