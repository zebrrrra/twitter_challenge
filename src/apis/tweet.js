import axios from 'axios';

const baseUrl ='https://tranquil-basin-75437.herokuapp.com/api';


//POST /api/tweets 新增推文
export const postTweets= async (description)=>{ //新增推文內容
const token = localStorage.getItem('token');
//const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz03MiIsImludHJvZHVjdGlvbiI6InByYWVzZW50aXVtIHF1byBlbmltIGRvbG9yaWJ1cyBoaWMiLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJ1c2VyMSIsImNvdmVyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vNjQwLzQ4MC9jaXR5P2xvY2s9MzYiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJpYXQiOjE2ODYzMTQyNzMsImV4cCI6MTY4ODkwNjI3M30.NLl7ruyc2FBqWpnPv_Ixu_SMnA9lVS5QDyQdexrma70'
try{
    const response = await axios.post (`${baseUrl}/tweets`,{description},
    {headers: {
      Authorization: `Bearer ${token}`//測試用要刪掉
    }}
      );
    return response.data;
} catch (error){
    console.error ('Error:cannot post tweet',error);
    return null;
}
};
//GET /api/tweets 取得所有推文，包括推文作者

export const getAllTweets = async () => {
    //const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz03MiIsImludHJvZHVjdGlvbiI6InByYWVzZW50aXVtIHF1byBlbmltIGRvbG9yaWJ1cyBoaWMiLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJ1c2VyMSIsImNvdmVyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vNjQwLzQ4MC9jaXR5P2xvY2s9MzYiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJpYXQiOjE2ODYzMTQyNzMsImV4cCI6MTY4ODkwNjI3M30.NLl7ruyc2FBqWpnPv_Ixu_SMnA9lVS5QDyQdexrma70'
    const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${baseUrl}/tweets`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        return response.data;
      } catch (error) {
        console.error('Error:cannot get all tweets', error);
      }
    };
//GET /api/tweets/:tweetId 取得一筆推文

export const getATweet = async (tweetId) => {
  
  const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/tweets/${tweetId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error:cannot get a tweet', error);
    }
  };

//POST /api/tweets/:tweetId/replies 使用者在推文中新增一條回覆
export const postATweetReply= async (comment)=>{ //新增推文內容
  const token = localStorage.getItem('token');
  //const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz03MiIsImludHJvZHVjdGlvbiI6InByYWVzZW50aXVtIHF1byBlbmltIGRvbG9yaWJ1cyBoaWMiLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJ1c2VyMSIsImNvdmVyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vNjQwLzQ4MC9jaXR5P2xvY2s9MzYiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJpYXQiOjE2ODYzMTQyNzMsImV4cCI6MTY4ODkwNjI3M30.NLl7ruyc2FBqWpnPv_Ixu_SMnA9lVS5QDyQdexrma70'
  try{
      const response = await axios.post (`${baseUrl}/tweets/replies`,{comment},//要改
      {headers: {
        Authorization: `Bearer ${token}`//測試用要刪掉
      }}
        );
      return response.data;
  } catch (error){
      console.error ('Error:cannot post a tweet reply',error);
      return null;
  }
  };
//GET /api/tweets/:tweetId/replies 瀏覽推文下所有回覆
export const getATweetReply = async (tweetId) => {
  
  const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/tweets/${tweetId}/replies`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error:cannot get a tweet reply', error);
    }
  };
