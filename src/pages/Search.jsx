import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import activityApi from "../api/activityApi";
import Header from "../components/Header";

export const Search = ({ token }) => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getActivity = async () => {
      try {
        const responseActivity = await activityApi.getActivities();
        console.log('response : ', responseActivity);
        setActivities(responseActivity);
      } catch (error) {
        console.error('Error fetching activity:', error);
      }
    };
    getActivity();
  }, []);



  const handleJoinActivity = async (activityId) => {
    
    try {
      const response = await activityApi.joinActivity(activityId, token);
      console.log('response:', response);

      // Update the activities state or perform additional actions
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity._id === activityId ? { ...activity, participants: response.participants } : activity
        )
      );

      // Fix the typo in the route
      navigate(`/activity/${activityId}`);

      console.log('Joined activity successfully');
    } catch (error) {
      console.error('Error joining activity:', error);
    }
  };

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
      <h2>Search and join activities</h2>

      <div>
        {activities && activities.length > 0 ? (
          activities.map((activity) => (
            <div className="box" key={activity._id}>
              <p>{`Name of activity : ${activity.name}`}</p>
              <p>{`Description of activity : ${activity.description}`}</p>
              <p>{`Date of activity : ${formatDate(activity.date)}`}</p>
              <p>{`Author of activity : ${activity.username}`}</p>
              <button onClick={() => handleJoinActivity(activity._id)}>Join</button>
              <Link to={`/activity/${activity._id}`}>
                <button>View Activity</button>
              </Link>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};
