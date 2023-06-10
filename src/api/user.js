import axios from "axios"

const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const PutUserProfile = async ({ id, name, avatar, cover, introduction }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTA0LCJlbWFpbCI6ImFhQGFhLmNvbSIsIm5hbWUiOiJhYSIsImF2YXRhciI6bnVsbCwiaW50cm9kdWN0aW9uIjpudWxsLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJhYSIsImNvdmVyIjpudWxsLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDIyOjU4OjUyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDIyOjU4OjUyLjAwMFoiLCJpYXQiOjE2ODYzNTE3MjMsImV4cCI6MTY4ODk0MzcyM30.3s7QPLvH9CrpuohvEwEGmfkBapqf_ECov5hOz5jv4bo'
  try {
    const data = await axios.put(`${baseUrl}/users/${id}/profile`, {
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