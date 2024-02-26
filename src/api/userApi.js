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


const getUser = async () => {
  let { userId } = useParams();
  await axios.get(`${BASE_URL}/users/${userId}`)
}


export default {
  getUsers,
  getUser
}