import axios from 'axios';
const authURl = 'https://tranquil-basin-75437.herokuapp.com';
export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURl}/api/users/login`, { account, password })
    return data
  } catch (err) {
    if (err.response) {
      return err.response.data;
    } else if (err.request) {

      return { status: "error", message: "No response received from server." };
    } else {
      // Something happened in setting up the request that triggered an Error
      return { status: "error", message: err.message };
    }
  }
};