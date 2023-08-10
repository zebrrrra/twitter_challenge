import axios from 'axios';
import { instance } from './instance';
const baseUrl = 'https://twitter-ac-team-d93c31406834.herokuapp.com/api';

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
    // data)
    return response.data
  } catch (err) {
    return err.response.data
  }
}

export const adminLogin = async ({ account, password }) => {
  try {
    const response = await axios.post(`${baseUrl}/admin/login`, { account, password })
    return response.data
  } catch (err) {
    return err.response.data
  }
}

export const putUserSetting = async ({ id, account, name, email, password, checkPassword }) => {
  try {
    const response = await instance.put(`/users/${id}`, { account, name, email, password, checkPassword })
    if (response.status === 'success') {
      return { success: true, message: response.message }
    } else {
      return {
        success: false, message: response.message
      }
    }
  } catch (error) {
    console.log(error)
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
    if (response.data.status === 'success') {
      return { success: true }
    }
  } catch (err) {
    console.log(err)
    return { success: false }
  }
}

export const getUser = async ({ id, signal }) => {
  const config = signal ? { signal } : {};
  try {
    const response = await instance.get(`/users/${id}`, config);
    return response
  } catch (error) {
    console.log(error)
  }
};

//GET /api/users/:id/tweets 看見某使用者發過的推文
export const getUserTweets = async ({ id, signal }) => {
  try {
    const response = await instance.get(`/users/${id}/tweets`, { signal });
    return response;
  } catch (error) {
    console.error('Error:cannot get user tweet', error);
  }
};

//GET /api/users/:id/replied_tweets 看見某使用者發過回覆的推文
export const getUserRepliedTweets = async ({ id, signal }) => {
  try {
    const response = await instance.get(`/users/${id}/replied_tweets`, { signal });
    return response;
  } catch (error) {
    console.error('Error:cannot get user replied tweet', error);
  }
};

//GET /api/users/:id/likes 看見某使用者點過的 Like
export const getUserLike = async ({ id, signal }) => {
  try {
    const response = await instance.get(`/users/${id}/likes`, { signal });
    return response
  } catch (error) {
    console.error('Error:cannot get user likes', error);
  }
};

export const getUserFollowings = async ({ id, signal }) => {
  try {
    const response = await instance.get(`/users/${id}/followings`, { signal });
    return response
  } catch (error) {
    console.error('Error: cannnot get user followings', error);
  }
};

//GET /api/users/:id/followers 看見某使用者的所有跟隨者
export const getUserFollowers = async ({ id, signal }) => {
  try {
    const response = await instance.get(`/users/${id}/followers`, { signal });
    return response
  } catch (error) {
    console.error('Error: cannnot get user followers', error)
  }
};

//GET /api/users/topFollowers 回傳 10 位最多followers的user
export const getTopFollowers = async (signal) => {
  try {
    const response = await instance.get(`/users/topFollowers`, { signal });
    return response
  } catch (error) {
    console.error('Error:cannot get top followers', error);
  }
};

