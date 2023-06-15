import axios from 'axios';
const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/users/login`, { account, password })
    return data
  } catch (err) {
    console.error('[Login Failed]:', err)
    console.log(err.response)
    return { status: false, errInfo: err.response.data.message }
  }
}

// api接本地的寫法
// export const register = async ({ account, name, password, email, checkPassword }) => {
//   try {
//     const response = await axios.post(`${baseUrl}/users`, { account, name, password, email, checkPassword })

//     if (response.data.status === 'success') {
//       return { success: true, message: response.data.message }
//     }
//   } catch (err) {
//     console.log('err.response.data', err.response.data)
//     return {
//       success: false, errorInfo: err.response.data.message
//     }
//   }
// }

// 放公共
export const register = async ({ account, name, password, email, checkPassword }) => {
  try {
    const { data } = await axios.post(`${baseUrl}/users`, { account, name, password, email, checkPassword })
    // console.log(data)
    return data
    // if (response.data.status === 'success') {
    //   return { success: true, message: response.data.message }
    // }
  } catch (err) {
    console.log('err.response.data', err.response.data)
    return {
      status: false, errorInfo: err.response.data.message
    }
  }
}


export const adminLogin = async ({ account, password }) => {

  try {
    const { data } = await axios.post(`${baseUrl}/admin/login`, { account, password })

    return data
    // 若要加上身份篩選data.data.user.role取得字串搭配{data}

  } catch (err) {
    console.log('error message:', err.response.data.message)
    console.log('error status:', err.response.status)
    return { success: false, errInfo: err.response.data.message }
  }
}


export const putUserSetting = async ({ id, account, name, email, password, checkPassword }) => {
  try {
    console.log('account:', account)
    console.log('name:', name)
    console.log('email:', email)
    console.log('password:', password)
    console.log('checkPassword:', checkPassword)

    const token = localStorage.getItem('token')
    const response = await axios.put(`${baseUrl}/users/${id}`, { account, name, email, password, checkPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    )

    console.log(response)
    if (response.data.status === 'success') {
      console.log('成功')
      return { success: true, message: response.data.message }

    }

  } catch (err) {
    console.log('失敗')
    console.log(err.response.data)
    console.log(err.response)
    // return err.response
    return { success: false, errInfo: err.response.data.message }
  }
}


export const putUserProfile = async ({ id, name, avatar, cover, introduction }) => {
  const token = localStorage.getItem('token')
  console.log(token)
  try {

    const formData = new FormData();
    // 加入資料進去 formData
    formData.append('name', name);
    formData.append('avatar', avatar);
    formData.append('cover', cover);
    formData.append('introduction', introduction);

    const response = await axios.put(`${baseUrl}/users/${id}/profile`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return { success: true, message: response.data.message }
  } catch (err) {
    console.log('error', err)
    return { success: false, message: err.response.data.message }
  }
}

export const getUsers = async (id) => {
  const token = localStorage.getItem('token');
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
 
  const token = localStorage.getItem('token');
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
  //const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz03MiIsImludHJvZHVjdGlvbiI6InByYWVzZW50aXVtIHF1byBlbmltIGRvbG9yaWJ1cyBoaWMiLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJ1c2VyMSIsImNvdmVyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vNjQwLzQ4MC9jaXR5P2xvY2s9MzYiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJpYXQiOjE2ODYzMTQyNzMsImV4cCI6MTY4ODkwNjI3M30.NLl7ruyc2FBqWpnPv_Ixu_SMnA9lVS5QDyQdexrma70'
  const token = localStorage.getItem('token');
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
  //const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz03MiIsImludHJvZHVjdGlvbiI6InByYWVzZW50aXVtIHF1byBlbmltIGRvbG9yaWJ1cyBoaWMiLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJ1c2VyMSIsImNvdmVyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vNjQwLzQ4MC9jaXR5P2xvY2s9MzYiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJpYXQiOjE2ODYzMTQyNzMsImV4cCI6MTY4ODkwNjI3M30.NLl7ruyc2FBqWpnPv_Ixu_SMnA9lVS5QDyQdexrma70'  
  const token = localStorage.getItem('token');
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

export const getUserFollowings= async (id)=>{
  const token = localStorage.getItem ('token');
  try {
    const response = await axios.get (`${baseUrl}/users/${id}/followings`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error){
    console.error ('Error: cannnot get user followings',error);
  }
};
//GET /api/users/:id/followers 看見某使用者的所有跟隨者
export const getUserFollowers =async (id) =>{
  const token= localStorage.getItem('token');
  try{
    const response = await axios.get (`${baseUrl}/users/${id}/followers`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;

  }catch(error){
    console.log('Error: cannnot get user followers',error)
  }
};

//PUT /api/users/:id 編輯自己setting頁的資料 ( name, introduction, account, eamil, password )
//PUT /api/users/:id/profile 編輯自己Profile頁的資料 ( name, introduction, avatar, cover )
//GET /api/users/topFollowers 回傳 10 位最多followers的user

export const getTopFollowers = async () => {
  //const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImVtYWlsIjoidXNlcjFAZXhhbXBsZS5jb20iLCJuYW1lIjoidXNlcjEiLCJhdmF0YXIiOiJodHRwczovL2kucHJhdmF0YXIuY2MvMzAwP2ltZz03MiIsImludHJvZHVjdGlvbiI6InByYWVzZW50aXVtIHF1byBlbmltIGRvbG9yaWJ1cyBoaWMiLCJyb2xlIjoidXNlciIsImFjY291bnQiOiJ1c2VyMSIsImNvdmVyIjoiaHR0cHM6Ly9sb3JlbWZsaWNrci5jb20vNjQwLzQ4MC9jaXR5P2xvY2s9MzYiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTA5VDA3OjE2OjMzLjAwMFoiLCJpYXQiOjE2ODYzMTQyNzMsImV4cCI6MTY4ODkwNjI3M30.NLl7ruyc2FBqWpnPv_Ixu_SMnA9lVS5QDyQdexrma70'  
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${baseUrl}/users/topFollowers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:cannot get top followers', error);
  }
};

export const getUserFollowings = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${baseUrl}/users/${id}/followings`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error: cannnot get user followings', error);
  }
};

export const getUserFollowers = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${baseUrl}/users/${id}/followers`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;

  } catch (error) {
    console.log('Error: cannnot get user followers', error)
  }
};


//先寫來測試
//getUsers(4);
//getUserLike(2);
//getUserTweets(14);
//getUserRepliedTweets(14);
