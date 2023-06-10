import axios from "axios"

const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const PutUserProfile = async ({ id, name, avatar, cover, introduction }) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTU0LCJlbWFpbCI6InZ2dkBleGFtcGxlLmNvbSIsIm5hbWUiOiJ2dnYiLCJhdmF0YXIiOm51bGwsImludHJvZHVjdGlvbiI6bnVsbCwicm9sZSI6InVzZXIiLCJhY2NvdW50IjoidnZ2IiwiY292ZXIiOm51bGwsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMTBUMDY6NTE6NTcuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMTBUMDY6NTE6NTcuMDAwWiIsImlhdCI6MTY4NjM3OTk0NSwiZXhwIjoxNjg4OTcxOTQ1fQ.Fj81MQ2jhW5BgRRBm2werjIDkMw2nrHj1OIH9QLpEZY'
  try {
    const data = await axios.put(`${baseUrl}/users/${id}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }, mimeType: 'multipart/form-data'
    })
    return data
  } catch (err) {
    console.log('error', err)
    return err
  }
}
// axios({
//   method: 'POST',
//   url: 'https://api.imgur.com/3/image',
//   data: formData,
//   headers: {
//     Authorization: "Client-ID " + {{ apiKey }} //放置你剛剛申請的Client-ID
//    },
//   mimeType: 'multipart/form-data'
//    })