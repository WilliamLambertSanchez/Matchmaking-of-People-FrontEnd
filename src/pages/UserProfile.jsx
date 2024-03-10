import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import userApi from "../api/userApi";
import activityApi from "../api/activityApi";
import Header from "../components/Header";

export const UserProfile = () => {
  const { userId } = useParams();
  
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseUser = await userApi.getUser(userId);
        setUser(responseUser);

        // Fetch details of activities joined by the user
        const activityDetails = await Promise.all(
          responseUser.activitiesJoined.map(async (activityId) => {
            try {
              const activity = await activityApi.getActivity(activityId);
              return activity;
            } catch (activityError) {
              console.error(`Error fetching activity with ID ${activityId}:`, activityError);
              return null;
            }
          })
        );

        setActivities(activityDetails);
      } catch (error) {
        console.error(`Error fetching user data with ID ${userId}:`, error);
      }
    };

    fetchUser();
  }, [userId]);

  // Check if user is null before trying to access its properties
  if (!user) {
    return <div>Loading...</div>;
  }

  // Formating the date
  const formatDate = (dateString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };

  return (
    <>
      <Header />
      <div className="backgroundUsers"> 
      <h2>User Profile</h2>
      <p>{`Name : ${user.username}`}</p>
      <p>{`Rank : ${user.rank}`}</p>
      <p>{`Member since : ${formatDate(user.createdAt)}`}</p>
      <div className="list">
        {`Activities joined : `}
        {activities.map((activity) => (
          <Link key={activity?._id} to={`/activity/${activity?._id}`}>
            {activity ? activity.name : 'Activity Name Loading...'}
          </Link>
        ))}
      </div>
      </div>
    </>
  );
};
