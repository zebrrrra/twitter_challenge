import axios from 'axios';

const baseUrl ='https://tranquil-basin-75437.herokuapp.com/api';



//POST /api/users/login 使用者號登入 

//POST /api/users 註冊自己的帳號
//GET /api/users/:id 取得某一位user的資料
export const getUsers = async (id) => {
  const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz02MCIsImludHJvZHVjdGlvbiI6ImN1bXF1ZSBhbGlxdWlkIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZW0gZG9sb3JlbSIsInJvbGUiOiJ1c2VyIiwiYWNjb3VudCI6InVzZXIxIiwiY292ZXIiOiJodHRwczovL2xvcmVtZmxpY2tyLmNvbS82NDAvNDgwL2NpdHk_bG9jaz04NiIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMDhUMDQ6MDI6MDUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMDhUMDQ6MDI6MDUuMDAwWiIsImlhdCI6MTY4NjE5Njk4MSwiZXhwIjoxNjg4Nzg4OTgxfQ.GryYu_MJDyISah8Xe7zLcQrAm1Y_rcTNtFKMY3NAS4E'
  //const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error:cannot get user', error);
    }
  };
//GET /api/users/:id/tweets 看見某使用者發過的推文
export const getUserTweets = async (id) => {
  const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz02MCIsImludHJvZHVjdGlvbiI6ImN1bXF1ZSBhbGlxdWlkIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZW0gZG9sb3JlbSIsInJvbGUiOiJ1c2VyIiwiYWNjb3VudCI6InVzZXIxIiwiY292ZXIiOiJodHRwczovL2xvcmVtZmxpY2tyLmNvbS82NDAvNDgwL2NpdHk_bG9jaz04NiIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMDhUMDQ6MDI6MDUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMDhUMDQ6MDI6MDUuMDAwWiIsImlhdCI6MTY4NjE5Njk4MSwiZXhwIjoxNjg4Nzg4OTgxfQ.GryYu_MJDyISah8Xe7zLcQrAm1Y_rcTNtFKMY3NAS4E'  
  //const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/users/${id}/tweets`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error:cannot get user tweet', error);
    }
  };

//GET /api/users/:id/replied_tweets 看見某使用者發過回覆的推文
export const getUserRepliedTweets = async (id) => {
  const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz02MCIsImludHJvZHVjdGlvbiI6ImN1bXF1ZSBhbGlxdWlkIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZW0gZG9sb3JlbSIsInJvbGUiOiJ1c2VyIiwiYWNjb3VudCI6InVzZXIxIiwiY292ZXIiOiJodHRwczovL2xvcmVtZmxpY2tyLmNvbS82NDAvNDgwL2NpdHk_bG9jaz04NiIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMDhUMDQ6MDI6MDUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMDhUMDQ6MDI6MDUuMDAwWiIsImlhdCI6MTY4NjE5Njk4MSwiZXhwIjoxNjg4Nzg4OTgxfQ.GryYu_MJDyISah8Xe7zLcQrAm1Y_rcTNtFKMY3NAS4E'  
  //const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/users/${id}/replied_tweets`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error:cannot get user replied tweet', error);
    }
  };

//GET /api/users/:id/likes 看見某使用者點過的 Like
export const getUserLike = async (id) => {
  const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz02MCIsImludHJvZHVjdGlvbiI6ImN1bXF1ZSBhbGlxdWlkIGNvbnNlcXVhdHVyIHZvbHVwdGF0ZW0gZG9sb3JlbSIsInJvbGUiOiJ1c2VyIiwiYWNjb3VudCI6InVzZXIxIiwiY292ZXIiOiJodHRwczovL2xvcmVtZmxpY2tyLmNvbS82NDAvNDgwL2NpdHk_bG9jaz04NiIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMDhUMDQ6MDI6MDUuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMDhUMDQ6MDI6MDUuMDAwWiIsImlhdCI6MTY4NjE5Njk4MSwiZXhwIjoxNjg4Nzg4OTgxfQ.GryYu_MJDyISah8Xe7zLcQrAm1Y_rcTNtFKMY3NAS4E'  
  // token = localStorage.getItem('token');
    try {
      const response = await axios.get(`${baseUrl}/users/${id}/likes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error:cannot get user likes', error);
    }
  };
//GET /api/users/:id/followings 看見某使用者所有跟隨中的人
//GET /api/users/:id/followers 看見某使用者的所有跟隨者
//PUT /api/users/:id 編輯自己setting頁的資料 ( name, introduction, account, eamil, password )
//PUT /api/users/:id/profile 編輯自己Profile頁的資料 ( name, introduction, avatar, cover )
//GET /api/users/topFollowers 回傳 10 位最多followers的user


//先寫來測試
//getUsers(4);
//getUserLike(2);
//getUserTweets(14);
//getUserRepliedTweets(14);
