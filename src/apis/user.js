import axios from 'axios';
const baseUrl = 'https://tranquil-basin-75437.herokuapp.com/api';

export const login = async ({ account, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/users/login`, { account, password })
    return response.data
  } catch (err) {
    console.error('[Login Failed]:', err)
    return err.response.data
  }
}


// 放公共
export const register = async ({ account, name, password, email, checkPassword }) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, { account, name, password, email, checkPassword })
    return response.data
  } catch (err) {
    return err.response.data
  }
}

export const adminLogin = async ({ account, password }) => {

  try {
    const response = await axios.post(`${baseUrl}/admin/login`, { account, password })

    return response.data
    // 若要加上身份篩選data.data.user.role取得字串搭配{data}

  } catch (err) {
    return err.response.data
  }
}


export const putUserSetting = async ({ id, account, name, email, password, checkPassword }) => {
  try {

    const token = localStorage.getItem('token')
    const response = await axios.put(`${baseUrl}/users/${id}`, { account, name, email, password, checkPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    )
    if (response.data.status === 'success') {
      return response.data
    }
  } catch (err) {
    // return err.response
    return err.response.data
  }
}


export const putUserProfile = async ({ id, name, avatar, cover, introduction }) => {
  const token = localStorage.getItem('token')
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
    return error.response.data
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
//GET /api/users/:id/followers 看見某使用者的所有跟隨者
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
  }
};

//PUT /api/users/:id 編輯自己setting頁的資料 ( name, introduction, account, eamil, password )
//PUT /api/users/:id/profile 編輯自己Profile頁的資料 ( name, introduction, avatar, cover )
//GET /api/users/topFollowers 回傳 10 位最多followers的user

export const getTopFollowers = async () => {
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



