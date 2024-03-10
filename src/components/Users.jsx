import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assurez-vous que Link est importé depuis "react-router-dom"
import userApi from "../api/userApi";
import Header from "./Header";

export const Users = () => {
  const [users, setUsers] = useState([]);

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
    <Header />
      <h2>This is the list of users :</h2>
      {users && users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user._id}>
              <Link to={`/user/${user._id}`}>
                <p>{`${user.username}`}</p>
              </Link>
              <p>{`Rank : ${user.rank}`}</p>
              <p>{`Member since : ${formatDate(user.createdAt)}`}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
};
