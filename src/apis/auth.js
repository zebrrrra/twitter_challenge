import axios from 'axios';
const authURl = 'https://tranquil-basin-75437.herokuapp.com';
export const login = async ({ account, password }) => {
  try {
    const data = await axios.post(`${authURl}/api/users/login`, { account, password })
    return data
  } catch (err) {
    console.error('[Login Failed]:', err)
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