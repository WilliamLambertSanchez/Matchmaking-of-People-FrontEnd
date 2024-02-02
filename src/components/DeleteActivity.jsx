import axios from "axios";
import { useState } from "react";

export const DeleteActivity = ({ token }) => {
  const [activityId, setActivityId] = useState('');

  const deleteActivity = async (e) => {
    e.preventDefault();

    try {
      const activityResponse = await axios.delete(
        `http://localhost:3000/activities/${activityId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );

      console.log("activityResponse: ", activityResponse);

      // Add any additional logic based on the response, e.g., show success message
    } catch (error) {
      console.error("Error deleting activity: ", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <>
      <h3>Delete an activity</h3>
      <form onSubmit={deleteActivity}>
        <label htmlFor="activityId">Activity ID</label>
        <input
          type="text"
          name="activityId"
          id="activityId"
          value={activityId}
          onChange={(e) => setActivityId(e.target.value)}
          placeholder="Activity ID"
        />

        <input type="submit" value="Delete" />

        {/* Add any UI elements based on the delete operation, e.g., success message */}
      </form>
    </>
  );
};
