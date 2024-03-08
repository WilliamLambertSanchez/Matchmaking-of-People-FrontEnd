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

const getActivity = async () => {
  const responseActivity = await axios.get(
    `${BASE_URL}/activities`,
    {
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('token')
      }
    }
  )
  return responseActivity.data
}

export default {
  createActivity,
  getActivity 
}