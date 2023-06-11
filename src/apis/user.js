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

    if (response.data.status === 'success') {
      return { success: true, message: response.data.message }
    }
  } catch (err) {
    console.log('err.response.data', err.response.data)
    return {
      success: false, errInfo: err.response.data.message
    }
  }
}


export const putUserSetting = async ({ id }) => {
  const token = localStorage.getItem('token')
  console.log(token)
  try {
    const response = await axios.put(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.data.status === 'success') {
      return { success: true, message: response.data.message }
    }

  } catch (err) {
    console.log('error', err.response.data)
    return { success: false, errInfo: err.response.data.message }
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
