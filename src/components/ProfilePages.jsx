import { useEffect } from "react";
import { useParams } from "react-router-dom";
import userApi from "../api/userApi"

export const ProfilePage = () => {
  // Get the userId param from the URL.
  let { userId } = useParams();

  useEffect(() => {
    // Use the userId to fetch user data or perform any necessary actions.
    // For example, you can make an API call to get user information based on userId.
    // Here is a placeholder for the fetchUser function (you need to implement this):
    const ProfilePage = async () => {
      try {
        // Make an API call to get user data based on userId.
        const response = await userApi.getUser
        const userData = await response.json();
        console.log(userData);

        // Replace the above fetch logic with your actual implementation.
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Call the fetchUser function when the component mounts.
    fetchUser();
  }, [userId]); // Add userId to the dependency array to re-run the effect when it changes.

  return (
    <>
      <h2>User Profile</h2>
      {userdata.length > 0 ? (
        user.map(user => (
          <li key={user._id}>
            <p>{`Name : ${user.username}`}</p>
            <p>{`Rank : ${user.rank}`}</p>
            <p>{`Activities joined : ${user.activitiesJoined}`}</p>
            <p>{`Outwarder since : ${formatDate(user.createdAt)}`}</p>
          </li>
        ))
      ) : (
  <div>Aucun utilisateur trouvé.</div>
  )}
      {/* Display user profile information here */}
    </>
  );
}
