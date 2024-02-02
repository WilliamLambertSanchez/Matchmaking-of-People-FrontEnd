import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL


const getUsers = async () => {
  await axios.get(`${BASE_URL}/users/users`)
}

const getUser = async () => {
  let { userId } = useParams();
  await axios.get(`${BASE_URL}/users/${userId}`)
}


export default {
  getUsers,
  getUser
}