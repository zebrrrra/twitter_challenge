import axios from 'axios';
const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const login = async ({ account, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, { account, password })
    return response
  } catch (err) {
    console.error('[Login Failed]:', err)
    return err
  }
}



export const PutUserProfile = async ({ id, name, avatar, cover, introduction }) => {
  const token = localStorage.getItem('token')
  console.log(token)
  try {

    const formData = new FormData();

    const response = await axios.put(`${baseUrl}/users/${id}/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response
  } catch (err) {
    console.log('error', err)
    return err
  }
}














// const login = async ({ account, password }) => {
//   try {
//     const data = await axios.post(`${authURL}/api/users/login`, { account, password })
//     return data
//   } catch (err) {
//     console.log('return with error')
//     return err
//   }
// }

// const LoginPage = async () => {
//   const account = 'user1'
//   const password = '12345678'

//   const data = await login({ account, password })

//   if (data.status === 200) {
//     console.log('success')
//     console.log(data.status)
//     console.log(data)
//   } else {
//     console.log('error')
//     console.log(data.response.status)
//     console.log(data.response.data)
//   }
// }

// LoginPage()