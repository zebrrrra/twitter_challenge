import axios from 'axios';
const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const login = async ({ account, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, { account, password })
    if (response.status === 200) {
      const { user } = response.data.data

      return { success: true, data: response.data, isUser: user.role === 'user' }
    }
  } catch (err) {
    console.error('[Login Failed]:', err)
    console.log(err.response)
    return { success: false, errInfo: err.response.data.message }
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

export const adminLogin = async ({ account, password }) => {

  try {
    const response = await axios.post(`${baseUrl}/admin/login`, { account, password })
    if (response.data.status === 'success') {
      const { user } = response.data

      return {
        success: true, data: response.data, isAdmin: user.role = 'admin'
      }
    }
  } catch (err) {
    console.log('login fail', err.response.data)
    return { success: false, errInfo: err.response.data.message }
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
