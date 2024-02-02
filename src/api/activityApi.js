import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL


const createActivity = async (name, description, date, token) => {
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
        Authorization: token
      }
    }
  )
}

const getActivity = async () => {
  await axios.get(`${BASE_URL}/activities`)
}

export default {
  createActivity,
  getActivity 
}