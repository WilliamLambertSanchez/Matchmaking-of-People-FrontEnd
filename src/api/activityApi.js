import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL


const createActivity = async (name, description, date) => {
  await axios.post(
    `${BASE_URL}/activities`,
    {   
      name,
      description,
      date
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.localStorage.getItem('token')
      }
    }
  )
}

const getActivities = async () => {
  const responseActivities = await axios.get(
    `${BASE_URL}/activities`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.localStorage.getItem('token')
      }
    }
  )
  return responseActivities.data
}

const getActivity = async (activityId) => {
  try {
    const responseActivity = await axios.get(
      `${BASE_URL}/activities/${activityId}`,
      {
      headers: {
        'Content-Type': 'application/json',
        Authorization: window.localStorage.getItem('token')
        }
      }
    )
    console.log('responseActivity:', responseActivity.data)
    return responseActivity.data
  } catch (error) {
    console.error(`Error fetching activity with ID ${activityId}:`, error);
    throw error; // You might want to handle this error in the component}
  }
}

const joinActivity = async (activityId) => {  
  try {
    const response = await axios.post(
      `${BASE_URL}/activities/${activityId}`,
      {
        activityId
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: window.localStorage.getItem('token')
        }
      }
    );

    // Log the request configuration
    console.log('Request Config:', response.config);

    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${activityId}:`, error);
    throw error;
  }
};


export default {
  createActivity,
  joinActivity,
  getActivities,
  getActivity 
}