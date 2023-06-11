import axios from 'axios';
const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const login = async ({ account, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, { account, password })
    if (response.status === 200) {
      return { success: true, data: response.data }
    }
  } catch (err) {
    console.error('[Login Failed]:', err)
    // 硬寫message，等後端修好
    return { success: false, message: '帳號不存在!' }
  }
}

export const register = async ({ account, name, password, email, checkPassword }) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, { account, name, password, email, checkPassword })
    // 先測試抓後端status
    if (response.data.status === 'success') {
      return { success: true, data: response.data }
    } else {
      return { success: false, errinfo: response.data.message };
    }
  } catch (err) {
    console.error('[Register Failed]:', err)
    return {
      success: false, errinfo: err.message
    }
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


// 抓200
    //   if (response.status === 200) {
    //     return { success: true, data: response.data }
    //   } else {
    //     return { success: false, errinfo: response.data.message }
    //   }
