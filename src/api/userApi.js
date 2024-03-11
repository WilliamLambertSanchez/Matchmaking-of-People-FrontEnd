import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL


const getUsers = async () => {
  const responseUsers = await axios.get(
    `${BASE_URL}/users`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.localStorage.getItem('token')
      }
    }
  )
  return responseUsers.data
}

const getUserHeader = async () => {
  const responseUsers = await axios.get(
    `${BASE_URL}/users/get/getUserHeader`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.localStorage.getItem('token')
      }
    }
  )
  return responseUsers.data
}


const getUser = async (userId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/${userId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: window.localStorage.getItem('token')
        }
      }
    );
    console.log('response:', response.data);
    return response.data; // Assuming the user data is available in response.data
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error; // You might want to handle this error in the component
  }
};

const getUserByUsername = async (username) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/username/${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: window.localStorage.getItem('token'),
        },
      }
    );
    console.log('response:', response.data);
    return response.data; // Assuming the user data is available in response.data
  } catch (error) {
    console.error(`Error fetching user with username ${username}:`, error);
    throw error; // You might want to handle this error in the component
  }
};

export default {
  getUsers,
  getUserHeader,
  getUser,
  getUserByUsername
}