import axios from 'axios';

const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const PutUserSetting = async ({ id }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA0LCJlbWFpbCI6ImFhQGFhLmNvbSIsIm5hbWUiOiJhYSIsImF2YXRhciI6bnVsbCwiaW50cm9kdWN0aW9uIjpudWxsLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJhYSIsImNvdmVyIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDIyOjU4OjUyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDIyOjU4OjUyLjAwMFoiLCJpYXQiOjE2ODYzNTE3MjMsImV4cCI6MTY4ODk0MzcyM30.3s7QPLvH9CrpuohvEwEGmfkBapqf_ECov5hOz5jv4bo'
  try {
    const response = await axios.put(`${baseUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.data.status === 'success')
      return { success: true, message: response.data.message }

  } catch (err) {
    console.log('error', err.response.data)
    return { success: false, errInfo: err.response.data.message }
  }
}



