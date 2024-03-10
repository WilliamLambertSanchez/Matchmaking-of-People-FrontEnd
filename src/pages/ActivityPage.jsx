import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import activityApi from "../api/activityApi";
import Header from "../components/Header";
import userApi from "../api/userApi";

export const ActivityPage = () => {
  const { activityId } = useParams();
  const [activity, setActivity] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const responseActivity = await activityApi.getActivity(activityId);
        setActivity(responseActivity);

        // Fetch details of participants of the activity
        const usersDetails = await Promise.all(
          responseActivity.participants.map(async (userId) => {
            try {
              const user = await userApi.getUser(userId);
              return user;
            } catch (userError) {
              console.error(`Error fetching user with ID ${userId}:`, userError);
              return null;
            }
          })
        );

        setUsers(usersDetails);

      } catch (error) {
        console.error(`Error fetching activity with ID ${activityId}:`, error);
      }
    };

    fetchActivity();
  }, [activityId]);

  if (!activity) {
    return (
      <>
      <Header />
      <div>Loading...</div>
      </>
    )
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
        <h2>Activity Details</h2>
        {users.find}

        <p>{`Author of activity : `}
        <Link to={`/u/${activity.username}`}>
          {activity.username}
        </Link>
      </p>
        <p>{`Activity Name: ${activity.name}`}</p>
        <p>{`Description: ${activity.description}`}</p>
        <p>{`Created at: ${formatDate(activity.createdAt)}`}</p>
        <div className="list">
          {`Participants : `}
          {users.map((user) => (
            <Link key={user?._id} to={`/user/${user?._id}`}>
              {user ? user.username : 'Participants Loading...'}
            </Link>
          ))}
        </div>
    </>
  );
};
