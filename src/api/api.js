import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_URL

const login = async (email, password) => {
  const loginResponse = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await loginResponse.json()
  return data
}

const register = async (username, email, password) => {
  const user = await axios.post(
    `${BASE_URL}/users/register`,
    {
      username,
      email,
      password
    }
  )
  return user
}



export default {
  login,
  register
}