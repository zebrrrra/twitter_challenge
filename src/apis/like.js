import axios from 'axios';

const baseUrl ='https://tranquil-basin-75437.herokuapp.com/api';

// POST/api/tweets/:tweedId/like 使用者喜歡一則推文

export const likeTweets= async (description)=>{ //新增推文內容
    const token = localStorage.getItem('token');
    //const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz03MiIsImludHJvZHVjdGlvbiI6InByYWVzZW50aXVtIHF1byBlbmltIGRvbG9yaWJ1cyBoaWMiLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJ1c2VyMSIsImNvdmVyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vNjQwLzQ4MC9jaXR5P2xvY2s9MzYiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJpYXQiOjE2ODYzMTQyNzMsImV4cCI6MTY4ODkwNjI3M30.NLl7ruyc2FBqWpnPv_Ixu_SMnA9lVS5QDyQdexrma70'
    try{
        const response = await axios.post (`${baseUrl}/like`,{description},
        //{headers: {
          //Authorization: `Bearer ${token}`//測試用要刪掉}}
          );
        return response.data;
    } catch (error){
        console.error ('Error:cannot post like',error);
        return null;
    }
    };
//DELETE /api/tweets/:tweedId/unlike 使用者取消喜歡推文

