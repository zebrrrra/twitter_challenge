import axios from 'axios';
const baseUrl ='https://tranquil-basin-75437.herokuapp.com/api';

//POST /api/admin/login 管理者登入
//GET /api/admin/users 管理者可以看見所有的使用者 (包括 admin)



//DELETE /api/admin/tweets/:id 管理者可以刪除使用者的推文
export const deleteAdminUserTweets= async (id)=>{ 
    //const token = localStorage.getItem('token');
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJyb290QGV4YW1wbGUuY29tIiwibmFtZSI6InJvb3QiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz05IiwiaW50cm9kdWN0aW9uIjoibW9sZXN0aWFlIHZvbHVwdGF0ZW0gcXVpZGVtIHZlbCBsYWJvcnVtIiwicm9sZSI6ImFkbWluIiwiYWNjb3VudCI6InJvb3QiLCJjb3ZlciI6Imh0dHBzOi8vcGljc3VtLnBob3Rvcy9pZC85OS82NDAvNDgwIiwiY3JlYXRlZEF0IjoiMjAyMy0wNi0xM1QxNTowNjowNS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wNi0xM1QxNTowNjowNS4wMDBaIiwiaWF0IjoxNjg2NjcwNTI0LCJleHAiOjE2ODkyNjI1MjR9.msbUeNSLRLhAnFnnbijxwjgbFZnW5pAYu6xyu9jrYZs"
    try{
        const response = await axios.delete (`${baseUrl}/admin/tweets/${id}`,
        {headers: {
          Authorization: `Bearer ${token}`//測試用要刪掉
        }}
          );
        return response.data;
    } catch (error){
        console.error ('Error:Admin cannot delete tweet',error);
        return null;
    }  
};
