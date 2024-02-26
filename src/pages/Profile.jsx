import { useEffect, useState } from "react"
import userApi from "../api/userApi"

export const Profiles = () => {
  const [users, setUsers] = useState([])



  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseUsers = await userApi.getUsers();
        console.log('responseUsers:', responseUsers);
        setUsers(responseUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getUsers();
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
      <h2>Configure your profile</h2>
        <div>This is the list of users : </div>
        {users && users.length > 0 ? (
          users.map(user => (
            <li key={user._id}>
              <p>{`Username : ${user.username}`}</p>
              <p>{`Rank : ${user.rank}`}</p>
              <p>{`Activities joined : ${user.activitiesJoined}`}</p>
              <p>{`Member since : ${formatDate(user.createdAt)}`}</p>
            </li>
          ))
        ) : (
      <div>Loading ...</div>
      )}
    </>
  )
}
