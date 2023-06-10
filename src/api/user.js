import axios from 'axios';

const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const PutUserSetting = async ({ id }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA0LCJlbWFpbCI6ImFhQGFhLmNvbSIsIm5hbWUiOiJhYSIsImF2YXRhciI6bnVsbCwiaW50cm9kdWN0aW9uIjpudWxsLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJhYSIsImNvdmVyIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDIyOjU4OjUyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDIyOjU4OjUyLjAwMFoiLCJpYXQiOjE2ODYzNTE3MjMsImV4cCI6MTY4ODk0MzcyM30.3s7QPLvH9CrpuohvEwEGmfkBapqf_ECov5hOz5jv4bo'
  try {
    const data = await axios.put(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return data

  } catch (err) {
    console.log('error', err)
    return err
  }
}




// lu supply

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



