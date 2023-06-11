import axios from 'axios';
const authURl = 'https://tranquil-basin-75437.herokuapp.com';
export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURl}/api/users/login`, { account, password })
    return data
  } catch (err) {
    console.error('[Login Failed]:', err)
  }

}