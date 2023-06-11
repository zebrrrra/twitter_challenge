import axios from 'axios';

const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const PutUserSetting = async ({ id }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTM0LCJlbWFpbCI6Im9vQG9vLmNvbSIsIm5hbWUiOiJvbyIsImF2YXRhciI6Imh0dHBzOi8vaS5pbWd1ci5jb20vUGlKMEhYdy5wbmciLCJpbnRyb2R1Y3Rpb24iOm51bGwsInJvbGUiOiJ1c2VyIiwiYWNjb3VudCI6Im9vIiwiY292ZXIiOiJodHRwczovL2kuaW1ndXIuY29tL0VubDd0SjEuanBnIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xMFQxMToxMDo1My4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xMFQxMToxMDo1My4wMDBaIiwiaWF0IjoxNjg2Mzk1NDY3LCJleHAiOjE2ODg5ODc0Njd9.UYAiXysMxvWXswvfbb55hEcTeS0CueRCYaSOdKlS9lw'
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


