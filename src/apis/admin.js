import axios from 'axios';
const baseUrl = 'https://twitter-ac-team-d93c31406834.herokuapp.com/api';

//POST /api/admin/login 管理者登入
//GET /api/admin/users 管理者可以看見所有的使用者 (包括 admin)
export const getAdminUsers = async (id) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJyb290QGV4YW1wbGUuY29tIiwibmFtZSI6InJvb3QiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz01NCIsImludHJvZHVjdGlvbiI6ImxhYm9yaW9zYW0gY29uc2VxdWF0dXIgb3B0aW8gYXNwZXJuYXR1ciBuZWNlc3NpdGF0aWJ1cyIsInJvbGUiOiJhZG1pbiIsImFjY291bnQiOiJyb290IiwiY292ZXIiOiJodHRwczovL3BpY3N1bS5waG90b3MvaWQvNzUvNjQwLzQ4MCIsImNyZWF0ZWRBdCI6IjIwMjMtMDYtMTRUMDE6MzE6MTQuMDAwWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDYtMTRUMDE6MzE6MTQuMDAwWiIsImlhdCI6MTY4Njc1Nzg4MiwiZXhwIjoxNjg5MzQ5ODgyfQ.ha911_tfpRAaL3FS7CcjMucDbLz84_03pgX7s0ehNb4'
  //const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${baseUrl}/admin/usersdata`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:cannot get user', error);
  }
};

//GET /api/admin/tweets 管理者可以看見所有推文
export const getAdminAllTweets = async () => {

  //const token = localStorage.getItem('token');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJyb290QGV4YW1wbGUuY29tIiwibmFtZSI6InJvb3QiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz05IiwiaW50cm9kdWN0aW9uIjoibW9sZXN0aWFlIHZvbHVwdGF0ZW0gcXVpZGVtIHZlbCBsYWJvcnVtIiwicm9sZSI6ImFkbWluIiwiYWNjb3VudCI6InJvb3QiLCJjb3ZlciI6Imh0dHBzOi8vcGljc3VtLnBob3Rvcy9pZC85OS82NDAvNDgwIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xM1QxNTowNjowNS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xM1QxNTowNjowNS4wMDBaIiwiaWF0IjoxNjg2NjcwNTI0LCJleHAiOjE2ODkyNjI1MjR9.msbUeNSLRLhAnFnnbijxwjgbFZnW5pAYu6xyu9jrYZs"
  try {
    const response = await axios.get(`${baseUrl}/admin/tweets`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:cannot get admin all tweets', error);
  }
};


//DELETE /api/admin/tweets/:id 管理者可以刪除使用者的推文
export const deleteAdminUserTweets = async (id) => {
  //const token = localStorage.getItem('token');
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJyb290QGV4YW1wbGUuY29tIiwibmFtZSI6InJvb3QiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz05IiwiaW50cm9kdWN0aW9uIjoibW9sZXN0aWFlIHZvbHVwdGF0ZW0gcXVpZGVtIHZlbCBsYWJvcnVtIiwicm9sZSI6ImFkbWluIiwiYWNjb3VudCI6InJvb3QiLCJjb3ZlciI6Imh0dHBzOi8vcGljc3VtLnBob3Rvcy9pZC85OS82NDAvNDgwIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xM1QxNTowNjowNS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xM1QxNTowNjowNS4wMDBaIiwiaWF0IjoxNjg2NjcwNTI0LCJleHAiOjE2ODkyNjI1MjR9.msbUeNSLRLhAnFnnbijxwjgbFZnW5pAYu6xyu9jrYZs"
  try {
    const response = await axios.delete(`${baseUrl}/admin/tweets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`//測試用要刪掉
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error:Admin cannot delete tweet', error);
    return null;
  }
};
